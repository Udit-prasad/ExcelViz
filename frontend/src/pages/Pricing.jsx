import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader, CTABanner } from '../components/MarketingUIComponents';
import { ScrollReveal, StaggerContainer } from '../components/ScrollReveal';

const Pricing = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [billingInterval, setBillingInterval] = useState('yearly'); // default to 'yearly' for better conversion
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  const pricingPlans = [
    {
      title: 'Free',
      subtitle: 'Perfect for individuals',
      priceMonthly: 0,
      priceYearly: 0,
      features: [
        '14-day free trial period',
        'Generate up to 1 visualization',
        'Watermarked visual charts',
        'Basic AI insights summary',
        'PNG exports only',
        'Blurred history logs vault',
      ],
      ctaText: 'Get Started Free',
      ctaHref: '/register',
      highlighted: false,
      buttonStyle: 'border border-white/10 hover:border-cyan-500/30 text-slate-300 hover:text-cyan-400 hover:bg-white/5',
    },
    {
      title: 'Pro',
      subtitle: 'For power users & analysts',
      priceMonthly: 999,
      priceYearly: 499, // ₹499 * 12 = ₹5,988/yr
      features: [
        'Unlimited sheet uploads',
        '2D + Spatial 3D WebGL charts',
        'No watermark on visuals',
        'Unlimited AI insights summaries',
        'PNG + Boardroom PDF exports',
        'Fully unlocked history logs vault',
        'Priority email support',
      ],
      ctaText: 'Start Pro Trial',
      ctaHref: '/register',
      highlighted: true,
      buttonStyle: 'bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white shadow-lg shadow-cyan-500/25',
    },
    {
      title: 'Enterprise',
      subtitle: 'For teams & organizations',
      priceMonthly: 'Custom',
      priceYearly: 'Custom',
      features: [
        'Everything in Pro',
        'Team collaboration layers',
        'SSO / Firebase Auth sync',
        'Custom corporate branding',
        'Dedicated support manager',
        'SLA availability guarantee',
      ],
      ctaText: 'Contact Sales',
      ctaHref: '/register',
      highlighted: false,
      buttonStyle: 'bg-slate-900 border border-white/5 hover:bg-slate-800 text-white',
    }
  ];

  const faqs = [
    {
      question: 'How does the 14-day Free Trial work?',
      answer: 'After creating an account, you automatically receive a 14-day free trial. During the trial, you can upload spreadsheets and generate up to 1 watermarked visualization. History logs remain blurred during the trial period. You can upgrade to Pro at any time to remove these limits.'
    },
    {
      question: 'Can I cancel my plan anytime?',
      answer: 'Yes. You can cancel your subscription at any time directly from your Profile settings dashboard. No contracts, no questions asked.'
    },
    {
      question: 'What Excel formats are supported?',
      answer: 'ExcelViz fully supports both .xls and .xlsx files, as well as standard comma-separated .csv data worksheets.'
    },
    {
      question: 'Is my data stored permanently on your servers?',
      answer: 'No. ExcelViz parses your spreadsheets in secure browser memory. We do not maintain or save raw sheet data permanently on disk.'
    },
    {
      question: 'How does the AI analysis engine work?',
      answer: 'Your workbook statistical dimensions are processed in memory and directed to OpenAI APIs securely. No raw personal identifiers are ever sent or used to train public LLM models.'
    }
  ];

  return (
    <div className="bg-transparent min-h-screen text-slate-200 relative overflow-hidden font-body pt-20">
      
      {/* HERO SECTION */}
      <section className="bg-transparent px-6 py-20 lg:py-28 relative overflow-hidden">
        <div className="glow-accent top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <ScrollReveal variant="fade-up" delay={0.1}>
            <span className="text-[10px] font-heading font-extrabold tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full uppercase">
              PLANS & PRICING
            </span>
          </ScrollReveal>
          
          <ScrollReveal variant="fade-up" delay={0.2}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 leading-tight">
              Simple pricing. Powerful analysis.
            </h1>
          </ScrollReveal>
          
          <ScrollReveal variant="fade-up" delay={0.3}>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
              Choose a plan tailored to your data operations. Free to start, cancel at any time.
            </p>
          </ScrollReveal>

          {/* Toggle interval selection */}
          <ScrollReveal variant="fade-up" delay={0.4}>
            <div className="flex items-center justify-center gap-6 pt-6">
              <button
                onClick={() => setBillingInterval('monthly')}
                className={`text-sm font-heading font-black tracking-wide uppercase transition-colors focus:outline-none ${
                  billingInterval === 'monthly' ? 'text-cyan-400 text-shadow-sm shadow-cyan-500/20' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Monthly
              </button>
              
              <button
                onClick={() => setBillingInterval(billingInterval === 'monthly' ? 'yearly' : 'monthly')}
                className="w-14 h-8 bg-slate-950/60 backdrop-blur-md rounded-full p-1 transition-all focus:outline-none relative border border-white/10 shadow-inner flex items-center cursor-pointer"
                aria-label="Toggle billing interval"
              >
                <div 
                  className={`w-6 h-6 bg-gradient-to-tr from-cyan-400 to-indigo-500 rounded-full shadow-md shadow-cyan-500/30 transition-transform duration-300 ${
                    billingInterval === 'yearly' ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
              
              <button
                onClick={() => setBillingInterval('yearly')}
                className={`text-sm font-heading font-black tracking-wide uppercase flex items-center gap-2.5 transition-colors focus:outline-none ${
                  billingInterval === 'yearly' ? 'text-cyan-400 text-shadow-sm shadow-cyan-500/20' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Yearly 
                <span className="px-2 py-0.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-400 text-[9px] font-extrabold font-heading uppercase rounded-full tracking-widest shadow-md shadow-emerald-950/20">
                  Save 50%
                </span>
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section className="px-6 py-24 bg-transparent relative z-10">
        <StaggerContainer className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan, index) => {
            const isYearly = billingInterval === 'yearly';
            const price = isYearly ? plan.priceYearly : plan.priceMonthly;

            let ctaTarget = plan.ctaHref;
            let ctaLabel = plan.ctaText;

            if (isAuthenticated) {
              if (plan.title === 'Free') {
                ctaTarget = '/dashboard';
                ctaLabel = 'Go to Dashboard';
              } else if (plan.title === 'Pro') {
                ctaTarget = `/checkout?plan=pro&interval=${billingInterval}`;
                ctaLabel = 'Upgrade to Pro';
              } else if (plan.title === 'Enterprise') {
                ctaTarget = '/profile';
                ctaLabel = 'Contact Support';
              }
            }

            return (
              <ScrollReveal key={index} variant="fade-up" delay={index * 0.1} className="w-full h-full">
                <motion.div
                  whileHover={{ y: -6 }}
                  className={`p-8 bg-[#1E293B]/45 border rounded-[24px] flex flex-col justify-between h-full relative transition-all duration-300 ${
                    plan.highlighted 
                      ? 'border-cyan-500 shadow-[0_15px_40px_rgba(6,182,212,0.08)] ring-2 ring-cyan-500/10' 
                      : 'border-white/5 shadow-2xl hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]'
                  }`}
                >
                  {/* Pro highlight tag */}
                  {plan.highlighted && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white text-[10px] font-heading font-black tracking-widest uppercase rounded-full shadow-md">
                      ⭐ Recommend ⭐
                    </span>
                  )}

                  <div>
                    <h3 className="text-2xl font-heading font-black text-white mb-1">{plan.title}</h3>
                    <p className="font-body text-slate-400 text-xs font-semibold mb-6">{plan.subtitle}</p>
                    
                    {/* Price display */}
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-4xl sm:text-5xl font-heading font-black text-white">
                        {typeof price === 'number' ? `₹${price}` : price}
                      </span>
                      {typeof price === 'number' && (
                        <span className="text-xs text-slate-500 font-bold uppercase tracking-wider font-body">/ month</span>
                      )}
                    </div>

                    {/* Pricing billing interval label */}
                    {isYearly && typeof price === 'number' && (
                      <p className="text-[10px] text-cyan-400 font-bold mb-6 font-heading uppercase tracking-widest">
                        Billed annually (₹{price * 12}/yr)
                      </p>
                    )}
                    {!isYearly && typeof price === 'number' && (
                      <div className="h-10" />
                    )}
                    {typeof price !== 'number' && (
                      <div className="h-10" />
                    )}

                    {/* Bullet features */}
                    <ul className="space-y-4 text-slate-200 text-sm font-body font-medium pt-6 border-t border-white/5">
                      {plan.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-3 text-left">
                          <svg className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="leading-tight text-slate-300">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        to={ctaTarget}
                        className={`w-full text-center py-3.5 rounded-xl font-heading text-xs font-extrabold uppercase tracking-wider transition-all block ${plan.buttonStyle}`}
                      >
                        {ctaLabel}
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </StaggerContainer>
      </section>

      {/* FAQ SECTION */}
      <section className="px-6 py-24 bg-transparent border-t border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal variant="fade-up">
            <SectionHeader 
              eyebrow="QUESTIONS"
              heading="Frequently Asked Questions"
              subtext="Everything you need to know about pricing, formats, storage, and privacy."
            />
          </ScrollReveal>
          <StaggerContainer className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <ScrollReveal key={idx} variant="fade-up" delay={idx * 0.05} className="w-full">
                  <div className="bg-[#1E293B]/40 border border-white/5 rounded-xl overflow-hidden shadow-2xl transition-all">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full text-left px-6 py-5 flex items-center justify-between font-heading font-bold text-white hover:text-cyan-400 transition-colors focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <svg 
                        className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180 text-cyan-400' : 'rotate-0'}`} 
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-6 pb-6"
                        >
                          <p className="font-body text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4 font-medium">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </ScrollReveal>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <CTABanner 
        heading="Unlock absolute intelligence today"
        subtext="Choose Pro to experience immersive 3D telemetry grids and unlimited AI summaries. Try Pro free for 14 days."
      />

    </div>
  );
};

export default Pricing;
