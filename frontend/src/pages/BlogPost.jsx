import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Local articles directory
  const articles = {
    '5-ways-to-visualize-complex-financial-data': {
      title: '5 Ways to Visualize Complex Financial Data',
      tag: 'Tutorial',
      date: 'May 18, 2026',
      author: 'Aravind K.',
      role: 'Co-Founder & CEO',
      initial: 'AK',
      gradient: 'from-blue-600 to-cyan-500',
      content: (
        <div className="space-y-6">
          <p className="font-body text-slate-300 text-lg leading-relaxed font-semibold">
            Financial reporting can easily get bogged down in rows and cells. When stakeholders are forced to scan through hundreds of ledger accounts and P&L balances, critical insights get lost in translation.
          </p>
          <p className="font-body text-slate-400 text-base leading-relaxed font-medium">
            Here are 5 key methods to map raw financial coordinates into highly readable visual charts:
          </p>
          
          <h3 className="text-xl font-heading font-black text-white pt-4">1. Group Categories Logically</h3>
          <p className="font-body text-slate-400 text-base leading-relaxed font-medium">
            Avoid plotting every single general ledger account. Instead, aggregate your rows into clean master groups (e.g., Operating Expenses, Marketing Cost, Payroll) before mapping variables onto your chart axes.
          </p>

          <h3 className="text-xl font-heading font-black text-white pt-4">2. Use Contrast to Highlight Outliers</h3>
          <p className="font-body text-slate-400 text-base leading-relaxed font-medium">
            If expenses spike in a specific month, highlight it. A distinct contrast color (like emerald for positive indicators, or amber for exceptions) guides the eye directly to critical anomalies.
          </p>

          <blockquote className="border-l-4 border-cyan-500 pl-6 py-2 my-6 font-body text-slate-400 italic text-base bg-[#1E293B]/40 rounded-r-lg font-medium">
            "Visualizing financial trends isn't just about making sheets pretty; it's about reducing the cognitive load required to make strategic choices."
          </blockquote>

          <h3 className="text-xl font-heading font-black text-white pt-4">3. Introduce 3D Grids for Multi-Variable Models</h3>
          <p className="font-body text-slate-400 text-base leading-relaxed font-medium">
            When tracking revenue vs. customer acquisition cost (CAC) against cohort retention rates, flat 2D charts fail. Plotting them on a spatial rotating 3D coordinates graph lets you analyze volume, density, and cost variations simultaneously.
          </p>

          <h3 className="text-xl font-heading font-black text-white pt-4">4. Restructure Time Vectors</h3>
          <p className="font-body text-slate-400 text-base leading-relaxed font-medium">
            Map timeline categories (months, quarters) strictly onto the horizontal X-axis. Avoid mixing categorical variables with linear time scales on the same coordinate.
          </p>

          <h3 className="text-xl font-heading font-black text-white pt-4">5. Automate Summaries with AI</h3>
          <p className="font-body text-slate-400 text-base leading-relaxed font-medium">
            Leverage OpenAI integration models to review sheet outputs. A quick natural language prompt can translate complex statistics into plain-English recommendations in seconds.
          </p>
        </div>
      )
    },
    'intro-to-3d-webgl-data-charts': {
      title: 'Introduction to 3D WebGL Data Projections',
      tag: 'Data Tips',
      date: 'May 10, 2026',
      author: 'Sarah L.',
      role: 'Chief Technical Architect',
      initial: 'SL',
      gradient: 'from-indigo-600 to-blue-500',
      content: (
        <div className="space-y-6">
          <p className="font-body text-slate-300 text-lg leading-relaxed font-semibold">
            Data datasets are expanding in dimensional complexity. In standard analytical models, visualizing three variables simultaneously on a flat monitor is a major design bottleneck.
          </p>
          <p className="font-body text-slate-400 text-base leading-relaxed font-medium">
            By leveraging Three.js and GPU-accelerated WebGL layers, we can map spreadsheet columns onto spatial coordinates (X, Y, Z). Let's review the core components of our 3D Explorer engine:
          </p>
          
          <h3 className="text-xl font-heading font-black text-white pt-4">Orthographic vs. Perspective Projections</h3>
          <p className="font-body text-slate-400 text-base leading-relaxed font-medium">
            Perspective views provide realistic depth, but warp coordinates measurement relative to distance. ExcelViz relies on customizable orthographic projection models to ensure grid lines and data dimensions preserve precise spatial length ratios from every viewing angle.
          </p>

          <pre className="p-5 bg-slate-950 border border-white/5 rounded-xl text-xs font-mono text-slate-300 overflow-x-auto my-6 shadow-inner">
{`// Simulated Three.js Camera setup in ExcelViz
const camera = new THREE.OrthographicCamera(
  width / -2, width / 2, 
  height / 2, height / -2, 
  0.1, 1000
);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);`}
          </pre>

          <h3 className="text-xl font-heading font-black text-white pt-4">Custom Legend Billboards</h3>
          <p className="font-body text-slate-400 text-base leading-relaxed font-medium">
            Reading labels in a rotating spatial grid is notoriously challenging. To eliminate legibility bottlenecks, our engine utilizes 3D sprite billboard cards that dynamically align their text face-forward to the camera as the grid rotates.
          </p>
        </div>
      )
    },
    'unleashing-gpt-4-excel-insights': {
      title: 'Unleashing GPT-4 Analytical Insight Models',
      tag: 'AI Analysis',
      date: 'May 04, 2026',
      author: 'Emma T.',
      role: 'Data Systems Specialist',
      initial: 'ET',
      gradient: 'from-purple-600 to-indigo-500',
      content: (
        <div className="space-y-6">
          <p className="font-body text-slate-300 text-lg leading-relaxed font-semibold">
            Artificial intelligence is redefining business intelligence workflows. But how do we securely channel row parameters into OpenAI models without compromising corporate privacy guidelines?
          </p>
          <p className="font-body text-slate-400 text-base leading-relaxed font-medium">
            ExcelViz maps this security boundary by processing workbook structures in volatile browser memory. Let's trace our operational data-flow:
          </p>
          
          <h3 className="text-xl font-heading font-black text-white pt-4">1. Extraction of Statistical Metadata</h3>
          <p className="font-body text-slate-400 text-base leading-relaxed font-medium">
            Our frontend doesn't upload raw personal row identifiers. Instead, it extracts key statistical summaries (e.g. mean, standard deviation, row counts, variances) to represent the dataset structure anonymously.
          </p>

          <h3 className="text-xl font-heading font-black text-white pt-4">2. Direct API Integration Sync</h3>
          <p className="font-body text-slate-400 text-base leading-relaxed font-medium">
            These structured summaries are transmitted securely to our OpenAI API logs backend. GPT-4 parses the metadata models, flags anomalies (spikes, declines), and outputs natural language recommendations.
          </p>
        </div>
      )
    },
    'announcing-excelviz-v2-logs-export': {
      title: 'Announcing ExcelViz v2: History Logs & PDF Export',
      tag: 'Product Update',
      date: 'Apr 26, 2026',
      author: 'Nikhil R.',
      role: 'Lead Frontend Designer',
      initial: 'NR',
      gradient: 'from-cyan-500 to-teal-400',
      content: (
        <div className="space-y-6">
          <p className="font-body text-slate-300 text-lg leading-relaxed font-semibold">
            We are excited to launch our latest ExcelViz product update! We've overhauled our history tables and export pipelines to improve user workflow speeds by 40%.
          </p>
          <p className="font-body text-slate-400 text-base leading-relaxed font-medium">
            Here is a deep-dive look at the new features operational today:
          </p>
          
          <h3 className="text-xl font-heading font-black text-white pt-4">1. Encrypted User History Table</h3>
          <p className="font-body text-slate-400 text-base leading-relaxed font-medium">
            Your uploaded worksheets configurations and AI summary logs are saved inside your encrypted private dashboard archive. Reload past visual coordinates and data summaries instantly without re-uploading spreadsheets.
          </p>

          <h3 className="text-xl font-heading font-black text-white pt-4">2. High-Res PDF Export Engine</h3>
          <p className="font-body text-slate-400 text-base leading-relaxed font-medium">
            Need to present analytical insights in board meetings? Click "Export PDF" to automatically capture charts into a beautifully formatted document layout including custom annotations and plain-English recommendations.
          </p>
        </div>
      )
    }
  };

  const article = articles[slug];

  if (!article) {
    return (
      <div className="bg-[#0B0F19] min-h-screen text-slate-200 flex items-center justify-center p-6 pt-28 text-center font-body">
        <div className="space-y-4">
          <h2 className="text-3xl font-heading font-black text-white">Article Not Found</h2>
          <p className="text-slate-450 max-w-sm font-semibold">The article URL slug you requested is not listed in our database.</p>
          <button onClick={() => navigate('/blog')} className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-heading font-extrabold rounded-xl text-xs uppercase transition-all shadow-lg shadow-cyan-500/25">
            Return to Blog
          </button>
        </div>
      </div>
    );
  }

  // Related posts list (excluding current)
  const relatedPosts = Object.keys(articles)
    .filter(key => key !== slug)
    .slice(0, 3)
    .map(key => ({ slug: key, ...articles[key] }));

  return (
    <div className="bg-[#0B0F19] min-h-screen text-slate-200 relative overflow-hidden font-body pt-20">
      
      {/* Article Cover Header */}
      <div className={`bg-gradient-to-tr ${article.gradient} py-20 md:py-28 relative overflow-hidden text-center text-white`}>
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 space-y-6 relative z-10">
          <Link 
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-black text-white/80 hover:text-white uppercase tracking-widest mb-2 font-heading bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all border border-white/5"
          >
            ← Back to Blog
          </Link>
          <h1 className="text-3xl sm:text-5xl font-heading font-black leading-tight tracking-tight max-w-3xl mx-auto">
            {article.title}
          </h1>
          
          {/* Tag and meta */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-black font-heading text-white/90 pt-2">
            <span className="px-2.5 py-0.5 bg-white/15 border border-white/25 rounded-full uppercase tracking-widest">{article.tag}</span>
            <span>•</span>
            <span>{article.date}</span>
          </div>
        </div>
      </div>

      {/* Article Reading Body Container */}
      <section className="px-6 py-20 bg-[#0B0F19] relative z-10">
        <div className="max-w-[720px] mx-auto">
          {/* Author Block */}
          <div className="flex items-center gap-4 pb-8 border-b border-white/5 mb-10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 text-cyan-400 font-heading font-black text-sm flex items-center justify-center shadow-md">
              {article.initial}
            </div>
            <div>
              <h4 className="font-heading font-extrabold text-sm text-white leading-none mb-1">{article.author}</h4>
              <p className="font-body text-slate-500 text-xs leading-none font-semibold">{article.role}</p>
            </div>
          </div>

          {/* Render Markdown Content block */}
          <article className="prose prose-invert max-w-none">
            {article.content}
          </article>

          {/* Social share blocks */}
          <div className="border-t border-white/5 pt-8 mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500 font-body font-semibold">
            <span>Share this article:</span>
            <div className="flex gap-3">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors font-bold">LinkedIn</a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors font-bold">Twitter/X</a>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED ARTICLES SECTION */}
      <section className="px-6 py-20 bg-[#111827] border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-heading font-black text-white mb-10 text-center sm:text-left flex items-center gap-2">
            <span className="w-1.5 h-5 bg-cyan-500 rounded-full inline-block"></span>
            Related Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((post, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="bg-[#1E293B]/45 border border-white/5 rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_0_30px_rgba(6,182,212,0.03)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div className={`bg-gradient-to-tr ${post.gradient} h-32 flex items-center justify-center p-4 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <svg className="w-8 h-8 text-white opacity-40 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="p-6 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="inline-block text-[8px] bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-extrabold font-heading px-2 py-0.5 rounded-full uppercase tracking-widest">{post.tag}</span>
                    <h4 className="font-heading font-extrabold text-white text-sm group-hover:text-cyan-400 transition-colors leading-tight line-clamp-2">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h4>
                  </div>
                  <Link to={`/blog/${post.slug}`} className="font-body text-[11px] font-black text-cyan-400 hover:text-cyan-300 flex items-center gap-1 mt-4 group/link">
                    Read Post <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default BlogPost;
