import React from 'react';
import { CTABanner } from '../components/MarketingUIComponents';
import { ScrollReveal } from '../components/ScrollReveal';

const Solutions = () => {
  return (
    <div className="bg-transparent min-h-screen text-slate-200 relative overflow-hidden font-body pt-20">
      
      {/* HERO SECTION */}
      <section className="bg-transparent px-6 py-20 lg:py-28 relative overflow-hidden">
        <div className="glow-accent top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <ScrollReveal variant="fade-up" delay={0.1}>
            <span className="text-[10px] font-heading font-extrabold tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full uppercase">
              TARGET SEGMENTS
            </span>
          </ScrollReveal>
          
          <ScrollReveal variant="fade-up" delay={0.2}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 leading-tight">
              Built for every team that lives in spreadsheets
            </h1>
          </ScrollReveal>
          
          <ScrollReveal variant="fade-up" delay={0.3}>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
              Finance, operations, sales, HR — if you work with Excel, ExcelViz works for you. Turn raw rows into boardroom-ready intelligence.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* SOLUTIONS SEGMENTS */}
      <section className="px-6 py-24 space-y-32 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto space-y-32">
          
          {/* Segment 1: Finance & Accounting */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center overflow-hidden">
            {/* Visual */}
            <ScrollReveal variant="fade-right" className="w-full">
              <div className="bg-[#1E293B]/40 border border-white/10 rounded-[24px] p-6 sm:p-8 shadow-2xl min-h-[300px] flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/20 transition-all duration-300">
                <div className="absolute top-0 right-0 -mr-6 -mt-6 w-20 h-20 bg-cyan-500/5 rounded-full blur-xl" />
                <span className="text-[10px] text-slate-400 font-heading font-black uppercase tracking-widest">Quarterly Revenue Breakdown</span>
                
                {/* Premium Bar Chart Diagram */}
                <div className="h-44 flex items-end justify-between gap-4 pt-8 relative">
                  {/* Gridlines */}
                  <div className="absolute inset-x-0 top-12 h-px bg-white/5" />
                  <div className="absolute inset-x-0 top-24 h-px bg-white/5" />
                  <div className="absolute inset-x-0 top-36 h-px bg-white/5" />
                  
                  <div className="w-full bg-gradient-to-t from-cyan-600 to-cyan-500 rounded-t-lg h-[45%] relative group-hover:opacity-90 transition-opacity" />
                  <div className="w-full bg-gradient-to-t from-indigo-600 to-indigo-500 rounded-t-lg h-[60%] relative" />
                  <div className="w-full bg-gradient-to-t from-purple-600 to-purple-500 rounded-t-lg h-[75%] relative" />
                  <div className="w-full bg-gradient-to-t from-cyan-400 to-teal-400 rounded-t-lg h-[95%] relative" />
                </div>
                
                <div className="text-slate-500 text-[10px] pt-4 border-t border-white/5 flex justify-between items-center font-heading font-black uppercase tracking-wider">
                  <span>Model: Budget vs Expense</span>
                  <span className="text-cyan-400 font-extrabold">Interval: Q1 - Q4</span>
                </div>
              </div>
            </ScrollReveal>
            
            {/* Content */}
            <ScrollReveal variant="fade-left" className="space-y-6 w-full">
              <span className="text-xs font-heading font-black text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full uppercase">Finance & Accounting</span>
              <h2 className="text-3xl font-heading font-black text-white leading-tight">From Excel reports to boardroom-ready charts</h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-body font-medium font-medium">
                Upload your P&L statements, budget trackers, and cash flow sheets. ExcelViz maps financial dimensions instantly, generates custom comparative graphics, and provides structured trend summaries for executive reviews.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-body text-slate-350 font-bold">
                <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Monthly trend analysis</li>
                <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Anomaly detection in expenses</li>
                <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Cash flow comparative models</li>
                <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Direct PDF export</li>
              </ul>
            </ScrollReveal>
          </div>

          {/* Segment 2: Sales & Revenue Operations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center overflow-hidden">
            {/* Content */}
            <ScrollReveal variant="fade-right" className="space-y-6 w-full order-2 lg:order-1">
              <span className="text-xs font-heading font-black text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full uppercase">Sales & RevOps</span>
              <h2 className="text-3xl font-heading font-black text-white leading-tight">Visualize your pipeline. Spot deals at risk.</h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-body font-medium">
                Streamline pipeline metrics reporting. Drag and drop CRM exports, team performance tracking sheets, and forecast models to identify bottlenecks, evaluate seasonal growth shifts, and flag stagnant deals automatically.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-body text-slate-350 font-bold">
                <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> 2D/3D sales pipeline maps</li>
                <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Quota achievement analysis</li>
                <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> High-risk account flags</li>
                <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Weekly snapshots logs</li>
              </ul>
            </ScrollReveal>
            
            {/* Visual */}
            <ScrollReveal variant="fade-left" className="w-full order-1 lg:order-2">
              <div className="bg-[#1E293B]/40 border border-white/10 rounded-[24px] p-6 sm:p-8 shadow-2xl min-h-[300px] flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/20 transition-all duration-300">
                <div className="absolute top-0 right-0 -mr-6 -mt-6 w-20 h-20 bg-indigo-500/5 rounded-full blur-xl" />
                <span className="text-[10px] text-slate-400 font-heading font-black uppercase tracking-widest">Acquisition Channels Pipeline</span>
                
                {/* Premium Spline Diagram */}
                <div className="h-44 flex items-center justify-center pt-6 relative">
                  <svg className="w-full h-32 text-indigo-400" viewBox="0 0 100 30" fill="none">
                    <path d="M5 25 Q 25 5, 45 15 T 85 5 T 95 8" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />
                    <path d="M5 25 Q 25 5, 45 15 T 85 5 T 95 8 L 95 30 L 5 30 Z" fill="url(#indigo-grad)" opacity="0.1" />
                    <circle cx="45" cy="15" r="2.5" fill="#22D3EE" className="animate-pulse" />
                    <circle cx="85" cy="5" r="2.5" fill="#22D3EE" />
                    <defs>
                      <linearGradient id="indigo-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366F1" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                
                <div className="text-slate-500 text-[10px] pt-4 border-t border-white/5 flex justify-between items-center font-heading font-black uppercase tracking-wider">
                  <span>Model: Conversion Trend</span>
                  <span className="text-indigo-400 font-extrabold">Type: Spline Chart</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Segment 3: HR & People Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center overflow-hidden">
            {/* Visual */}
            <ScrollReveal variant="fade-right" className="w-full">
              <div className="bg-[#1E293B]/40 border border-white/10 rounded-[24px] p-6 sm:p-8 shadow-2xl min-h-[300px] flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/20 transition-all duration-300">
                <div className="absolute top-0 right-0 -mr-6 -mt-6 w-20 h-20 bg-cyan-500/5 rounded-full blur-xl" />
                <span className="text-[10px] text-slate-400 font-heading font-black uppercase tracking-widest">Competency Framework Map</span>
                
                {/* Premium Radar Chart Diagram */}
                <div className="h-44 flex items-center justify-center pt-2">
                  <svg className="w-32 h-32 text-cyan-400" viewBox="0 0 100 100" fill="none">
                    <polygon points="50,10 90,40 75,85 25,85 10,40" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                    <polygon points="50,25 78,48 68,75 32,75 22,48" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <polygon points="50,35 68,52 60,68 40,68 32,52" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    
                    <line x1="50" y1="50" x2="50" y2="10" stroke="rgba(255,255,255,0.08)" />
                    <line x1="50" y1="50" x2="90" y2="40" stroke="rgba(255,255,255,0.08)" />
                    <line x1="50" y1="50" x2="75" y2="85" stroke="rgba(255,255,255,0.08)" />
                    <line x1="50" y1="50" x2="25" y2="85" stroke="rgba(255,255,255,0.08)" />
                    <line x1="50" y1="50" x2="10" y2="40" stroke="rgba(255,255,255,0.08)" />

                    <polygon points="50,20 82,42 65,72 38,80 20,44" fill="rgba(6, 182, 212, 0.15)" stroke="#06B6D4" strokeWidth="2" />
                  </svg>
                </div>
                
                <div className="text-slate-500 text-[10px] pt-4 border-t border-white/5 flex justify-between items-center font-heading font-black uppercase tracking-wider">
                  <span>Model: Radar Skill Index</span>
                  <span className="text-cyan-400 font-extrabold">Dimensions: 5 Matrices</span>
                </div>
              </div>
            </ScrollReveal>
            
            {/* Content */}
            <ScrollReveal variant="fade-left" className="space-y-6 w-full">
              <span className="text-xs font-heading font-black text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full uppercase">People Analytics</span>
              <h2 className="text-3xl font-heading font-black text-white leading-tight">Turn headcount data into workforce intelligence</h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-body font-medium">
                Make talent decisions backed by visual telemetry. Upload hiring pipeline outputs, workforce engagement metrics, performance evaluation sheets, and compensation grids to chart skills distributions and trace attrition anomalies.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-body text-slate-350 font-bold">
                <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Multi-axis radar competency models</li>
                <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Attrition risk anomaly flags</li>
                <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Hiring funnel conversion trackers</li>
                <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Exportable recruitment reports</li>
              </ul>
            </ScrollReveal>
          </div>

          {/* Segment 4: Operations & Supply Chain */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center overflow-hidden">
            {/* Content */}
            <ScrollReveal variant="fade-right" className="space-y-6 w-full order-2 lg:order-1">
              <span className="text-xs font-heading font-black text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full uppercase">Operations & Logistics</span>
              <h2 className="text-3xl font-heading font-black text-white leading-tight">See patterns in complexity</h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-body font-medium">
                Track multidimensional operations metrics. Drag and drop warehouse allocations logs, inventory balance datasets, delivery duration lists, and operational efficiency workbooks. Use 3D charts to pinpoint outlier anomalies in supply pipelines instantly.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-body text-slate-350 font-bold">
                <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> 3D scatter graphs for complex systems</li>
                <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> AI outlier & bottleneck flags</li>
                <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Multi-workbook tracking logs</li>
                <li className="flex items-center gap-2"><span className="text-cyan-400">✓</span> Real-time filter parameters</li>
              </ul>
            </ScrollReveal>
            
            {/* Visual */}
            <ScrollReveal variant="fade-left" className="w-full order-1 lg:order-2">
              <div className="bg-[#1E293B]/40 border border-white/10 rounded-[24px] p-6 sm:p-8 shadow-2xl min-h-[300px] flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/20 transition-all duration-300">
                <div className="absolute top-0 right-0 -mr-6 -mt-6 w-20 h-20 bg-indigo-500/5 rounded-full blur-xl" />
                <span className="text-[10px] text-slate-400 font-heading font-black uppercase tracking-widest">Inventory vs Demand Variance</span>
                
                {/* Premium Scatter Diagram */}
                <div className="h-44 relative mt-6 flex items-center justify-center">
                  <div className="absolute top-[25%] left-[25%] w-3.5 h-3.5 bg-cyan-400/25 border border-cyan-400 rounded-full" />
                  <div className="absolute top-[40%] left-[60%] w-3 h-3 bg-cyan-400/30 border border-cyan-400 rounded-full" />
                  <div className="absolute top-[10%] left-[80%] w-6 h-6 bg-rose-500/20 border border-rose-500 rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-2.5 h-2.5 bg-rose-500 rounded-full" />
                  </div>
                  <div className="absolute bottom-[20%] left-[45%] w-3.5 h-3.5 bg-indigo-500/30 border border-indigo-550 rounded-full" />
                  <div className="absolute bottom-[35%] left-[20%] w-3 h-3 bg-cyan-400/25 border border-cyan-455 rounded-full" />
                </div>
                
                <div className="text-slate-500 text-[10px] pt-4 border-t border-white/5 flex justify-between items-center font-heading font-black uppercase tracking-wider">
                  <span>Model: Outliers Scatter Map</span>
                  <span className="text-rose-455 font-extrabold">Variance: 3.2 Std Dev</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* BOTTOM CTA */}
      <CTABanner 
        heading="Which team are you?"
        subtext="Start uploading spreadsheets, creating 3D charts, and generating AI summaries free today."
      />

    </div>
  );
};

export default Solutions;
