const { Router } = require('express');
const crypto = require('crypto');
const auth = require('../middleware/auth');
const { db } = require('../config/firebase');
const Razorpay = require('razorpay');

const router = Router();

// Configure Razorpay from environment variables
const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
let razorpayInstance = null;

if (razorpayKeyId && razorpayKeySecret && razorpayKeyId !== 'your-razorpay-key-id') {
  try {
    razorpayInstance = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    });
    console.log('Razorpay SDK initialized successfully.');
  } catch (err) {
    console.error('Razorpay initialization error:', err.message);
  }
}

// 1. Create Checkout Session (Razorpay Order creation or simulation redirect)
router.post('/create-checkout-session', auth, async (req, res) => {
  const userId = req.user.id;
  const billingCycle = req.body.billingCycle || 'yearly';

  try {
    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      return res.status(404).json({ msg: 'User profile not found' });
    }
    const user = userDoc.data();

    // If Razorpay is configured, create an actual Razorpay Order
    if (razorpayInstance) {
      // Pro pricing: ₹499/mo (billed annually at ₹5,988/yr) or ₹999/mo billed monthly
      const amountInPaisa = billingCycle === 'yearly' ? 598800 : 99900; 
      const options = {
        amount: amountInPaisa,
        currency: 'INR',
        receipt: `receipt_order_${userId}_${Date.now()}`,
      };

      const order = await razorpayInstance.orders.create(options);
      
      return res.json({
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        key_id: razorpayKeyId,
        user: { 
          name: user.name || 'Premium User', 
          email: user.email 
        }
      });
    } else {
      // Razorpay Simulation Sandbox Fallback
      console.warn('RAZORPAY_KEY_ID is missing. Redirecting to simulated sandbox checkout.');
      
      return res.json({
        url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/checkout?plan=pro&interval=${billingCycle}`,
        simulated: true,
      });
    }
  } catch (err) {
    console.error('Create payment order error:', err);
    res.status(500).json({ msg: 'Internal server error creating payment order' });
  }
});

// 2. Verify Razorpay Payment Signature
router.post('/verify-payment', auth, async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const userId = req.user.id;

  if (!razorpayInstance || !razorpayKeySecret) {
    return res.status(400).json({ msg: 'Razorpay gateway is not configured on the server.' });
  }

  try {
    const hmac = crypto.createHmac('sha256', razorpayKeySecret);
    hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature === razorpay_signature) {
      await db.collection('users').doc(userId).update({
        isPremium: true,
        subscriptionStatus: 'active',
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        updatedAt: new Date().toISOString(),
      });

      console.log(`User ${userId} successfully upgraded to Premium via Razorpay Signature Verification.`);
      return res.json({ success: true, msg: 'Payment verified and upgraded successfully' });
    } else {
      console.warn(`Payment signature mismatch for user ${userId}`);
      return res.status(400).json({ msg: 'Payment verification failed (signature mismatch)' });
    }
  } catch (err) {
    console.error('Verify payment error:', err);
    res.status(500).json({ msg: 'Internal server error verifying signature' });
  }
});

// 3. Simulate Successful Sandbox Payment
router.post('/simulate-success', auth, async (req, res) => {
  const userId = req.user.id;

  try {
    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      return res.status(404).json({ msg: 'User profile not found' });
    }

    await db.collection('users').doc(userId).update({
      isPremium: true,
      subscriptionStatus: 'active',
      unlockedViaSandbox: true,
      updatedAt: new Date().toISOString(),
    });

    console.log(`User ${userId} successfully upgraded to Premium via sandbox simulation.`);
    res.json({ success: true, msg: 'Simulated payment succeeded, account upgraded' });
  } catch (err) {
    console.error('Simulate success error:', err);
    res.status(500).json({ msg: 'Internal server error processing simulated upgrade' });
  }
});

module.exports = router;
