import React, { useState } from 'react';
import { SectionHeader, CTABanner } from '../components/MarketingUIComponents';
import { ScrollReveal } from '../components/ScrollReveal';

// 1. Workbook Ingestion/Parsing Diagram
const ParsingVisualMockup = () => (
  <div className="bg-[#111827]/75 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 min-h-[320px] flex flex-col justify-between relative overflow-hidden group shadow-2xl">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-emerald-500/10 transition-all duration-500" />
    <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
    
    <div className="flex justify-between items-center border-b border-white/5 pb-4 relative z-10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center font-black text-sm">XLS</div>
        <div>
          <h4 className="text-white text-xs font-bold font-heading leading-tight">Q4_Revenue_Model.xlsx</h4>
          <span className="text-[10px] text-slate-500 block font-semibold mt-0.5">1.4 MB • Excel Workbook</span>
        </div>
      </div>
      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-full font-black uppercase tracking-wider">
        PARSED (100%)
      </span>
    </div>

    <div className="my-6 space-y-3.5 relative z-10">
      <div className="bg-slate-950/40 p-4 rounded-2xl border border-white/5 space-y-2">
        <div className="flex justify-between text-[10px] font-heading font-black text-slate-400 uppercase tracking-wider">
          <span>Row Reading Progress</span>
          <span className="text-emerald-400">1,842 rows / 1,842 rows</span>
        </div>
        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full w-full animate-pulse" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2.5 text-center">
        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
          <span className="text-slate-500 text-[9px] block uppercase font-heading font-black tracking-wide">Sheets</span>
          <span className="text-white text-base font-black font-heading mt-1 block">03</span>
        </div>
        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
          <span className="text-slate-500 text-[9px] block uppercase font-heading font-black tracking-wide">Columns</span>
          <span className="text-white text-base font-black font-heading mt-1 block">14</span>
        </div>
        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
          <span className="text-slate-500 text-[9px] block uppercase font-heading font-black tracking-wide">Datatypes</span>
          <span className="text-cyan-400 text-xs font-black font-heading mt-1 block uppercase">Auto</span>
        </div>
      </div>
    </div>

    <div className="text-[10px] text-slate-400 border-t border-white/5 pt-4 flex items-center justify-between font-heading font-black uppercase tracking-wider relative z-10">
      <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> Pipeline active</span>
      <span className="text-emerald-450">Ready for 2D/3D Mapping</span>
    </div>
  </div>
);

// 2. Three.js 3D Coordinate Grid Space
const ThreeDVisualMockup = () => (
  <div className="bg-[#111827]/75 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 min-h-[320px] flex flex-col justify-between relative overflow-hidden group shadow-2xl">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cyan-500/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-cyan-500/10 transition-all duration-500" />
    
    <div className="flex justify-between items-center border-b border-white/5 pb-4 relative z-10">
      <span className="text-[10px] text-slate-400 font-heading font-black uppercase tracking-widest">3D Spatial Grid Projections</span>
      <div className="flex gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
      </div>
    </div>

    <div className="my-auto h-40 relative flex items-center justify-center relative z-10">
      <svg className="w-56 h-40 text-cyan-400" viewBox="0 0 120 90" fill="none">
        <polygon points="60,85 105,60 60,35 15,60" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <line x1="37.5" y1="72.5" x2="82.5" y2="47.5" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
        <line x1="82.5" y1="72.5" x2="37.5" y2="47.5" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
        
        {/* Isometric Pillars */}
        <polygon points="30,55 40,50 40,25 30,30" fill="#4f46e5" opacity="0.6" />
        <polygon points="40,50 50,55 50,30 40,25" fill="#6366f1" opacity="0.75" />
        <polygon points="30,30 40,25 50,30 40,35" fill="#818cf8" />
        
        <polygon points="52,70 62,65 62,20 52,25" fill="#0891b2" opacity="0.6" />
        <polygon points="62,65 72,70 72,25 62,20" fill="#06b6d4" opacity="0.75" />
        <polygon points="52,25 62,20 72,25 62,30" fill="#22d3ee" />
        
        <polygon points="75,58 85,53 85,33 75,38" fill="#7c3aed" opacity="0.6" />
        <polygon points="85,53 95,58 95,38 85,33" fill="#8b5cf6" opacity="0.75" />
        <polygon points="75,38 85,33 95,38 85,43" fill="#a78bfa" />
        
        {/* Floating elements */}
        <circle cx="62" cy="12" r="1.5" fill="#22d3ee" className="animate-pulse" />
        <circle cx="85" cy="25" r="1" fill="#a78bfa" />
        <circle cx="40" cy="18" r="1" fill="#818cf8" />
      </svg>
      
      <div className="absolute top-2 left-2 bg-[#0b0f19] border border-cyan-500/30 text-cyan-400 text-[8px] font-heading font-black uppercase tracking-widest px-2 py-0.5 rounded shadow">
        WebGL Orbit Active
      </div>
    </div>

    <div className="text-[10px] text-slate-400 border-t border-white/5 pt-4 flex justify-between items-center font-heading font-black uppercase tracking-wider relative z-10">
      <span>WebGL GPU Acceleration</span>
      <span className="text-cyan-400">60 FPS</span>
    </div>
  </div>
);

// 3. AI Summarization Panel Mockup
const AIVisualMockup = () => (
  <div className="bg-[#111827]/75 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 min-h-[320px] flex flex-col justify-between relative overflow-hidden group shadow-2xl">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-500/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-indigo-500/10 transition-all duration-500" />
    
    <div className="flex justify-between items-center border-b border-white/5 pb-4 relative z-10">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
        <span className="text-[10px] text-slate-450 font-heading font-black uppercase tracking-widest">AI Intelligence Terminal</span>
      </div>
      <span className="text-[9px] text-cyan-400 font-mono font-bold bg-cyan-500/10 border border-cyan-500/25 px-2 py-0.5 rounded">GPT-4 PRO</span>
    </div>

    <div className="my-4 font-mono text-[10px] text-slate-350 space-y-3 leading-relaxed bg-[#0b0f19]/60 p-5 rounded-2xl border border-white/5 relative z-10">
      <div className="flex items-center gap-2 text-cyan-400 font-black leading-none mb-1">
        <span>🤖</span>
        <span>[System] Core statistical scan complete.</span>
      </div>
      <p className="leading-normal">
        <strong className="text-indigo-400">✓ Revenue Spike:</strong> Anomaly verified in Nov (<span className="text-white font-extrabold">+300%</span>).
      </p>
      <p className="leading-normal">
        <strong className="text-rose-400">⚡ Cost Alert:</strong> Expense variance exceeds <span className="text-white font-extrabold">3.2σ</span> standard deviations.
      </p>
      <p className="leading-normal">
        <strong className="text-emerald-400">★ Action Strategy:</strong> Shift budget to organic search marketing campaigns.
      </p>
    </div>

    <div className="text-[10px] text-slate-400 border-t border-white/5 pt-4 flex justify-between items-center font-heading font-black uppercase tracking-wider relative z-10">
      <span>Synthesis Stream</span>
      <span className="text-emerald-450">Calculations Complete</span>
    </div>
  </div>
);

const ProductTour = () => {
  // 2D Chart Switcher State
  const [activeChartTab, setActiveChartTab] = useState('line');

  const chartTypes = {
    line: {
      title: 'Line Graphs',
      strengths: 'Best for tracking continuous metrics, seasonal timelines, and progression patterns.',
      useCase: 'Visualizing quarterly sales growth or stock values over 12 months.',
      mockup: (
        <svg className="w-full h-40 text-cyan-400" viewBox="0 0 100 30" fill="none">
          <path d="M5 25 Q 25 10, 45 18 T 85 5 T 95 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M5 25 Q 25 10, 45 18 T 85 5 T 95 8 L 95 28 L 5 28 Z" fill="url(#cyan-gradient)" opacity="0.1" />
          <defs>
            <linearGradient id="cyan-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      )
    },
    bar: {
      title: 'Bar Charts',
      strengths: 'Outstanding for discrete category benchmarks, direct group sizes, and segment comparisons.',
      useCase: 'Analyzing employee headcount across departments or conversion rates per campaign.',
      mockup: (
        <div className="w-full h-40 flex items-end justify-between px-6 pt-8">
          <div className="w-8 bg-cyan-500 rounded-t-md h-[40%]" />
          <div className="w-8 bg-cyan-500 rounded-t-md h-[75%]" />
          <div className="w-8 bg-indigo-400 rounded-t-md h-[55%]" />
          <div className="w-8 bg-cyan-600 rounded-t-md h-[90%]" />
          <div className="w-8 bg-indigo-500 rounded-t-md h-[30%]" />
        </div>
      )
    },
    scatter: {
      title: 'Scatter Plots',
      strengths: 'Perfect for spotting spatial correlations, clusters, density levels, and regression trends.',
      useCase: 'Plotting user acquisition costs against retention rates across cohorts.',
      mockup: (
        <div className="w-full h-40 relative mt-6">
          <div className="absolute top-[20%] left-[30%] w-3 h-3 bg-cyan-500 rounded-full" />
          <div className="absolute top-[45%] left-[50%] w-4 h-4 bg-indigo-400 rounded-full" />
          <div className="absolute top-[60%] left-[15%] w-3.5 h-3.5 bg-cyan-600 rounded-full" />
          <div className="absolute top-[35%] left-[75%] w-5 h-5 bg-indigo-500 rounded-full" />
          <div className="absolute top-[80%] left-[40%] w-3 h-3 bg-cyan-500 rounded-full" />
          <div className="absolute top-[10%] left-[60%] w-4 h-4 bg-cyan-500 rounded-full" />
        </div>
      )
    },
    radar: {
      title: 'Radar Graphs',
      strengths: 'Best for comparing multi-variable metrics, profile strengths, and dimensional balances.',
      useCase: 'Assessing workforce competency standards or product usability scores.',
      mockup: (
        <div className="w-full h-40 flex items-center justify-center pt-4">
          <svg className="w-32 h-32 text-indigo-400" viewBox="0 0 100 100" fill="none">
            <polygon points="50,10 90,40 75,85 25,85 10,40" stroke="currentColor" strokeWidth="1" opacity="0.2" />
            <polygon points="50,25 78,48 68,75 32,75 22,48" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            <polygon points="50,15 80,45 60,65 40,80 30,50" fill="currentColor" stroke="currentColor" strokeWidth="1.5" fillOpacity="0.1" />
          </svg>
        </div>
      )
    },
    pie: {
      title: 'Pie Charts',
      strengths: 'Excellent for showing relative proportions, market allocations, and absolute percentages.',
      useCase: 'Displaying expense distribution shares or customer geographic locations.',
      mockup: (
        <div className="w-full h-40 flex items-center justify-center pt-2">
          <svg className="w-32 h-32 text-cyan-400" viewBox="0 0 36 36">
            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="60, 40" />
            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#22D3EE" strokeWidth="3" strokeDasharray="25, 75" strokeDashoffset="-60" />
            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#6366F1" strokeWidth="3" strokeDasharray="15, 85" strokeDashoffset="-85" />
          </svg>
        </div>
      )
    }
  };

  return (
    <div className="bg-transparent min-h-screen text-slate-200 relative overflow-hidden font-body pt-20">
      
      {/* HERO SECTION */}
      <section className="bg-transparent px-6 py-20 lg:py-28 relative overflow-hidden">
        <div className="glow-accent top-[-10%] left-[-20%] w-[50%] h-[50%] bg-cyan-500/10 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <ScrollReveal variant="fade-up" delay={0.1}>
            <span className="text-[10px] font-heading font-extrabold tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full uppercase">
              PRODUCT DETAILS
            </span>
          </ScrollReveal>
          
          <ScrollReveal variant="fade-up" delay={0.2}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 leading-tight">
              The complete Excel analysis platform
            </h1>
          </ScrollReveal>
          
          <ScrollReveal variant="fade-up" delay={0.3}>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
              One tool for uploads, visualizations, AI insights, and reports. Eliminate complicated dashboards forever.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 1: WORKBOOK PARSING ENGINE */}
      <section className="px-6 py-24 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center overflow-hidden">
          <ScrollReveal variant="fade-right" className="space-y-6 w-full">
            <span className="text-[10px] font-heading font-extrabold tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full uppercase">
              Smart Ingestion
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white">
              Smart Workbook Parsing
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-medium">
              ExcelViz incorporates high-efficiency, multi-threaded workbook processing. Our serverless pipeline leverages advanced SheetJS methods to extract rows, values, headers, and schemas directly in-browser. No complex setups or mappings required.
            </p>
            <ul className="space-y-3 font-body text-slate-300 text-sm font-semibold">
              <li className="flex items-center gap-2.5">
                <span className="w-5 h-5 bg-cyan-950/40 text-cyan-400 rounded-full flex items-center justify-center text-xs">✓</span>
                Multer-based upload streaming limits timeouts
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-5 h-5 bg-cyan-950/40 text-cyan-400 rounded-full flex items-center justify-center text-xs">✓</span>
                Encrypted in-memory data tables parsing
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-5 h-5 bg-cyan-950/40 text-cyan-400 rounded-full flex items-center justify-center text-xs">✓</span>
                Automatic multi-sheet tracking & selectors
              </li>
            </ul>
          </ScrollReveal>
          
          <ScrollReveal variant="fade-left" className="w-full">
            <ParsingVisualMockup />
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 2: 2D VISUALIZATIONS */}
      <section className="px-6 py-24 bg-transparent border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal variant="fade-up">
            <SectionHeader 
              eyebrow="2D TELEMETRY"
              heading="5 Chart Types, Zero Configuration"
              subtext="Select category matrices, pick an analytical layout, and render instant charts."
            />
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.1}>
            <div className="bg-[#1E293B]/40 border border-white/5 rounded-[24px] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-3">
              {/* Tabs List */}
              <div className="bg-[#0B0F19]/40 border-r border-white/5 p-6 space-y-2">
                <h4 className="text-[10px] font-heading font-black text-slate-500 uppercase tracking-widest mb-4">Select Chart Layout</h4>
                {Object.keys(chartTypes).map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveChartTab(type)}
                    className={`w-full text-left px-4 py-3.5 rounded-xl font-heading text-sm font-bold tracking-wide transition-all ${
                      activeChartTab === type 
                        ? 'bg-gradient-to-r from-cyan-500/15 to-indigo-500/15 text-cyan-400 border-r-2 border-cyan-500 shadow-lg'
                        : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                    }`}
                  >
                    {chartTypes[type].title}
                  </button>
                ))}
              </div>
              {/* Active Content Preview */}
              <div className="lg:col-span-2 p-8 sm:p-12 flex flex-col justify-between min-h-[350px]">
                <div className="space-y-4">
                  <h3 className="text-2xl font-heading font-black text-white">
                    {chartTypes[activeChartTab].title}
                  </h3>
                  <p className="font-body text-slate-400 text-sm leading-relaxed max-w-xl font-medium">
                    {chartTypes[activeChartTab].strengths}
                  </p>
                  <div className="p-3 bg-white/5 border border-white/5 rounded-lg text-xs font-body font-semibold text-slate-400 flex items-center gap-1.5 max-w-xl">
                    <span className="font-bold text-cyan-400">Ideal Use Case:</span>
                    {chartTypes[activeChartTab].useCase}
                  </div>
                </div>
                
                {/* Graphical simulation container */}
                <div className="mt-8 border border-white/5 rounded-xl bg-[#0B0F19]/60 p-6 flex items-center justify-center shadow-inner">
                  {chartTypes[activeChartTab].mockup}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 3: 3D ENGINE */}
      <section className="px-6 py-24 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center overflow-hidden">
          
          <ScrollReveal variant="fade-right" className="w-full">
            <ThreeDVisualMockup />
          </ScrollReveal>

          {/* Tech Spec details */}
          <ScrollReveal variant="fade-left" className="space-y-6 w-full">
            <span className="text-[10px] font-heading font-extrabold tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full uppercase">
              3D VISUALS
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white">
              Three.js 3D Explorer
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-medium">
              Unleash absolute visual clarity. ExcelViz charts three-dimensional values using high-fidelity orthographic cameras, customizable lighting grids, and glowing data point spheres. Spot patterns completely hidden in standard, flat tables.
            </p>
            <ul className="space-y-3 font-body text-slate-355 text-sm font-semibold">
              <li className="flex items-center gap-2.5">
                <span className="w-5 h-5 bg-cyan-950/40 text-cyan-400 rounded-full flex items-center justify-center text-xs">✓</span>
                Orthographic & Perspective camera projections
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-5 h-5 bg-cyan-950/40 text-cyan-400 rounded-full flex items-center justify-center text-xs">✓</span>
                Rotating pillar graphs & glowing coordinates spheres
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-5 h-5 bg-cyan-950/40 text-cyan-400 rounded-full flex items-center justify-center text-xs">✓</span>
                GPU-accelerated in-browser performance rendering
              </li>
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 4: AI BEFORE/AFTER */}
      <section className="px-6 py-24 bg-transparent border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal variant="fade-up">
            <SectionHeader 
              eyebrow="INTELLIGENCE ENGINE"
              heading="GPT-4 Powered Analytics"
              subtext="Watch raw table rows transform into natural-language summaries automatically."
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch mt-12 overflow-hidden">
            {/* Before: Raw table */}
            <ScrollReveal variant="fade-right" className="w-full h-full flex">
              <div className="bg-[#1E293B]/40 border border-white/5 rounded-[24px] p-8 flex flex-col justify-between w-full h-full">
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-white/5">
                    <h4 className="font-heading font-bold text-sm text-white">Before: Raw Spreadsheet Rows</h4>
                    <span className="text-[10px] text-slate-500 font-bold font-heading uppercase">CSV / XLSX Grid</span>
                  </div>
                  <p className="font-body text-slate-400 text-xs leading-relaxed font-medium">Complicated formulas, flat lists, and hours spent looking at rows.</p>
                </div>
                <div className="mt-6 border border-white/5 rounded-xl overflow-hidden font-mono text-[10px] text-slate-400 bg-[#0B0F19]/60">
                  <div className="grid grid-cols-4 bg-white/5 p-2.5 font-bold border-b border-white/5">
                    <span>Row ID</span>
                    <span>Month</span>
                    <span>Expenses</span>
                    <span>Conversions</span>
                  </div>
                  <div className="grid grid-cols-4 p-2.5 border-b border-white/5">
                    <span>1024</span>
                    <span>October</span>
                    <span>$12,400</span>
                    <span>1.2%</span>
                  </div>
                  <div className="grid grid-cols-4 p-2.5 border-b border-white/5">
                    <span>1025</span>
                    <span>November</span>
                    <span>$28,500</span>
                    <span>4.8%</span>
                  </div>
                  <div className="grid grid-cols-4 p-2.5">
                    <span>1026</span>
                    <span>December</span>
                    <span>$14,200</span>
                    <span>0.4%</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal variant="fade-left" className="w-full">
              <AIVisualMockup />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 5: HISTORY & EXPORT */}
      <section className="px-6 py-24 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center overflow-hidden">
          {/* HistoryTable mockup */}
          <ScrollReveal variant="fade-right" className="w-full">
            <div className="bg-[#1E293B]/40 border border-white/5 rounded-[24px] p-6 shadow-2xl space-y-4">
              <h4 className="font-heading font-bold text-xs text-slate-400 uppercase tracking-widest pb-2 border-b border-white/5">User History Vault</h4>
              <div className="space-y-2.5">
                <div className="flex justify-between items-center p-3.5 bg-[#0B0F19]/40 border border-white/5 rounded-xl">
                  <div>
                    <p className="text-xs font-bold text-white">Conversion_Report.xlsx</p>
                    <p className="text-[9px] text-slate-500 mt-0.5 font-semibold">2 hours ago • Bar Chart config</p>
                  </div>
                  <span className="text-[10px] text-cyan-400 font-bold hover:underline cursor-pointer">Reload</span>
                </div>
                <div className="flex justify-between items-center p-3.5 bg-[#0B0F19]/40 border border-white/5 rounded-xl">
                  <div>
                    <p className="text-xs font-bold text-white">Budget_Outliers_Model.xlsx</p>
                    <p className="text-[9px] text-slate-500 mt-0.5 font-semibold">Yesterday • 3D Scatter config</p>
                  </div>
                  <span className="text-[10px] text-cyan-400 font-bold hover:underline cursor-pointer">Reload</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
          {/* Text Description */}
          <ScrollReveal variant="fade-left" className="space-y-6 w-full">
            <span className="text-[10px] font-heading font-extrabold tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full uppercase">
              Archiving
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white">
              Never Lose an Analysis
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-medium">
              ExcelViz maintains a secure, user-level analysis vault. Reload past visual setups, custom configurations, and OpenAI insight reports instantly. Export graphs as high-res PNG images or generate clean PDF documents for presentations in one click.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <CTABanner 
        heading="Start your features tour today"
        subtext="Try our 2D/3D visualizations and advanced AI engine completely free."
      />

    </div>
  );
};

export default ProductTour;
