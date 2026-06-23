import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// 1. SECTION HEADER
export const SectionHeader = ({ eyebrow, heading, subtext, align = 'center' }) => {
  const isLeft = align === 'left';
  return (
    <div className={`max-w-3xl mb-16 ${isLeft ? 'text-left' : 'mx-auto text-center'}`}>
      {eyebrow && (
        <span className="inline-block text-[10px] font-heading font-extrabold tracking-widest text-cyan-400 uppercase mb-4 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 leading-tight">
        {heading}
      </h2>
      {subtext && (
        <p className="font-body text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
          {subtext}
        </p>
      )}
    </div>
  );
};

// 2. FEATURE CARD
export const FeatureCard = ({ icon, title, description, linkText = 'Learn more', linkHref = '/product' }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="p-8 bg-[#1E293B]/60 backdrop-blur-md border border-white/5 rounded-[24px] shadow-2xl hover:border-cyan-500/20 hover:shadow-[0_0_30px_rgba(6,182,212,0.05)] transition-all duration-300 group flex flex-col justify-between h-full relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 -mr-6 -mt-6 w-20 h-20 rounded-full bg-cyan-500/5 blur-xl group-hover:bg-cyan-500/10 transition-all duration-500" />
      
      <div>
        <div className="w-12 h-12 bg-gradient-to-tr from-cyan-500 to-indigo-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/10 group-hover:scale-105 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-heading font-black text-white mb-3 group-hover:text-cyan-400 transition-colors">
          {title}
        </h3>
        <p className="font-body text-slate-400 text-sm leading-relaxed mb-6 font-medium">
          {description}
        </p>
      </div>
      <Link 
        to={linkHref} 
        className="font-body text-xs font-bold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5 self-start group/link uppercase tracking-wider"
      >
        {linkText}
        <span className="group-hover/link:translate-x-1 transition-transform">→</span>
      </Link>
    </motion.div>
  );
};

// 3. TESTIMONIAL CARD
export const TestimonialCard = ({ quote, name, role, company, stars = 5 }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="p-8 bg-[#1E293B]/40 backdrop-blur-2xl border border-white/5 rounded-[24px] shadow-2xl hover:border-indigo-500/20 hover:shadow-[0_0_30px_rgba(99,102,241,0.04)] transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 -mr-6 -mt-6 w-20 h-20 rounded-full bg-indigo-500/5 blur-xl pointer-events-none" />

      <div>
        {/* Star rating */}
        <div className="flex gap-1 mb-6 text-cyan-400">
          {[...Array(stars)].map((_, i) => (
            <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className="font-body text-slate-300 italic text-sm leading-relaxed mb-8 font-medium">
          "{quote}"
        </p>
      </div>
      <div className="flex items-center gap-3.5 pt-4 border-t border-white/5">
        <div className="w-9 h-9 bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 rounded-full flex items-center justify-center font-heading font-black text-xs text-cyan-400 shadow-md">
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="font-heading font-extrabold text-sm text-white leading-none mb-1">
            {name}
          </h4>
          <p className="font-body text-slate-400 text-xs leading-none">
            {role}, <span className="font-bold text-slate-350">{company}</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// 4. CTA BANNER
export const CTABanner = ({ heading, subtext, ctaText = 'Get Started — It\'s Free', ctaHref = '/register' }) => {
  return (
    <section className="bg-[#0A0D14]/80 backdrop-blur-md py-20 border-t border-white/5 relative overflow-hidden text-center">
      {/* Dynamic Backlighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 leading-tight">
          {heading}
        </h2>
        <p className="font-body text-slate-450 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          {subtext}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              to={ctaHref}
              className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 shadow-xl shadow-cyan-500/25 text-white font-heading font-black px-8 py-4 rounded-xl transition-all text-xs uppercase tracking-wider block"
            >
              {ctaText}
            </Link>
          </motion.div>
        </div>
        <div className="text-xs font-body text-slate-500 pt-2 flex justify-center items-center gap-2">
          <span>Already have an account?</span>
          <Link to="/login" className="text-cyan-400 hover:underline font-bold">Log in →</Link>
        </div>
      </div>
    </section>
  );
};
