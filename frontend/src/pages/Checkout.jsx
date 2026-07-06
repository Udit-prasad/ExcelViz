import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { getProfile } from '../features/auth/authSlice';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const plan = searchParams.get('plan') || 'pro';
  const interval = searchParams.get('interval') || 'yearly';
  
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State variables for simulated checkout
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Checkout flow states
  const [status, setStatus] = useState('idle'); // idle, processing, success, error
  const [isSimulated, setIsSimulated] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [razorpayLoading, setRazorpayLoading] = useState(false);

  // Razorpay Pro pricing in INR
  const price = interval === 'yearly' ? 499 : 999;
  const billingTotal = interval === 'yearly' ? 5988 : 999;

  // Dynamically load Razorpay SDK script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      // Clean up script when page unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleCheckoutInit = async () => {
    setRazorpayLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post(
        `${API_URL}/payment/create-checkout-session`,
        { billingCycle: interval },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );

      // If backend returns simulated, render the built-in card simulator
      if (response.data.simulated) {
        setIsSimulated(true);
        setRazorpayLoading(false);
        return;
      }

      // If backend successfully created a Razorpay order, open Razorpay popup
      const { order_id, amount, currency, key_id, user } = response.data;

      if (!window.Razorpay) {
        alert('Razorpay Payment Gateway is loading. Please try again in a moment.');
        setRazorpayLoading(false);
        return;
      }

      const options = {
        key: key_id,
        amount: amount,
        currency: currency,
        name: 'ExcelViz Pro Plan',
        description: 'Unlock unlimited spreadsheet uploads, spatial 3D charts, and GPT analytics.',
        order_id: order_id,
        handler: async function (paymentRes) {
          // Signature verification callback
          setStatus('processing');
          setLoadingStep(0);
          try {
            const verifyRes = await axios.post(
              `${API_URL}/payment/verify-payment`,
              {
                razorpay_order_id: paymentRes.razorpay_order_id,
                razorpay_payment_id: paymentRes.razorpay_payment_id,
                razorpay_signature: paymentRes.razorpay_signature,
              },
              {
                headers: {
                  'x-auth-token': token,
                },
              }
            );

            if (verifyRes.data.success) {
              setStatus('success');
              dispatch(getProfile());
            } else {
              setStatus('error');
              setErrorMessage(verifyRes.data.msg || 'Payment verification failed.');
            }
          } catch (err) {
            console.error('Signature verification error:', err);
            setStatus('error');
            setErrorMessage(err.response?.data?.msg || 'Cryptographic signature verification failed.');
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
        },
        theme: {
          color: '#06B6D4',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (failedRes) {
        console.error('Payment failed:', failedRes.error);
        alert(`Payment Failed: ${failedRes.error.description}`);
      });
      rzp.open();
      setRazorpayLoading(false);
    } catch (err) {
      console.error('Initiating payment gateway failed:', err);
      alert('Failed to initialize connection with Razorpay API.');
      setRazorpayLoading(false);
    }
  };

  // Card details validation & processing for Simulator Mode
  const handleSimulatedSubmit = async (e) => {
    e.preventDefault();
    if (cardNumber.length < 19 || cardExpiry.length < 5 || cardCvv.length < 3 || !cardName) {
      alert('Please fill out all card fields accurately.');
      return;
    }

    setStatus('processing');
    setLoadingStep(0);
  };

  // Staged loading step text simulation for Mock sandbox
  const loadingSteps = [
    'Connecting to safe Razorpay Sandbox Gateway...',
    'Generating simulated API payment authorization...',
    'Clearing ledger balances with mock issuer...',
    'Upgrading account profile to Premium Pro...'
  ];

  useEffect(() => {
    let intervalId;
    if (status === 'processing' && isSimulated) {
      intervalId = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev >= loadingSteps.length - 1) {
            clearInterval(intervalId);
            completeSimulatedPayment();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [status, isSimulated]);

  const completeSimulatedPayment = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/payment/simulate-success`,
        {},
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      if (response.data.success) {
        setStatus('success');
        dispatch(getProfile()); // Hot-reload premium status in redux store
      } else {
        setStatus('error');
        setErrorMessage(response.data.msg || 'Transaction simulation failed.');
      }
    } catch (err) {
      console.error('Simulated checkout API error:', err);
      setStatus('error');
      setErrorMessage(err.response?.data?.msg || 'Network latency. Simulated gateway offline.');
    }
  };

  const getCardBrand = () => {
    if (cardNumber.startsWith('4')) return 'Visa';
    if (cardNumber.startsWith('5')) return 'Mastercard';
    if (cardNumber.startsWith('3')) return 'Amex';
    return 'Generic';
  };

  const getCardBg = () => {
    const brand = getCardBrand();
    if (brand === 'Visa') return 'from-blue-600 to-cyan-500';
    if (brand === 'Mastercard') return 'from-amber-600 to-red-500';
    if (brand === 'Amex') return 'from-emerald-700 to-teal-500';
    return 'from-slate-800 to-slate-700';
  };

  const renderCardLogo = () => {
    const brand = getCardBrand();
    if (brand === 'Visa') {
      return <span className="font-heading font-black italic text-xl text-white">VISA</span>;
    }
    if (brand === 'Mastercard') {
      return (
        <div className="flex -space-x-2">
          <div className="w-6 h-6 bg-red-500 rounded-full" />
          <div className="w-6 h-6 bg-amber-500 rounded-full" />
        </div>
      );
    }
    if (brand === 'Amex') {
      return <span className="font-heading font-extrabold italic text-sm text-cyan-200">AMEX</span>;
    }
    return <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Card</span>;
  };

  const handleCardNumberChange = (e) => {
    const val = e.target.value.replace(/\s?/g, '').replace(/\D/g, '');
    let formatted = '';
    for (let i = 0; i < val.length && i < 16; i++) {
      if (i > 0 && i % 4 === 0) formatted += ' ';
      formatted += val[i];
    }
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length >= 2) {
      val = val.substring(0, 2) + '/' + val.substring(2, 4);
    }
    setCardExpiry(val.substring(0, 5));
  };

  return (
    <div className="min-h-screen text-slate-200 relative overflow-hidden font-body flex items-center justify-center p-4">
      {/* Glow backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 pointer-events-none rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 pointer-events-none rounded-full blur-[100px]" />

      <div className="w-full max-w-4xl bg-slate-950/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 sm:p-10 shadow-2xl relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* LEFT COLUMN: Payment details & Summary (5 cols) */}
        <div className="md:col-span-5 space-y-6 md:border-r md:border-white/5 md:pr-8">
          <div className="space-y-2">
            <span className="text-[10px] font-heading font-black tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full uppercase">
              Razorpay Secure Checkout
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-white pt-2">
              Subscription Billing
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              Activate your premium subscription. Cancel anytime.
            </p>
          </div>

          <div className="bg-slate-900/50 rounded-2xl p-4 border border-white/5 space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-bold">Plan Type:</span>
              <span className="text-white font-extrabold uppercase text-[10px] bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-md text-cyan-400 tracking-wider">
                {plan} Tier
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-bold">Billing Cycle:</span>
              <span className="text-white font-extrabold capitalize">{interval}</span>
            </div>
            <div className="h-[1px] bg-white/5" />
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-slate-400 font-bold">Recurring Cost:</span>
              <div className="flex items-baseline gap-0.5">
                <span className="text-2xl font-heading font-black text-white">₹{price}</span>
                <span className="text-[9px] text-slate-500 font-black uppercase tracking-wider">/ mo</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-[10px] text-cyan-400 font-bold bg-cyan-950/20 px-3 py-2 rounded-xl border border-cyan-500/10">
              <span>Billed Amount:</span>
              <span className="uppercase tracking-widest font-heading font-black">₹{billingTotal} / period</span>
            </div>
          </div>

          <div className="text-[10px] text-slate-500 font-medium leading-relaxed bg-white/2 px-4 py-3 rounded-xl border border-white/5 flex gap-2.5">
            <svg className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p>
              Security audited by Razorpay. Test transactions are processed completely in sandboxed mode without real money deduction.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Razorpay launcher or Card Simulator (7 cols) */}
        <div className="md:col-span-7 flex flex-col items-center justify-center min-h-[300px]">
          <AnimatePresence mode="wait">
            
            {/* IDLE LAUNCH SCREEN (Used when not yet redirected to card simulator) */}
            {status === 'idle' && !isSimulated && (
              <motion.div 
                key="launcher"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center space-y-6 w-full"
              >
                <div className="w-20 h-20 bg-cyan-500/10 border border-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400 mx-auto">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-heading font-black text-white">Payment gateway initialization</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto font-medium">
                    Initialize connection to Razorpay Secure Gateway. We will load the checkout panel securely.
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckoutInit}
                  disabled={razorpayLoading}
                  className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-heading font-black text-xs uppercase tracking-widest rounded-xl shadow-xl shadow-cyan-500/15 flex items-center justify-center gap-2 mx-auto"
                >
                  {razorpayLoading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Loading Gateway...
                    </>
                  ) : (
                    'Proceed to Pay (₹' + billingTotal + '.00)'
                  )}
                </motion.button>
              </motion.div>
            )}

            {/* SIMULATED CARD FORM */}
            {status === 'idle' && isSimulated && (
              <motion.div 
                key="simulator-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full space-y-8 animate-fade-in"
              >
                {/* 3D CREDIT CARD WIDGET */}
                <div className="perspective-1000 w-full max-w-[340px] h-[210px] mx-auto cursor-default">
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                    className="w-full h-full relative preserve-3d transform-style duration-500"
                  >
                    {/* Front Face */}
                    <div className={`absolute inset-0 backface-hidden bg-gradient-to-tr ${getCardBg()} border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col justify-between text-white select-none`}>
                      <div className="flex justify-between items-start">
                        <div className="w-10 h-7 bg-amber-400/20 border border-amber-400/30 rounded-md relative flex items-center justify-center">
                          <div className="w-6 h-4 border border-amber-400/10 rounded-sm" />
                        </div>
                        {renderCardLogo()}
                      </div>

                      <div className="text-lg sm:text-xl font-heading font-black tracking-widest text-shadow-sm text-center py-2">
                        {cardNumber || '•••• •••• •••• ••••'}
                      </div>

                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[7px] text-white/50 font-bold uppercase tracking-widest">Card Holder</p>
                          <p className="text-[11px] font-bold uppercase tracking-wider truncate max-w-[150px]">
                            {cardName || 'Your Name'}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[7px] text-white/50 font-bold uppercase tracking-widest">Expires</p>
                          <p className="text-[11px] font-bold tracking-wider">
                            {cardExpiry || 'MM/YY'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Back Face */}
                    <div className="absolute inset-0 backface-hidden rotateY-180 bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col justify-between text-white select-none">
                      <div className="w-full h-10 bg-slate-950 absolute left-0 top-6" />
                      <div className="mt-12 flex justify-end items-center gap-3">
                        <div className="flex-1 h-8 bg-slate-800 rounded-sm border border-slate-700/50 flex justify-end items-center pr-3">
                          <span className="text-[9px] text-slate-500 font-bold font-heading uppercase italic tracking-widest">Secure Sign</span>
                        </div>
                        <div className="w-12 h-8 bg-white text-slate-900 rounded-sm flex items-center justify-center font-bold tracking-wider text-xs">
                          {cardCvv || '•••'}
                        </div>
                      </div>
                      <p className="text-[7px] text-slate-500 font-bold text-center">
                        Razorpay Simulator. No real funds deducted.
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* FORM INPUTS */}
                <form onSubmit={handleSimulatedSubmit} className="space-y-4">
                  <div className="text-[10px] text-center text-cyan-400 font-bold bg-cyan-950/20 border border-cyan-500/20 py-2 rounded-xl">
                    ⚡ Razorpay Sandbox Simulation Mode
                  </div>
                  <div>
                    <label className="block text-[10px] font-heading font-black text-slate-455 uppercase tracking-widest mb-1.5">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full px-4 py-2.5 border border-white/5 bg-slate-950/40 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/25 focus:border-cyan-500 transition-all text-xs font-semibold"
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-heading font-black text-slate-455 uppercase tracking-widest mb-1.5">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        className="w-full pl-4 pr-12 py-2.5 border border-white/5 bg-slate-950/40 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/25 focus:border-cyan-500 transition-all text-xs font-semibold"
                        placeholder="4111 2222 3333 4444"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        {renderCardLogo()}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-heading font-black text-slate-455 uppercase tracking-widest mb-1.5">
                        Expiration Date
                      </label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                        className="w-full px-4 py-2.5 border border-white/5 bg-slate-950/40 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/25 focus:border-cyan-500 transition-all text-xs font-semibold"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-heading font-black text-slate-455 uppercase tracking-widest mb-1.5">
                        Secure CVV
                      </label>
                      <input
                        type="password"
                        required
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').substring(0, 4))}
                        onFocus={() => setIsFlipped(true)}
                        onBlur={() => setIsFlipped(false)}
                        className="w-full px-4 py-2.5 border border-white/5 bg-slate-950/40 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/25 focus:border-cyan-500 transition-all text-xs font-semibold"
                        placeholder="123"
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 py-3.5 text-white rounded-xl font-heading font-extrabold text-xs uppercase tracking-widest shadow-xl shadow-cyan-500/10 transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    Submit Sandbox Payment (₹{billingTotal}.00)
                  </motion.button>
                </form>
              </motion.div>
            )}

            {/* PROCESSING STATE LOADER */}
            {status === 'processing' && (
              <motion.div 
                key="processing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full flex flex-col items-center justify-center py-12 space-y-6"
              >
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 rounded-full border-4 border-cyan-500/10" />
                  <div className="absolute inset-0 rounded-full border-4 border-t-cyan-400 border-r-indigo-400 animate-spin" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="font-heading font-black text-lg text-white">Verifying Transaction</h3>
                  <p className="text-xs text-slate-400 font-semibold max-w-xs mx-auto animate-pulse">
                    {isSimulated ? loadingSteps[loadingStep] : 'Verifying cryptographic signature via secure node...'}
                  </p>
                </div>
              </motion.div>
            )}

            {/* SUCCESS STATE */}
            {status === 'success' && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full flex flex-col items-center justify-center py-12 text-center space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/15">
                  <svg className="w-10 h-10 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-heading font-black text-white">Payment Authorized!</h3>
                  <p className="text-xs text-slate-400 font-medium max-w-sm mx-auto leading-relaxed">
                    Success! Your ExcelViz account has been safely upgraded to <strong className="text-cyan-400">Premium Pro Plan</strong>. Your workspace telemetry is fully verified.
                  </p>
                </div>

                <div className="bg-slate-900/50 border border-white/5 p-4 rounded-xl text-[10px] font-mono text-slate-400 max-w-xs space-y-1">
                  <div>TRANSACTION ID: TX-RZP-{Math.floor(Math.random() * 9000000) + 1000000}</div>
                  <div>GATEWAY STATUS: APPROVED (SECURED)</div>
                  <div>PLAN VERSION: PREMIUM_PRO_TELEMETRY</div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/dashboard?payment=success')}
                  className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-heading font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-emerald-500/15"
                >
                  Return to Control Center
                </motion.button>
              </motion.div>
            )}

            {/* ERROR FAILURE STATE */}
            {status === 'error' && (
              <motion.div 
                key="error"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full flex flex-col items-center justify-center py-12 text-center space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shadow-lg shadow-red-500/15">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-heading font-black text-white">Payment Declined</h3>
                  <p className="text-xs text-red-400 font-semibold max-w-sm mx-auto">
                    {errorMessage || 'Verification of the payment signature failed.'}
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setStatus('idle');
                      setIsSimulated(false);
                    }}
                    className="px-6 py-2.5 bg-slate-900 border border-white/10 text-white font-heading font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-800"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="px-6 py-2.5 bg-slate-950 border border-transparent text-slate-450 font-heading font-bold text-xs uppercase tracking-wider rounded-xl hover:text-white"
                  >
                    Abort Checkout
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
