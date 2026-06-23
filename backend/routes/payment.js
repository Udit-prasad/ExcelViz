const { Router } = require('express');
const auth = require('../middleware/auth');
const { db } = require('../config/firebase');
const stripe = require('stripe');

const router = Router();

// Configure Stripe secret key from environment variables
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
let stripeInstance = null;

if (stripeSecretKey && stripeSecretKey !== 'your-stripe-secret-key') {
  stripeInstance = stripe(stripeSecretKey);
}

// 1. Create Stripe Checkout Session
router.post('/create-checkout-session', auth, async (req, res) => {
  const userId = req.user.id;

  try {
    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      return res.status(404).json({ msg: 'User profile not found' });
    }
    const user = userDoc.data();

    // If Stripe is configured, create an actual Stripe Session
    if (stripeInstance) {
      const session = await stripeInstance.checkout.sessions.create({
        payment_method_types: ['card'],
        customer_email: user.email,
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'ExcelViz Premium Pro Plan',
                description: 'Unlock unlimited spreadsheet uploads, GPT-4 AI synthesis, and spatial 3D WebGL charts.',
              },
              unit_amount: 1900, // $19.00 USD
              recurring: {
                interval: 'month',
              },
            },
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard?payment=success`,
        cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/pricing?payment=cancelled`,
        client_reference_id: userId,
      });

      return res.json({ url: session.url });
    } else {
      // Stripe Simulation Sandbox Fallback
      console.warn('STRIPE_SECRET_KEY is missing. Simulating checkout session registration.');
      
      // Upgrade user directly in sandbox mode
      await db.collection('users').doc(userId).update({
        isPremium: true,
        subscriptionStatus: 'active',
        unlockedViaSandbox: true,
        updatedAt: new Date().toISOString(),
      });

      return res.json({
        url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard?payment=simulated`,
        simulated: true,
      });
    }
  } catch (err) {
    console.error('Create checkout session error:', err);
    res.status(500).json({ msg: 'Internal server error creating payment session' });
  }
});

// 2. Stripe Webhook Handler (Requires raw body parsing)
router.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeInstance || !sig || !webhookSecret) {
    return res.status(400).send('Webhook requirements missing.');
  }

  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful checkout completion
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.client_reference_id;

    if (userId) {
      try {
        await db.collection('users').doc(userId).update({
          isPremium: true,
          subscriptionStatus: 'active',
          stripeSubscriptionId: session.subscription,
          stripeCustomerId: session.customer,
          updatedAt: new Date().toISOString(),
        });
        console.log(`User ${userId} successfully upgraded to Premium via Stripe Webhook.`);
      } catch (err) {
        console.error('Error updating user subscription via webhook:', err);
      }
    }
  }

  res.json({ received: true });
});

module.exports = router;
