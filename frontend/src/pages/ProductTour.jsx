import React, { useState } from 'react';
import { SectionHeader, CTABanner } from '../components/MarketingUIComponents';
import { ScrollReveal } from '../components/ScrollReveal';

// 1. Workbook Ingestion/Parsing Diagram
const ParsingVisualMockup = () => (
  <div className="border border-white/5 rounded-[32px] overflow-hidden shadow-2xl bg-slate-950 group">
    <img 
      src="/assets/image2.png" 
      alt="Excel workbook secure ingestion pipeline" 
      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
    />
  </div>
);

// 2. Three.js 3D Coordinate Grid Space
const ThreeDVisualMockup = () => (
  <div className="border border-white/5 rounded-[32px] overflow-hidden shadow-2xl bg-slate-950 group">
    <img 
      src="/assets/image3.png" 
      alt="Three.js 3D Coordinate Grid Space" 
      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
    />
  </div>
);

// 3. AI Summarization Panel Mockup
const AIVisualMockup = () => (
  <div className="border border-white/5 rounded-[32px] overflow-hidden shadow-2xl bg-slate-950 group">
    <img 
      src="/assets/image1.png" 
      alt="AI Insights Dashboard" 
      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
    />
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
        <img 
          src="/assets/line charts.png" 
          alt="Line Graphs" 
          className="max-h-48 object-contain rounded-lg" 
        />
      )
    },
    bar: {
      title: 'Bar Charts',
      strengths: 'Outstanding for discrete category benchmarks, direct group sizes, and segment comparisons.',
      useCase: 'Analyzing employee headcount across departments or conversion rates per campaign.',
      mockup: (
        <img 
          src="/assets/bar charts.png" 
          alt="Bar Charts" 
          className="max-h-48 object-contain rounded-lg" 
        />
      )
    },
    scatter: {
      title: 'Scatter Plots',
      strengths: 'Perfect for spotting spatial correlations, clusters, density levels, and regression trends.',
      useCase: 'Plotting user acquisition costs against retention rates across cohorts.',
      mockup: (
        <img 
          src="/assets/scatter plots.png" 
          alt="Scatter Plots" 
          className="max-h-48 object-contain rounded-lg" 
        />
      )
    },
    radar: {
      title: 'Radar Graphs',
      strengths: 'Best for comparing multi-variable metrics, profile strengths, and dimensional balances.',
      useCase: 'Assessing workforce competency standards or product usability scores.',
      mockup: (
        <img 
          src="/assets/Radar graphs.png" 
          alt="Radar Graphs" 
          className="max-h-48 object-contain rounded-lg" 
        />
      )
    },
    pie: {
      title: 'Pie Charts',
      strengths: 'Excellent for showing relative proportions, market allocations, and absolute percentages.',
      useCase: 'Displaying expense distribution shares or customer geographic locations.',
      mockup: (
        <img 
          src="/assets/pie charts.png" 
          alt="Pie Charts" 
          className="max-h-48 object-contain rounded-lg" 
        />
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
                    <p className="text-[9px] text-slate-505 mt-0.5 font-semibold">2 hours ago • Bar Chart config</p>
                  </div>
                  <span className="text-[10px] text-cyan-400 font-bold hover:underline cursor-pointer">Reload</span>
                </div>
                <div className="flex justify-between items-center p-3.5 bg-[#0B0F19]/40 border border-white/5 rounded-xl">
                  <div>
                    <p className="text-xs font-bold text-white">Budget_Outliers_Model.xlsx</p>
                    <p className="text-[9px] text-slate-550 mt-0.5 font-semibold">Yesterday • 3D Scatter config</p>
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
