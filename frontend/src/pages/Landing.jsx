import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  SectionHeader, 
  TestimonialCard, 
  CTABanner 
} from '../components/MarketingUIComponents';
import { ScrollReveal, StaggerContainer } from '../components/ScrollReveal';

// Premium Visual Asset Placeholder component
const VisualPlaceholder = ({ title, subtitle, isVideo = false }) => {
  return (
    <div className="bg-[#111827] border border-white/5 rounded-[24px] p-8 flex flex-col items-center justify-center text-center min-h-[300px] relative overflow-hidden group shadow-2xl">
      {/* Background neon glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cyan-500/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-cyan-500/10 transition-all duration-500" />
      <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-indigo-500/5 rounded-full blur-[30px] pointer-events-none" />

      {/* Decorative vector meshes */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="relative z-10 space-y-4">
        {/* Glowing Icon Container */}
        <div className="w-16 h-16 bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center mx-auto shadow-md group-hover:scale-105 transition-transform duration-300">
          {isVideo ? (
            /* Video Camera Icon */
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          ) : (
            /* Image Icon */
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )}
        </div>
        
        <div>
          <h4 className="font-heading font-black text-white text-sm uppercase tracking-widest">{title}</h4>
          <p className="font-body text-slate-500 text-xs mt-1.5 max-w-xs mx-auto leading-relaxed">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

// 1. Workbook Ingestion Mockup Visual
const ParsingMockup = () => (
  <div className="bg-[#0B0F19]/90 border border-white/10 rounded-2xl p-6 relative overflow-hidden h-[260px] md:h-[280px] flex flex-col justify-between shadow-inner group-hover:border-cyan-500/20 transition-colors duration-300">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(6,182,212,0.05),transparent_60%)] pointer-events-none" />
    <div className="space-y-4">
      {/* File Row */}
      <div className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500/10 border border-emerald-500/20 text-emerald-450 rounded-lg flex items-center justify-center font-bold text-xs">XLS</div>
          <div>
            <h5 className="text-white text-xs font-bold leading-none">Q4_Revenue_Model.xlsx</h5>
            <span className="text-[10px] text-slate-500 mt-1 block">1.4 MB • Excel Workbook</span>
          </div>
        </div>
        <span className="text-[10px] text-emerald-400 font-extrabold uppercase bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25">Parsed</span>
      </div>
      {/* Detail Grid */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white/5 p-2 rounded-lg text-center border border-white/5">
          <span className="text-slate-500 text-[9px] block uppercase font-bold">Sheets</span>
          <span className="text-white text-sm font-black font-heading mt-0.5 block">03</span>
        </div>
        <div className="bg-white/5 p-2 rounded-lg text-center border border-white/5">
          <span className="text-slate-500 text-[9px] block uppercase font-bold">Columns</span>
          <span className="text-white text-sm font-black font-heading mt-0.5 block">14</span>
        </div>
        <div className="bg-white/5 p-2 rounded-lg text-center border border-white/5">
          <span className="text-slate-500 text-[9px] block uppercase font-bold">Rows</span>
          <span className="text-white text-sm font-black font-heading mt-0.5 block">1,842</span>
        </div>
      </div>
      {/* Sheets selectors list */}
      <div className="flex gap-1.5 pt-1">
        {['✓ SalesData', '✓ OutliersList', '✓ ForecastLogs'].map((sheet, i) => (
          <span key={i} className="text-[9px] bg-cyan-950/20 border border-cyan-500/15 text-cyan-400 font-semibold px-2 py-0.5 rounded-full">{sheet}</span>
        ))}
      </div>
    </div>
    <div className="text-[10px] text-slate-505 border-t border-white/5 pt-3 flex items-center gap-1.5 font-bold uppercase">
      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
      Ready for 3D Visualizer Mapping
    </div>
  </div>
);

// 2. 2D Visualization Mockup Visual
const VisualizationMockup = () => (
  <div className="bg-[#0B0F19]/90 border border-white/10 rounded-2xl p-6 relative overflow-hidden h-[260px] md:h-[280px] flex flex-col justify-between shadow-inner group-hover:border-cyan-500/20 transition-colors duration-300">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.05),transparent_60%)] pointer-events-none" />
    <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
      <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider font-heading">Interactive Chart.js View</span>
      <div className="flex gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
      </div>
    </div>
    {/* SVG Chart Graphic */}
    <div className="my-auto h-28 relative flex items-center justify-center">
      <svg className="w-full h-full text-cyan-400" viewBox="0 0 100 35" fill="none">
        <defs>
          <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        {/* Gridlines */}
        <line x1="0" y1="5" x2="100" y2="5" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        <line x1="0" y1="15" x2="100" y2="15" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        {/* Line Fill */}
        <path d="M0 32 L15 25 L35 15 L50 22 L70 8 L85 12 L100 2" stroke="none" fill="url(#chart-glow)" />
        {/* Line Stroke */}
        <path d="M0 32 L15 25 L35 15 L50 22 L70 8 L85 12 L100 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        {/* Active Node Tooltip */}
        <circle cx="70" cy="8" r="3" fill="#FFF" stroke="#6366F1" strokeWidth="1.5" className="animate-pulse" />
      </svg>
      {/* Tooltip Overlay */}
      <div className="absolute top-[5px] left-[55%] bg-[#0f172a] border border-cyan-500/30 rounded-lg p-2 shadow-xl text-[9px] font-mono leading-relaxed select-none">
        <p className="text-slate-400 font-bold">Month: Oct</p>
        <p className="text-cyan-400 font-extrabold">Rev: $24.8k (+12%)</p>
      </div>
    </div>
    <div className="text-[10px] text-slate-500 pt-2 flex justify-between items-center font-bold uppercase">
      <span>Layout: Spline Curve</span>
      <span>Tooltip active</span>
    </div>
  </div>
);

// 3. Immersive 3D Chart Mockup Visual (Isometric Projection Grid)
const ThreeDMockup = () => (
  <div className="bg-[#0B0F19]/90 border border-white/10 rounded-2xl p-6 relative overflow-hidden h-[260px] md:h-[280px] flex flex-col justify-between shadow-inner group-hover:border-cyan-500/20 transition-colors duration-300">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.06),transparent_75%)] pointer-events-none" />
    <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
      <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider font-heading">Three.js WebGL spatial grid</span>
      <span className="text-[10px] bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 font-bold px-2 py-0.5 rounded">3D Orbit</span>
    </div>
    {/* 3D Isometric Columns SVG */}
    <div className="my-auto h-32 relative flex items-center justify-center">
      <svg className="w-44 h-32 text-cyan-400" viewBox="0 0 100 80" fill="none">
        {/* Isometric Grid Floor */}
        <polygon points="50,75 85,55 50,35 15,55" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <line x1="32.5" y1="65" x2="67.5" y2="45" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        <line x1="67.5" y1="65" x2="32.5" y2="45" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        
        {/* Isometric Pillars */}
        {/* Pillar 1 (Left - Indigo) */}
        <polygon points="25,50 35,45 35,25 25,30" fill="#4338CA" opacity="0.6" />
        <polygon points="35,45 45,50 45,30 35,25" fill="#4F46E5" opacity="0.7" />
        <polygon points="25,30 35,25 45,30 35,35" fill="#818CF8" />

        {/* Pillar 2 (Center - Cyan) */}
        <polygon points="40,62 50,57 50,22 40,27" fill="#0E7490" opacity="0.6" />
        <polygon points="50,57 60,62 60,27 50,22" fill="#06B6D4" opacity="0.7" />
        <polygon points="40,27 50,22 60,27 50,32" fill="#22D3EE" />

        {/* Pillar 3 (Right - Rose/Magenta) */}
        <polygon points="55,52 65,47 65,37 55,42" fill="#BE185D" opacity="0.6" />
        <polygon points="65,47 75,52 75,42 65,37" fill="#DB2777" opacity="0.7" />
        <polygon points="55,42 65,37 75,42 65,47" fill="#F472B6" />
      </svg>
    </div>
    <div className="text-[10px] text-slate-500 flex justify-between items-center font-bold uppercase">
      <span>Render: WebGL Engine</span>
      <span>GPU active (60fps)</span>
    </div>
  </div>
);

// 4. AI-Powered Insights Mockup Visual
const AIInsightsMockup = () => (
  <div className="bg-[#0B0F19]/90 border border-white/10 rounded-2xl p-6 relative overflow-hidden h-[260px] md:h-[280px] flex flex-col justify-between shadow-inner group-hover:border-cyan-500/20 transition-colors duration-300">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(6,182,212,0.05),transparent_60%)] pointer-events-none" />
    <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
        <span className="text-[10px] text-white font-bold uppercase tracking-wider font-heading">AI Synthesis Terminal</span>
      </div>
      <span className="text-[9px] text-cyan-400 font-mono font-bold">GPT-4 Active</span>
    </div>
    {/* Terminal Code Lines */}
    <div className="my-auto font-mono text-[9px] text-slate-300 space-y-2.5 leading-relaxed bg-black/30 p-4 rounded-xl border border-white/5">
      <p className="text-cyan-400 font-extrabold flex items-center gap-1.5 leading-none">
        <span>🤖</span> [System] Analyzing statistical parameters...
      </p>
      <p className="text-slate-400 leading-normal">
        <span className="text-indigo-400">✓ Spike:</span> Revenue anomaly of <span className="text-white font-bold">+300%</span> in November verified.
      </p>
      <p className="text-slate-400 leading-normal">
        <span className="text-red-400">⚡ Alert:</span> Row 1024 expense variance exceeds <span className="text-white font-bold">3.2σ</span> (anomaly).
      </p>
      <p className="text-slate-400 leading-normal">
        <span className="text-emerald-400">★ Action:</span> Shift budget allocations to organic digital channels.
      </p>
    </div>
    <div className="text-[10px] text-slate-500 flex justify-between items-center font-bold uppercase">
      <span>Stream: Secure Vector Sync</span>
      <span>Calculations Complete</span>
    </div>
  </div>
);

// 5. Historical Analysis Logs Mockup Visual
const HistoryMockup = () => (
  <div className="bg-[#0B0F19]/90 border border-white/10 rounded-2xl p-6 relative overflow-hidden h-[260px] md:h-[280px] flex flex-col justify-between shadow-inner group-hover:border-cyan-500/20 transition-colors duration-300">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.05),transparent_60%)] pointer-events-none" />
    <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
      <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider font-heading">Encrypted User Vault Logs</span>
      <span className="text-[9px] text-emerald-450 font-extrabold flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Encrypted
      </span>
    </div>
    {/* Logs List Mock */}
    <div className="my-auto space-y-2">
      <div className="flex justify-between items-center p-2.5 bg-white/5 border border-white/5 rounded-lg text-xs hover:bg-white/10 transition-colors">
        <div className="flex items-center gap-2">
          <span className="text-cyan-400">📊</span>
          <div>
            <p className="text-white text-[10px] font-bold leading-none">Q3_Perf_Model.xlsx</p>
            <span className="text-[8px] text-slate-500 mt-1 block">15 mins ago • Bar chart</span>
          </div>
        </div>
        <span className="text-[9px] text-cyan-400 hover:underline font-extrabold cursor-pointer">Reload</span>
      </div>
      <div className="flex justify-between items-center p-2.5 bg-white/5 border border-white/5 rounded-lg text-xs hover:bg-white/10 transition-colors">
        <div className="flex items-center gap-2">
          <span className="text-indigo-400">📈</span>
          <div>
            <p className="text-white text-[10px] font-bold leading-none">FinTrack_Outliers.xlsx</p>
            <span className="text-[8px] text-slate-500 mt-1 block">Yesterday • 3D grid</span>
          </div>
        </div>
        <span className="text-[9px] text-cyan-400 hover:underline font-extrabold cursor-pointer">Reload</span>
      </div>
    </div>
    <div className="text-[10px] text-slate-500 flex justify-between items-center font-bold uppercase">
      <span>Storage: Client Volatile Cache</span>
      <span>Reload speed: 50ms</span>
    </div>
  </div>
);

// 6. Exportable Reports Mockup Visual
const ExportMockup = () => (
  <div className="bg-[#0B0F19]/90 border border-white/10 rounded-2xl p-6 relative overflow-hidden h-[260px] md:h-[280px] flex flex-col justify-between shadow-inner group-hover:border-cyan-500/20 transition-colors duration-300">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(6,182,212,0.05),transparent_60%)] pointer-events-none" />
    <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
      <span className="text-[10px] text-slate-455 font-bold uppercase tracking-wider font-heading">Exporting Dashboards snapshot</span>
      <span className="text-[9px] text-cyan-400 font-bold">100% Secure</span>
    </div>
    {/* Download progress UI */}
    <div className="my-auto space-y-4">
      <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-2">
        <div className="flex justify-between items-center text-[10px]">
          <span className="text-white font-extrabold">Executive_Report_Brief.pdf</span>
          <span className="text-cyan-455 font-black">88%</span>
        </div>
        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full" style={{ width: '88%' }} />
        </div>
      </div>
      {/* Quick Buttons */}
      <div className="flex gap-2">
        <button className="flex-1 bg-[#0f172a] border border-cyan-500/30 hover:border-cyan-400 text-cyan-400 font-extrabold text-[9px] uppercase tracking-wider py-2.5 rounded-lg transition-colors leading-none shadow-md">
          📄 Download PDF
        </button>
        <button className="flex-1 bg-white/5 border border-white/10 hover:border-white/20 text-white font-extrabold text-[9px] uppercase tracking-wider py-2.5 rounded-lg transition-colors leading-none">
          📷 Save Image
        </button>
      </div>
    </div>
    <div className="text-[10px] text-slate-500 flex justify-between items-center font-bold uppercase">
      <span>Type: Boardroom PDF compiler</span>
      <span>Rendering Engine: PDFKit</span>
    </div>
  </div>
);

const Landing = () => {
  // Counters for stats
  const [analyzedCount, setAnalyzedCount] = useState(7800);
  const [teamsCount, setTeamsCount] = useState(380);
  const [chartsCount, setChartsCount] = useState(2100000);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnalyzedCount(prev => (prev < 10000 ? prev + 115 : 10000));
      setTeamsCount(prev => (prev < 500 ? prev + 7 : 500));
      setChartsCount(prev => (prev < 3000000 ? prev + 48000 : 3000000));
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-transparent min-h-screen text-slate-200 relative overflow-hidden font-body pt-20">

      {/* 1. HERO SECTION */}
      <section className="relative px-6 py-20 lg:py-32 overflow-hidden">
        {/* Radiant ambient glow in background */}
        <div className="glow-accent top-[-10%] left-[20%] w-[60%] h-[40%] bg-cyan-500/10" />
        <div className="glow-accent bottom-[-10%] right-[10%] w-[50%] h-[45%] bg-indigo-500/10" />
        
        {/* Dot grid texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto text-center relative z-10 space-y-8">
          {/* Eyebrow label */}
          <ScrollReveal variant="fade-up" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/25 rounded-full shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="text-[10px] font-heading font-extrabold tracking-widest text-cyan-400 uppercase">
                🚀 Now Powered by OpenAI GPT-4
              </span>
            </div>
          </ScrollReveal>

          {/* Title (H1) */}
          <ScrollReveal variant="fade-up" delay={0.2}>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 leading-none max-w-5xl mx-auto">
              Turn Your Spreadsheets Into <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                Instant Business Intelligence.
              </span>
            </h1>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal variant="fade-up" delay={0.3}>
            <p className="text-slate-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-medium">
              Upload any Excel workbook. Get stunning 2D & 3D visualizations, AI-driven insights, and exportable reports — in seconds.
            </p>
          </ScrollReveal>

          {/* CTA Buttons */}
          <ScrollReveal variant="fade-up" delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-heading font-extrabold px-8 py-4 rounded-xl shadow-xl shadow-cyan-500/20 transition-all text-xs uppercase tracking-wider block"
                >
                  Start Analyzing Free
                </Link>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Social Proof */}
          <ScrollReveal variant="fade-up" delay={0.5}>
            <p className="text-[10px] font-heading font-black tracking-widest text-slate-500 pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6 uppercase">
              <span>✓ No credit card required</span>
              <span className="text-slate-700 hidden sm:inline">•</span>
              <span>✓ Works with .xls & .xlsx</span>
              <span className="text-slate-700 hidden sm:inline">•</span>
              <span>✓ Free forever plan</span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. TRUST / LOGO BAR */}
      <ScrollReveal variant="fade-up" delay={0.1} amount={0.2}>
        <section className="border-y border-white/5 py-10 bg-[#111827]/30 relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
            <p className="text-[10px] font-heading font-black text-slate-500 uppercase tracking-widest">
              Trusted by analysts at leading companies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-45">
              {['Acme Corp', 'FinTrack', 'DataBridge', 'Apex Solutions', 'Global Ventures', 'Prime Analytics'].map((brand, i) => (
                <span key={i} className="text-base sm:text-lg font-heading font-black tracking-wider text-slate-400 select-none">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 3. FEATURES OVERVIEW */}
      <section className="px-6 py-24 lg:py-32 bg-[#0B0F19]/40 backdrop-blur-md border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal variant="fade-up">
            <SectionHeader 
              eyebrow="WHAT YOU GET" 
              heading="Everything you need to understand your data"
              subtext="From raw spreadsheets to actionable intelligence, ExcelViz handles every step without complicated setups."
            />
          </ScrollReveal>
          
          {/* Sticky Stacked Cards container */}
          <div className="relative max-w-6xl mx-auto mt-16 space-y-16 pb-20">
            
            {/* Card 1: Workbook Ingestion */}
            <div className="sticky top-[100px] z-10 w-full bg-[#111827]/75 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl transition-all duration-300 hover:border-cyan-500/20 group mb-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(6,182,212,0.03),transparent_60%)] pointer-events-none rounded-[32px]" />
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center relative z-10">
                {/* Left: Text Content */}
                <div className="lg:col-span-3 space-y-6 text-left">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-gradient-to-tr from-cyan-500 to-indigo-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/10">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    </div>
                    <span className="text-4xl font-heading font-black tracking-tighter text-slate-800 select-none">01</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-heading font-black text-white group-hover:text-cyan-400 transition-colors">
                    Instant Workbook Parsing
                  </h3>
                  <p className="font-body text-slate-400 text-sm sm:text-base leading-relaxed font-medium">
                    Drag and drop any .xls or .xlsx spreadsheet file directly into active browser memory. ExcelViz parses and renders sheet structures instantly inside active browser memory with zero permanent server-side disk storage, guaranteeing total client data security.
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-body text-slate-300 font-bold">
                    <li className="flex items-center gap-2"><span className="text-cyan-400">⚡</span> Real-time parsing under 100ms</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">📁</span> Multi-sheet workbook detection</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">🛡️</span> Zero server-side persistence</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">📊</span> Auto column schema extraction</li>
                  </ul>
                  <div className="pt-2">
                    <Link to="/register" className="font-body text-xs font-extrabold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5 group/link uppercase tracking-wider">
                      Learn More <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
                {/* Right: Mockup */}
                <div className="lg:col-span-2 w-full">
                  <ParsingMockup />
                </div>
              </div>
            </div>

            {/* Card 2: 2D Visualizations */}
            <div className="sticky top-[120px] z-20 w-full bg-[#121a2c]/85 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl transition-all duration-300 hover:border-cyan-500/20 group mb-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(99,102,241,0.03),transparent_60%)] pointer-events-none rounded-[32px]" />
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center relative z-10">
                {/* Left: Text Content */}
                <div className="lg:col-span-3 space-y-6 text-left">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-gradient-to-tr from-cyan-500 to-indigo-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/10">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                    </div>
                    <span className="text-4xl font-heading font-black tracking-tighter text-slate-800 select-none">02</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-heading font-black text-white group-hover:text-cyan-400 transition-colors">
                    Dynamic 2D Visualizations
                  </h3>
                  <p className="font-body text-slate-400 text-sm sm:text-base leading-relaxed font-medium">
                    Convert complex metrics tables into clean, interactive 2D graphics. Render lines, bars, scatters, radars, and pie charts with responsive containers, customized legends, and high-fidelity hovering data tooltips powered by Chart.js.
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-body text-slate-300 font-bold">
                    <li className="flex items-center gap-2"><span className="text-cyan-400">📈</span> 5 chart layout selections</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">💬</span> Hover telemetry data tooltips</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">🔄</span> On-the-fly legends series filters</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">🎨</span> Curated HSL color schemes</li>
                  </ul>
                  <div className="pt-2">
                    <Link to="/register" className="font-body text-xs font-extrabold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5 group/link uppercase tracking-wider">
                      Learn More <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
                {/* Right: Mockup */}
                <div className="lg:col-span-2 w-full">
                  <VisualizationMockup />
                </div>
              </div>
            </div>

            {/* Card 3: Immersive 3D Charts */}
            <div className="sticky top-[140px] z-30 w-full bg-[#111827]/75 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl transition-all duration-300 hover:border-cyan-500/20 group mb-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(6,182,212,0.03),transparent_60%)] pointer-events-none rounded-[32px]" />
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center relative z-10">
                {/* Left: Text Content */}
                <div className="lg:col-span-3 space-y-6 text-left">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-gradient-to-tr from-cyan-500 to-indigo-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/10">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                    </div>
                    <span className="text-4xl font-heading font-black tracking-tighter text-slate-800 select-none">03</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-heading font-black text-white group-hover:text-cyan-400 transition-colors">
                    Immersive 3D Charts
                  </h3>
                  <p className="font-body text-slate-400 text-sm sm:text-base leading-relaxed font-medium">
                    Take your data to the third dimension. Walk through your multi-axis spreadsheet grids inside a WebGL-powered 3D spatial coordinate engine. Rotate, zoom, and inspect data points represented as translucent pillars to locate spikes.
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-body text-slate-300 font-bold">
                    <li className="flex items-center gap-2"><span className="text-cyan-400">🧊</span> Spatial WebGL coordinate mapping</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">🔄</span> Full 360° click-and-orbit camera</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">🔍</span> Precision zoom mapping controls</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">💡</span> Translucent coordinate guidance grids</li>
                  </ul>
                  <div className="pt-2">
                    <Link to="/register" className="font-body text-xs font-extrabold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5 group/link uppercase tracking-wider">
                      Learn More <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
                {/* Right: Mockup */}
                <div className="lg:col-span-2 w-full">
                  <ThreeDMockup />
                </div>
              </div>
            </div>

            {/* Card 4: AI-Powered Insights */}
            <div className="sticky top-[160px] z-40 w-full bg-[#121a2c]/85 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl transition-all duration-300 hover:border-cyan-500/20 group mb-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(99,102,241,0.03),transparent_60%)] pointer-events-none rounded-[32px]" />
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center relative z-10">
                {/* Left: Text Content */}
                <div className="lg:col-span-3 space-y-6 text-left">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-gradient-to-tr from-cyan-500 to-indigo-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/10">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                    </div>
                    <span className="text-4xl font-heading font-black tracking-tighter text-slate-800 select-none">04</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-heading font-black text-white group-hover:text-cyan-400 transition-colors">
                    AI-Powered Insights
                  </h3>
                  <p className="font-body text-slate-400 text-sm sm:text-base leading-relaxed font-medium">
                    Stop combing through raw columns. Our built-in intelligence engine extracts key workbook statistics, directs parameters securely to OpenAI checkpoints, and instantly compiles executive trend summaries, exceptions, and anomalies.
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-body text-slate-300 font-bold">
                    <li className="flex items-center gap-2"><span className="text-cyan-400">🤖</span> Secure OpenAI GPT-4 sync</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">🔍</span> Outliers & anomaly alerts</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">📝</span> Executive trend briefs</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">★</span> Strategic recommendations list</li>
                  </ul>
                  <div className="pt-2">
                    <Link to="/register" className="font-body text-xs font-extrabold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5 group/link uppercase tracking-wider">
                      Learn More <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
                {/* Right: Mockup */}
                <div className="lg:col-span-2 w-full">
                  <AIInsightsMockup />
                </div>
              </div>
            </div>

            {/* Card 5: Historical Analysis Logs */}
            <div className="sticky top-[180px] z-50 w-full bg-[#111827]/75 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl transition-all duration-300 hover:border-cyan-500/20 group mb-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(6,182,212,0.03),transparent_60%)] pointer-events-none rounded-[32px]" />
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center relative z-10">
                {/* Left: Text Content */}
                <div className="lg:col-span-3 space-y-6 text-left">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-gradient-to-tr from-cyan-500 to-indigo-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/10">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <span className="text-4xl font-heading font-black tracking-tighter text-slate-800 select-none">05</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-heading font-black text-white group-hover:text-cyan-400 transition-colors">
                    Historical Analysis Logs
                  </h3>
                  <p className="font-body text-slate-400 text-sm sm:text-base leading-relaxed font-medium">
                    Revisit past data models anytime. ExcelViz keeps an encrypted session log in your secure local workspace, storing previous uploads, custom configurations, and analytical AI insights for single-click loading and rapid comparisons.
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-body text-slate-300 font-bold">
                    <li className="flex items-center gap-2"><span className="text-cyan-400">🔒</span> Encrypted client session cache</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">🔄</span> Restoration under 50ms</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">📂</span> Secure session timeline syncing</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">⏳</span> Chronological reload selectors</li>
                  </ul>
                  <div className="pt-2">
                    <Link to="/register" className="font-body text-xs font-extrabold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5 group/link uppercase tracking-wider">
                      Learn More <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
                {/* Right: Mockup */}
                <div className="lg:col-span-2 w-full">
                  <HistoryMockup />
                </div>
              </div>
            </div>

            {/* Card 6: Exportable Reports */}
            <div className="sticky top-[200px] z-[60] w-full bg-[#121a2c]/85 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl transition-all duration-300 hover:border-cyan-500/20 group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(99,102,241,0.03),transparent_60%)] pointer-events-none rounded-[32px]" />
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center relative z-10">
                {/* Left: Text Content */}
                <div className="lg:col-span-3 space-y-6 text-left">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-gradient-to-tr from-cyan-500 to-indigo-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/10">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                    </div>
                    <span className="text-4xl font-heading font-black tracking-tighter text-slate-800 select-none">06</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-heading font-black text-white group-hover:text-cyan-400 transition-colors">
                    Exportable Reports
                  </h3>
                  <p className="font-body text-slate-400 text-sm sm:text-base leading-relaxed font-medium">
                    Share your data accomplishments with the board. ExcelViz lets you download complete visual dashboards as high-resolution PNG snapshots or compile fully formatted PDF briefs containing both charts and AI text ready for presentations.
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-body text-slate-300 font-bold">
                    <li className="flex items-center gap-2"><span className="text-cyan-400">📄</span> Boardroom-ready PDF reports</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">📷</span> High-resolution PNG downloads</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">📊</span> Combined layout containing AI text</li>
                    <li className="flex items-center gap-2"><span className="text-cyan-400">🌐</span> Slack & direct sharing formats</li>
                  </ul>
                  <div className="pt-2">
                    <Link to="/register" className="font-body text-xs font-extrabold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5 group/link uppercase tracking-wider">
                      Learn More <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
                {/* Right: Mockup */}
                <div className="lg:col-span-2 w-full">
                  <ExportMockup />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="px-6 py-24 bg-[#111827]/30 backdrop-blur-md border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal variant="fade-up">
            <SectionHeader 
              eyebrow="SIMPLE WORKFLOW" 
              heading="From upload to insight in 3 steps"
              subtext="No complicated setup or custom formulas required. ExcelViz does the hard work."
            />
          </ScrollReveal>
          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
            {/* Connector line */}
            <div className="absolute top-1/3 left-[15%] right-[15%] h-0.5 border-t border-dashed border-white/10 hidden lg:block z-0" />
            
            {/* Step 1 */}
            <ScrollReveal variant="fade-up" delay={0.1} className="space-y-6 text-center relative z-10 flex flex-col items-center w-full">
              <div className="w-14 h-14 bg-[#1E293B] border border-white/5 text-cyan-400 rounded-full flex items-center justify-center font-heading font-extrabold text-lg shadow-lg">
                01
              </div>
              <h3 className="text-xl font-heading font-black text-white">Upload Your Spreadsheet</h3>
              <p className="font-body text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm font-medium animate-none">
                Drag and drop any .xls or .xlsx spreadsheet file. ExcelViz parses and renders sheet structures immediately in active memory.
              </p>
            </ScrollReveal>

            {/* Step 2 */}
            <ScrollReveal variant="fade-up" delay={0.2} className="space-y-6 text-center relative z-10 flex flex-col items-center w-full">
              <div className="w-14 h-14 bg-[#1E293B] border border-white/5 text-cyan-400 rounded-full flex items-center justify-center font-heading font-extrabold text-lg shadow-lg">
                02
              </div>
              <h3 className="text-xl font-heading font-black text-white">Choose Your Visualization</h3>
              <p className="font-body text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm font-medium">
                Select category and value columns, choose between responsive 2D charts or spatial rotating 3D grids, and customize axes.
              </p>
            </ScrollReveal>

            {/* Step 3 */}
            <ScrollReveal variant="fade-up" delay={0.3} className="space-y-6 text-center relative z-10 flex flex-col items-center w-full">
              <div className="w-14 h-14 bg-[#1E293B] border border-white/5 text-cyan-400 rounded-full flex items-center justify-center font-heading font-extrabold text-lg shadow-lg">
                03
              </div>
              <h3 className="text-xl font-heading font-black text-white">Get AI Insights</h3>
              <p className="font-body text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm font-medium">
                Unleash OpenAI to process statistical parameters, flag outliers, detect growth shifts, and outline recommendations.
              </p>
            </ScrollReveal>
          </StaggerContainer>
        </div>
      </section>

      {/* 5. 3D VISUALIZATION PREVIEW SECTION */}
      <section className="px-6 py-24 lg:py-32 bg-[#0B0F19]/40 backdrop-blur-md border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center overflow-hidden">
          
          {/* Left: Placeholder Space for 3D explorer interactive element */}
          <ScrollReveal variant="fade-right" className="w-full">
            <VisualPlaceholder 
              title="3D Telemetry Interactive Canvas Space"
              subtitle="Google Imagen 3 Image Asset. Futuristic WebGL three-dimensional coordinate meshes rising translucent glowing cyan, teal, and blue pillars from an obsidian floor."
            />
          </ScrollReveal>

          {/* Right: Text Content */}
          <ScrollReveal variant="fade-left" className="space-y-8 w-full">
            <div>
              <span className="inline-block text-[10px] font-heading font-extrabold tracking-widest text-cyan-400 uppercase bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full">
                3D VISUALIZATIONS
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-black tracking-tight text-white leading-tight mt-4">
                See your data from every angle
              </h2>
            </div>
            <p className="font-body text-slate-400 text-sm sm:text-base leading-relaxed font-medium">
              ExcelViz's robust Three.js coordinate mapping engine renders your workbook rows as physical spatial dimensions. Rotate, zoom, and inspect data spreads to highlight patterns completely hidden in standard, flat tables.
            </p>
            <ul className="space-y-3 font-body text-slate-350 text-sm font-semibold">
              <li className="flex items-center gap-2.5">
                <span className="w-5 h-5 bg-cyan-950/40 text-cyan-400 rounded-full flex items-center justify-center text-xs">✓</span>
                Click-to-drag multi-axis rotation
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-5 h-5 bg-cyan-950/40 text-cyan-400 rounded-full flex items-center justify-center text-xs">✓</span>
                Precision scroll-to-zoom mapping
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-5 h-5 bg-cyan-950/40 text-cyan-400 rounded-full flex items-center justify-center text-xs">✓</span>
                WebGL lighting grid overlay guides
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-5 h-5 bg-cyan-950/40 text-cyan-400 rounded-full flex items-center justify-center text-xs">✓</span>
                Luminous glowing data point coordinate spheres
              </li>
            </ul>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-2">
              <Link
                to="/register"
                className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-heading font-extrabold px-7 py-3.5 rounded-xl shadow-lg shadow-cyan-500/20 transition-all text-xs uppercase tracking-wider inline-block"
              >
                Try It Free →
              </Link>
            </motion.div>
          </ScrollReveal>

        </div>
      </section>

      {/* 6. AI INSIGHTS PREVIEW SECTION */}
      <section className="px-6 py-24 lg:py-32 bg-[#111827]/40 backdrop-blur-md border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center overflow-hidden">
          
          {/* Left: Text Content */}
          <ScrollReveal variant="fade-right" className="space-y-8 order-2 lg:order-1 w-full">
            <div>
              <span className="inline-block text-[10px] font-heading font-extrabold tracking-widest text-cyan-400 uppercase bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full">
                AI-POWERED ANALYSIS
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-black tracking-tight text-white leading-tight mt-4">
                Your personal data analyst, available 24/7
              </h2>
            </div>
            <p className="font-body text-slate-400 text-sm sm:text-base leading-relaxed font-medium">
              Stop wasting hours combing through raw Excel lines. ExcelViz extracts key sheet metadata, computes structural trends, and channels statistical vectors into custom OpenAI analysis logs to serve actionable insights.
            </p>
            <ul className="space-y-3 font-body text-slate-350 text-sm font-semibold">
              <li className="flex items-center gap-2.5">
                <span className="w-5 h-5 bg-cyan-950/40 text-cyan-400 rounded-full flex items-center justify-center text-xs">✓</span>
                Executive-level growth & trend summaries
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-5 h-5 bg-cyan-950/40 text-cyan-400 rounded-full flex items-center justify-center text-xs">✓</span>
                Automated statistical anomaly detection
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-5 h-5 bg-cyan-950/40 text-cyan-400 rounded-full flex items-center justify-center text-xs">✓</span>
                Structured tactical recommendation lists
              </li>
            </ul>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-2">
              <Link
                to="/register"
                className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-heading font-extrabold px-7 py-3.5 rounded-xl shadow-lg shadow-cyan-500/20 transition-all text-xs uppercase tracking-wider inline-block"
              >
                Start AI Analysis free →
              </Link>
            </motion.div>
          </ScrollReveal>

          {/* Right: Asset Placeholder for AI Ingestion */}
          <ScrollReveal variant="fade-left" className="order-1 lg:order-2 w-full">
            <VisualPlaceholder 
              title="AI Analytics Summary Panel Asset"
              subtitle="Google Imagen 3 Image Asset. Holographic, high-contrast abstract prism lens on dark obsidian navy canvas splitting chaotic gray rows into glowing cyan recommendations."
            />
          </ScrollReveal>

        </div>
      </section>

      {/* 7. SOCIAL PROOF COUNTER STATS */}
      <section className="bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border-y border-cyan-500/10 text-white py-16 relative overflow-hidden z-10 backdrop-blur-sm">
        <StaggerContainer className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 text-center">
          
          <ScrollReveal variant="fade-up" delay={0.05} className="space-y-1 w-full">
            <h3 className="text-3xl sm:text-5xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-400">
              {analyzedCount.toLocaleString()}+
            </h3>
            <p className="font-body text-[10px] text-cyan-400 uppercase tracking-widest font-bold">
              Workbooks Analyzed
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.1} className="space-y-1 w-full">
            <h3 className="text-3xl sm:text-5xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-400">
              {teamsCount}+
            </h3>
            <p className="font-body text-[10px] text-cyan-400 uppercase tracking-widest font-bold">
              Teams Using ExcelViz
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.15} className="space-y-1 w-full">
            <h3 className="text-3xl sm:text-5xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-400">
              {(chartsCount / 1000000).toFixed(1)}M+
            </h3>
            <p className="font-body text-[10px] text-cyan-400 uppercase tracking-widest font-bold">
              Charts Generated
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.2} className="space-y-1 w-full">
            <h3 className="text-3xl sm:text-5xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-400">
              98%
            </h3>
            <p className="font-body text-[10px] text-cyan-400 uppercase tracking-widest font-bold">
              User Satisfaction
            </p>
          </ScrollReveal>

        </StaggerContainer>
      </section>

      {/* 8. TESTIMONIALS SECTION */}
      <section className="px-6 py-24 lg:py-32 bg-[#0B0F19]/40 backdrop-blur-md border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal variant="fade-up">
            <SectionHeader 
              eyebrow="REVIEWS" 
              heading="What analysts are saying"
              subtext="ExcelViz is helping teams transform metrics. Read our customers feedback."
            />
          </ScrollReveal>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal variant="fade-up" delay={0.05} className="w-full h-full">
              <TestimonialCard 
                quote="ExcelViz transformed how our finance team reports quarterly data. The AI summaries alone save us 3 hours every week."
                name="Riya Sharma"
                role="Financial Analyst"
                company="FinTrack"
              />
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={0.15} className="w-full h-full">
              <TestimonialCard 
                quote="The 3D visualizations genuinely impressed our board. No other tool does this so effortlessly."
                name="James K."
                role="Data Manager"
                company="DataBridge"
              />
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={0.25} className="w-full h-full">
              <TestimonialCard 
                quote="Setup took 2 minutes. The insights were immediately actionable. Highly recommend."
                name="Priya M."
                role="Operations Lead"
                company="Acme Corp"
              />
            </ScrollReveal>
          </StaggerContainer>
        </div>
      </section>

      {/* 9. FINAL CTA SECTION */}
      <CTABanner 
        heading="Ready to see your data differently?"
        subtext="Join thousands of analysts using ExcelViz. Free to start, powerful to scale. Upload and visualize spreadsheet charts in seconds."
      />

    </div>
  );
};

export default Landing;
