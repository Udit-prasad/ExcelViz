import React from 'react';
import { SectionHeader, CTABanner } from '../components/MarketingUIComponents';
import { ScrollReveal, StaggerContainer } from '../components/ScrollReveal';

const AboutUs = () => {
  return (
    <div className="bg-transparent min-h-screen text-slate-200 relative overflow-hidden font-body pt-20">

      {/* HERO SECTION */}
      <section className="relative px-6 py-24 lg:py-32 overflow-hidden flex items-center justify-center min-h-[70vh]">
        {/* Glow backlight */}
        <div className="glow-accent top-[-10%] left-[20%] w-[60%] h-[40%] bg-cyan-500/10 pointer-events-none" />
        <div className="glow-accent bottom-[-10%] right-[10%] w-[50%] h-[45%] bg-indigo-500/10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#1E293B/20,transparent_70%)] opacity-80 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <ScrollReveal variant="fade-up" delay={0.1}>
            <span className="text-[10px] font-heading font-extrabold tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full uppercase">
              BRAND MISSION
            </span>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.2}>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-black tracking-tight text-white leading-tight">
              We believe spreadsheets <br className="hidden sm:inline" />
              deserve better.
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.3}>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
              ExcelViz was built by data practitioners who were tired of staring at flat rows. We created the telemetry workspace we always wished we had.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* OUR MISSION */}
      <section className="px-6 py-24 bg-transparent relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Mission Description */}
          <ScrollReveal variant="fade-right" className="space-y-6 w-full">
            <span className="inline-block text-[10px] font-heading font-extrabold tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full uppercase">OUR FOCUS</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white leading-tight">
              Making data intelligence accessible to everyone
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-body font-medium">
              Business intelligence shouldn't require complex SQL scripting or expensive enterprise licenses. We set out to democratize operations tracking by enabling analysts to transform Excel worksheets into interactive 2D and 3D visuals.
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-body font-medium">
              By combining GPU-accelerated WebGL renderings with OpenAI capabilities, ExcelViz automatically points to trends, flags exceptions, and compiles executive-level PDF summaries in seconds.
            </p>
          </ScrollReveal>

          {/* Abstract SVG Illustration - Data Intelligence Pipeline */}
          <ScrollReveal variant="fade-left" className="w-full">
            <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl min-h-[380px] flex flex-col items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#00f0ff/5,transparent_85%)]" />

              {/* Premium Diagram Canvas */}
              <svg className="w-full max-w-[480px] h-[260px] text-cyan-400 relative z-10" viewBox="0 0 480 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="grid-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="glow-grad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#6366f1" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="bar-blue" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.95" />
                  </linearGradient>
                  <linearGradient id="bar-purple" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.95" />
                  </linearGradient>
                  <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Background flow paths */}
                <path d="M 90 130 C 180 130, 200 60, 260 60 C 320 60, 310 130, 390 130" stroke="url(#glow-grad)" strokeWidth="1.5" fill="none" opacity="0.4" />
                <path d="M 90 130 C 180 130, 160 200, 260 200 C 360 200, 330 130, 390 130" stroke="url(#glow-grad)" strokeWidth="1.5" fill="none" opacity="0.4" />
                <line x1="90" y1="130" x2="390" y2="130" stroke="url(#glow-grad)" strokeWidth="2" strokeDasharray="6 4" opacity="0.2" />

                {/* STEP 1: SPREADSHEET MATRIX (Left) */}
                <g transform="translate(10, 50)" className="transition-transform duration-500 hover:translate-y-[-2px]">
                  {/* Grid background */}
                  <rect x="0" y="0" width="100" height="150" rx="8" fill="#1e293b" fillOpacity="0.4" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                  {/* Title Bar */}
                  <rect x="0" y="0" width="100" height="28" rx="8" fill="#0f172a" fillOpacity="0.8" />
                  <rect x="10" y="9" width="30" height="10" rx="2" fill="#06b6d4" fillOpacity="0.4" />
                  <circle cx="85" cy="14" r="3" fill="#10b981" />

                  {/* Grid cells */}
                  {Array.from({ length: 6 }).map((_, r) => (
                    <g key={r} transform={`translate(0, ${36 + r * 18})`}>
                      <rect x="10" y="0" width="22" height="10" rx="1.5" fill="#ffffff" fillOpacity="0.03" />
                      <rect x="36" y="0" width="26" height="10" rx="1.5" fill="#ffffff" fillOpacity="0.05" />
                      <rect x="66" y="0" width="24" height="10" rx="1.5" fill={r % 2 === 0 ? "#06b6d4" : "#ffffff"} fillOpacity={r % 2 === 0 ? "0.2" : "0.03"} />
                    </g>
                  ))}
                  <text x="50" y="157" fill="#64748b" fontSize="8" textAnchor="middle" fontWeight="bold" letterSpacing="0.05em">RAW XLS MATRIX</text>
                </g>

                {/* STEP 2: AI SCANNER ORB (Center) */}
                <g transform="translate(240, 130)">
                  {/* Outer rotating/pulsing ring */}
                  <circle cx="0" cy="0" r="32" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.7" className="animate-spin" style={{ animationDuration: '15s' }} />
                  <circle cx="0" cy="0" r="24" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" className="animate-spin" style={{ animationDuration: '8s', animationDirection: 'reverse' }} />
                  {/* Core glowing sphere */}
                  <circle cx="0" cy="0" r="14" fill="url(#bar-blue)" filter="url(#glow-filter)" />
                  <circle cx="0" cy="0" r="6" fill="#ffffff" />
                  {/* Scan laser lines */}
                  <line x1="-120" y1="0" x2="-25" y2="0" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.6" />
                  <line x1="25" y1="0" x2="110" y2="0" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.6" />
                </g>

                {/* STEP 3: 3D GRID PROJECTION (Right) */}
                <g transform="translate(350, 45)">
                  {/* Isometric base grid */}
                  <path d="M 50 110 L 100 85 L 50 60 L 0 85 Z" fill="url(#grid-grad)" stroke="#06b6d4" strokeWidth="1" strokeOpacity="0.3" />
                  <path d="M 50 110 L 100 85 L 50 60 L 0 85 Z" fill="none" stroke="#06b6d4" strokeWidth="1" strokeOpacity="0.1" strokeDasharray="3 3" />

                  {/* Isometric bar 1 (Blue) */}
                  <g transform="translate(25, 75)">
                    {/* Left side */}
                    <path d="M 0 0 L 12 -6 L 12 -45 L 0 -39 Z" fill="url(#bar-blue)" />
                    {/* Right side */}
                    <path d="M 12 -6 L 24 0 L 24 -39 L 12 -45 Z" fill="#0891b2" />
                    {/* Top cap */}
                    <path d="M 0 -39 L 12 -45 L 24 -39 L 12 -33 Z" fill="#22d3ee" />
                  </g>

                  {/* Isometric bar 2 (Purple) */}
                  <g transform="translate(50, 62)">
                    {/* Left side */}
                    <path d="M 0 0 L 12 -6 L 12 -65 L 0 -59 Z" fill="url(#bar-purple)" />
                    {/* Right side */}
                    <path d="M 12 -6 L 24 0 L 24 -59 L 12 -65 Z" fill="#6d28d9" />
                    {/* Top cap */}
                    <path d="M 0 -59 L 12 -65 L 24 -59 L 12 -53 Z" fill="#a78bfa" />
                  </g>

                  {/* Isometric bar 3 (Cyan/Teal) */}
                  <g transform="translate(10, 92)">
                    {/* Left side */}
                    <path d="M 0 0 L 12 -6 L 12 -28 L 0 -22 Z" fill="url(#bar-blue)" opacity="0.8" />
                    {/* Right side */}
                    <path d="M 12 -6 L 24 0 L 24 -22 L 12 -28 Z" fill="#0f766e" opacity="0.8" />
                    {/* Top cap */}
                    <path d="M 0 -22 L 12 -28 L 24 -22 L 12 -16 Z" fill="#2dd4bf" opacity="0.8" />
                  </g>

                  {/* Projected target ring */}
                  <ellipse cx="50" cy="85" rx="42" ry="21" stroke="#a78bfa" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
                  <text x="50" y="162" fill="#64748b" fontSize="8" textAnchor="middle" fontWeight="bold" letterSpacing="0.05em">3D VECTOR SPACE</text>
                </g>
              </svg>

              {/* Caption */}
              <div className="mt-4 text-center">
                <p className="text-xs text-slate-400 font-medium">
                  Real-time pipeline: Binary parsing parses cells directly to high-fidelity multidimensional vectors.
                </p>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* CORE VALUES */}
      <section className="px-6 py-24 bg-transparent border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal variant="fade-up">
            <SectionHeader
              eyebrow="VALUES"
              heading="What we stand for"
              subtext="These core principles direct how we build our code and protect user data."
            />
          </ScrollReveal>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Speed */}
            <ScrollReveal variant="fade-up" delay={0.05} className="w-full">
              <div className="bg-[#1E293B]/40 backdrop-blur-sm border border-white/5 p-8 rounded-2xl shadow-2xl text-center space-y-4 h-full">
                <div className="w-12 h-12 bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 text-cyan-400 rounded-xl flex items-center justify-center mx-auto shadow-md">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-heading font-black text-white text-lg">Speed</h3>
                <p className="font-body text-slate-400 text-sm leading-relaxed font-semibold">
                  No waiting. Upload, map variables, and render complex 2D/3D visualizations in seconds.
                </p>
              </div>
            </ScrollReveal>

            {/* Privacy */}
            <ScrollReveal variant="fade-up" delay={0.15} className="w-full">
              <div className="bg-[#1E293B]/40 backdrop-blur-sm border border-white/5 p-8 rounded-2xl shadow-2xl text-center space-y-4 h-full">
                <div className="w-12 h-12 bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 text-cyan-400 rounded-xl flex items-center justify-center mx-auto shadow-md">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-heading font-black text-white text-lg">Privacy</h3>
                <p className="font-body text-slate-400 text-sm leading-relaxed font-semibold">
                  Your data is parsed inside secure volatile browser memory, never saved permanently on physical disk storage.
                </p>
              </div>
            </ScrollReveal>

            {/* Clarity */}
            <ScrollReveal variant="fade-up" delay={0.25} className="w-full">
              <div className="bg-[#1E293B]/40 backdrop-blur-sm border border-white/5 p-8 rounded-2xl shadow-2xl text-center space-y-4 h-full">
                <div className="w-12 h-12 bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 text-cyan-400 rounded-xl flex items-center justify-center mx-auto shadow-md">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-heading font-black text-white text-lg">Clarity</h3>
                <p className="font-body text-slate-400 text-sm leading-relaxed font-semibold">
                  We turn complex columns, multi-axis variables, and formulas into simple plain English recommendations.
                </p>
              </div>
            </ScrollReveal>
          </StaggerContainer>
        </div>
      </section>

      {/* NEW SECTION: DATA METRIC TELEMETRY SCHEMATICS */}
      <section className="px-6 py-24 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Visual Schematic Diagram */}
            <ScrollReveal variant="fade-right" className="w-full order-last lg:order-first">
              <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl min-h-[350px] flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,#6366f1/5,transparent_80%)]" />

                {/* Advanced Radar and Metric Flow Visualizer */}
                <svg className="w-full max-w-[420px] h-[240px] text-cyan-400 relative z-10" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Concentric grid lines */}
                  <circle cx="200" cy="120" r="90" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
                  <circle cx="200" cy="120" r="65" stroke="#475569" strokeWidth="1" opacity="0.4" />
                  <circle cx="200" cy="120" r="40" stroke="#475569" strokeWidth="1" strokeDasharray="2 2" opacity="0.3" />

                  {/* Axis lines */}
                  <line x1="200" y1="20" x2="200" y2="220" stroke="#475569" strokeWidth="1" opacity="0.3" />
                  <line x1="100" y1="120" x2="300" y2="120" stroke="#475569" strokeWidth="1" opacity="0.3" />
                  <line x1="129" y1="49" x2="271" y2="191" stroke="#475569" strokeWidth="1" opacity="0.2" />
                  <line x1="129" y1="191" x2="271" y2="49" stroke="#475569" strokeWidth="1" opacity="0.2" />

                  {/* Telemetry Heat Area (Competency Radar Model) */}
                  <polygon points="200,45 250,90 280,120 220,165 170,140 145,120 180,80" fill="url(#glow-grad)" fillOpacity="0.45" stroke="#06b6d4" strokeWidth="2" />

                  {/* Moving Data Nodes */}
                  <circle cx="200" cy="45" r="4" fill="#06b6d4" />
                  <circle cx="250" cy="90" r="4" fill="#8b5cf6" />
                  <circle cx="280" cy="120" r="4" fill="#06b6d4" />
                  <circle cx="220" cy="165" r="4" fill="#6366f1" />
                  <circle cx="170" cy="140" r="4" fill="#06b6d4" />

                  {/* Floating Metric Cards */}
                  <g transform="translate(15, 20)">
                    <rect x="0" y="0" width="85" height="40" rx="6" fill="#1e293b" fillOpacity="0.75" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                    <text x="8" y="15" fill="#94a3b8" fontSize="8" fontWeight="bold">AXIS CONFIDENCE</text>
                    <text x="8" y="30" fill="#10b981" fontSize="11" fontWeight="bold">99.84%</text>
                    <circle cx="73" cy="20" r="3" fill="#10b981" />
                  </g>

                  <g transform="translate(300, 175)">
                    <rect x="0" y="0" width="85" height="40" rx="6" fill="#1e293b" fillOpacity="0.75" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                    <text x="8" y="15" fill="#94a3b8" fontSize="8" fontWeight="bold">LATENCY INDEX</text>
                    <text x="8" y="30" fill="#06b6d4" fontSize="11" fontWeight="bold">12ms</text>
                    <circle cx="73" cy="20" r="3" fill="#06b6d4" />
                  </g>
                </svg>

                <p className="text-xs text-slate-400 font-medium mt-4">
                  Multi-axial telemetry rendering maps 7 key cell traits synchronously.
                </p>
              </div>
            </ScrollReveal>

            {/* Text description */}
            <ScrollReveal variant="fade-left" className="space-y-6">
              <span className="inline-block text-[10px] font-heading font-extrabold tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full uppercase">ENGINE CAPABILITIES</span>
              <h2 className="text-3xl sm:text-4xl font-heading font-black text-white leading-tight">
                Designed for speed, built for professional precision
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-body font-medium">
                Our rendering systems take standard corporate worksheets and plot them inside visual containers optimized for board meetings. Standard data bars become glowing dimensional items; tabular rows turn into telemetry summaries.
              </p>
              <ul className="space-y-3.5 pt-2">
                {[
                  "Optimized WebGL vectors for fluid rotating structures",
                  "Precise scale matching automatically calibrated per column",
                  "Auto-summaries that outline anomalies in plain English"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-slate-350 font-medium">
                    <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <CTABanner
        heading="Unlock Data Insights"
        subtext="Start utilizing standard 2D charts and WebGL 3D projections free today."
      />

    </div>
  );
};

export default AboutUs;
