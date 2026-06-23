import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { uploadFile } from '../features/analysis/analysisSlice';

const FileUpload = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.analysis);
  const fileInput = useRef();
  const [dragActive, setDragActive] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleFileChange = (file) => {
    setLocalError('');
    if (!file) return;

    const isValidType = file.type === 'application/vnd.ms-excel' || 
                        file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const isValidExtension = file.name.endsWith('.xls') || file.name.endsWith('.xlsx');

    if (isValidType || isValidExtension) {
      dispatch(uploadFile(file));
    } else {
      setLocalError('Invalid file format. Please upload a valid Excel workbook (.xls or .xlsx).');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const displayError = localError || error;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        whileHover={{ scale: 1.01 }}
        animate={{
          borderColor: dragActive ? 'rgba(34, 211, 238, 0.6)' : 'rgba(255, 255, 255, 0.08)',
          backgroundColor: dragActive ? 'rgba(6, 182, 212, 0.08)' : 'rgba(15, 23, 42, 0.3)',
          boxShadow: dragActive ? '0 0 30px rgba(6, 182, 212, 0.15)' : 'none'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={`border-2 border-dashed rounded-[20px] p-10 text-center cursor-pointer relative overflow-hidden group backdrop-blur-md`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInput.current.click()}
      >
        {/* Futuristic glowing particle backdrop overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute -right-16 -top-16 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
        
        <div className="space-y-6 relative z-10 flex flex-col items-center">
          {/* Animated upload icon container */}
          <motion.div 
            animate={{ 
              y: dragActive ? -8 : 0,
              scale: dragActive ? 1.1 : 1
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-20 h-20 bg-slate-900/60 border border-white/5 group-hover:border-cyan-500/30 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-950/20 group-hover:scale-105 group-hover:text-cyan-400 text-slate-400 transition-all duration-300"
          >
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </motion.div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-heading font-black text-white group-hover:text-cyan-400 transition-colors duration-300">
              Upload Excel File
            </h3>
            <p className="text-sm font-sans font-medium text-slate-400 max-w-sm mx-auto leading-relaxed">
              Drag and drop your spreadsheet here, or <span className="text-cyan-400 group-hover:underline">browse files</span> on your computer
            </p>
            <p className="text-xs font-heading font-bold text-slate-500 uppercase tracking-widest pt-1">
              Supports .xls and .xlsx workbooks
            </p>
          </div>
          
          <input
            ref={fileInput}
            type="file"
            accept=".xls,.xlsx"
            onChange={(e) => handleFileChange(e.target.files[0])}
            className="hidden"
          />
          
          <motion.button
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            onClick={(e) => {
              e.stopPropagation(); // Avoid double triggering input click
              fileInput.current.click();
            }}
            className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 disabled:from-slate-800 disabled:to-slate-800 text-white font-heading font-black rounded-xl shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 border border-cyan-400/20 text-xs uppercase tracking-widest px-8 py-3.5 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Uploading...
              </>
            ) : (
              'Choose File'
            )}
          </motion.button>
        </div>
      </motion.div>
      
      <AnimatePresence>
        {displayError && (
          <motion.div 
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="mt-5 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.1)] rounded-xl flex items-center gap-3 relative z-10"
          >
            <span className="p-1.5 bg-rose-500/15 border border-rose-500/30 rounded-lg text-rose-400 flex-shrink-0 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </span>
            <p className="text-xs font-sans font-bold tracking-wide leading-relaxed">{displayError}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileUpload; 