import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  const blogPosts = [
    {
      slug: '5-ways-to-visualize-complex-financial-data',
      title: '5 Ways to Visualize Complex Financial Data',
      excerpt: 'Struggling to make sense of P&L spreadsheets? Learn how to restructure spreadsheet rows into readable comparative charts.',
      tag: 'Tutorial',
      date: 'May 18, 2026',
      author: 'Aravind K.',
      initial: 'AK',
      featured: true,
      gradient: 'from-blue-600 to-cyan-500'
    },
    {
      slug: 'intro-to-3d-webgl-data-charts',
      title: 'Introduction to 3D WebGL Data Projections',
      excerpt: 'What makes 3D visual telemetry so powerful? Explore spatial grids models and multidimensional scatter plots using Three.js.',
      tag: 'Data Tips',
      date: 'May 10, 2026',
      author: 'Sarah L.',
      initial: 'SL',
      featured: false,
      gradient: 'from-indigo-600 to-blue-500'
    },
    {
      slug: 'unleashing-gpt-4-excel-insights',
      title: 'Unleashing GPT-4 Analytical Insight Models',
      excerpt: 'Uncover hidden exceptions automatically. We trace how ExcelViz channels statistical metrics into OpenAI engines securely.',
      tag: 'AI Analysis',
      date: 'May 04, 2026',
      author: 'Emma T.',
      initial: 'ET',
      featured: false,
      gradient: 'from-purple-600 to-indigo-500'
    },
    {
      slug: 'announcing-excelviz-v2-logs-export',
      title: 'Announcing ExcelViz v2: History Logs & PDF Export',
      excerpt: 'Check our latest product updates! Learn how our new encrypted history vault and formatting PDF exports operate.',
      tag: 'Product Update',
      date: 'Apr 26, 2026',
      author: 'Nikhil R.',
      initial: 'NR',
      featured: false,
      gradient: 'from-cyan-500 to-teal-400'
    }
  ];

  const tagsList = ['All', 'Tutorial', 'Product Update', 'Data Tips', 'AI Analysis'];

  // Filtering criteria
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'All' || post.tag === selectedTag;
    return matchesSearch && matchesTag;
  });

  const featuredPost = blogPosts.find(p => p.featured);
  const regularPosts = filteredPosts.filter(p => !p.featured || selectedTag !== 'All');

  return (
    <div className="bg-[#0B0F19] min-h-screen text-slate-200 relative overflow-hidden font-body pt-20">
      
      {/* HERO SECTION */}
      <section className="bg-[#111827]/40 border-b border-white/5 px-6 py-20 lg:py-24 relative overflow-hidden">
        {/* Glow backlight */}
        <div className="glow-accent top-[-10%] left-[20%] w-[60%] h-[40%] bg-cyan-500/10 pointer-events-none" />
        <div className="glow-accent bottom-[-10%] right-[10%] w-[50%] h-[45%] bg-indigo-500/10 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <span className="text-[10px] font-heading font-extrabold tracking-widest text-cyan-400 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full uppercase">
            INSIGHTS HUB
          </span>
          <h1 className="text-4xl sm:text-5xl font-heading font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 leading-tight">
            Insights & Tutorials
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Excel tips, data visualization guides, and product updates from the ExcelViz team.
          </p>

          {/* Search Bar Input */}
          <div className="max-w-md mx-auto pt-4">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles, guides, tips..."
                className="w-full px-5 py-3.5 bg-slate-950/60 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/25 focus:border-cyan-500 shadow-inner text-sm font-semibold"
              />
              <svg className="absolute right-4 top-4 w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER TAG PILLS */}
      <section className="px-6 py-10 bg-[#0B0F19] border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-3">
          {tagsList.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full font-heading text-xs font-black tracking-widest transition-all border ${
                selectedTag === tag
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 border-transparent text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-[#1E293B]/45 text-slate-400 border-white/5 hover:border-cyan-500/30 hover:text-white'
              }`}
            >
              {tag.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      {/* BLOG CONTENT */}
      <section className="px-6 py-20 bg-[#0B0F19] relative z-10">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Featured Post Card (only displayed if search/tag allows and there is one) */}
          {selectedTag === 'All' && searchTerm === '' && featuredPost && (
            <div className="grid grid-cols-1 lg:grid-cols-2 border border-white/5 rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_0_40px_rgba(6,182,212,0.03)] transition-all duration-300 group bg-[#1E293B]/45">
              {/* Cover visual */}
              <div className={`bg-gradient-to-tr ${featuredPost.gradient} min-h-[250px] lg:min-h-[400px] flex items-center justify-center p-8 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10" />
                <svg className="w-24 h-24 text-white opacity-40 group-hover:scale-105 transition-transform duration-500 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              {/* Content info */}
              <div className="p-8 sm:p-12 flex flex-col justify-between h-full bg-transparent">
                <div className="space-y-4">
                  <span className="inline-block text-[10px] bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-extrabold font-heading px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {featuredPost.tag}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-heading font-black text-white group-hover:text-cyan-400 transition-colors">
                    <Link to={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                  </h2>
                  <p className="font-body text-slate-400 text-sm leading-relaxed font-semibold">
                    {featuredPost.excerpt}
                  </p>
                </div>
                {/* Author footer */}
                <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 text-cyan-400 font-heading font-black text-xs flex items-center justify-center">
                      {featuredPost.initial}
                    </div>
                    <div>
                      <p className="font-heading font-extrabold text-xs text-white">{featuredPost.author}</p>
                      <p className="font-body text-[10px] text-slate-500 font-semibold">{featuredPost.date}</p>
                    </div>
                  </div>
                  <Link 
                    to={`/blog/${featuredPost.slug}`}
                    className="font-body text-xs font-black text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group/link"
                  >
                    Read Article 
                    <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Regular Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -6 }}
                  className="bg-[#1E293B]/45 border border-white/5 rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_0_30px_rgba(6,182,212,0.03)] transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Cover gradient placeholder */}
                    <div className={`bg-gradient-to-tr ${post.gradient} h-40 flex items-center justify-center p-6 relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/10" />
                      <svg className="w-12 h-12 text-white opacity-35" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                      </svg>
                    </div>
                    {/* Details block */}
                    <div className="p-6 space-y-3">
                      <span className="inline-block text-[9px] bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-extrabold font-heading px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {post.tag}
                      </span>
                      <h3 className="font-heading font-black text-white text-base group-hover:text-cyan-400 transition-colors leading-tight">
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="font-body text-slate-400 text-xs leading-relaxed line-clamp-2 font-semibold">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                  {/* Author footer */}
                  <div className="px-6 pb-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 text-cyan-400 font-heading font-black text-[10px] flex items-center justify-center">
                        {post.initial}
                      </div>
                      <div>
                        <p className="font-heading font-extrabold text-[10px] text-white">{post.author}</p>
                        <p className="font-body text-[8px] text-slate-500 font-semibold">{post.date}</p>
                      </div>
                    </div>
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="font-body text-xs font-black text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 group/link"
                    >
                      Read 
                      <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-white/10 bg-[#1E293B]/30 rounded-2xl max-w-lg mx-auto">
              <svg className="w-12 h-12 text-slate-600 mx-auto mb-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="font-heading font-black text-white text-lg">No Articles Found</h3>
              <p className="font-body text-slate-400 text-xs mt-1 font-semibold">Struggling with terms? Try a different search input or select a tag.</p>
            </div>
          )}

        </div>
      </section>

    </div>
  );
};

export default Blog;
