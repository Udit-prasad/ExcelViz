import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Chart3D = ({ data, chartType = 'bar', title = '3D Data Visualization' }) => {
  const mountRef = useRef(null);
  const [renderer, setRenderer] = useState(null);
  const [insights, setInsights] = useState(null);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const { token, user } = useSelector(state => state.auth);

  useEffect(() => {
    const mountElement = mountRef.current;
    if (!mountElement || !data) return;

    // Scene setup
    const newScene = new THREE.Scene();
    newScene.background = new THREE.Color(0x0B0F19);

    // Camera setup
    const width = mountElement.clientWidth;
    const height = mountElement.clientHeight;
    const newCamera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    newCamera.position.set(10, 10, 10);
    newCamera.lookAt(0, 0, 0);

    // Renderer setup
    const newRenderer = new THREE.WebGLRenderer({ antialias: true });
    newRenderer.setSize(width, height);
    newRenderer.shadowMap.enabled = true;
    newRenderer.shadowMap.type = THREE.PCFSoftShadowMap;

    mountElement.appendChild(newRenderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
    newScene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    newScene.add(directionalLight);

    // Create 3D bars
    if (data.datasets && data.datasets[0] && data.datasets[0].data) {
      const barData = data.datasets[0].data;
      const colors = [
        0x06b6d4, 0x6366f1, 0x10b981, 0xf59e0b, 0x8b5cf6,
        0x3b82f6, 0xec4899, 0xf97316, 0x14b8a6, 0xef4444
      ];

      barData.forEach((value, index) => {
        const heightVal = Math.max(value * 0.1, 0.1);
        const geometry = new THREE.BoxGeometry(0.8, heightVal, 0.8);
        const material = new THREE.MeshLambertMaterial({ 
          color: colors[index % colors.length],
          transparent: true,
          opacity: 0.85
        });
        const bar = new THREE.Mesh(geometry, material);
        
        bar.position.x = (index - barData.length / 2) * 1.5;
        bar.position.y = heightVal / 2;
        bar.position.z = 0;
        
        bar.castShadow = true;
        bar.receiveShadow = true;
        
        newScene.add(bar);
      });
    }

    // Grid helper with subtle dark colors
    const gridHelper = new THREE.GridHelper(20, 20, 0x374151, 0x1f2937);
    newScene.add(gridHelper);

    // Animation
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      // Rotate camera around the scene
      const time = Date.now() * 0.0008;
      newCamera.position.x = Math.cos(time) * 15;
      newCamera.position.z = Math.sin(time) * 15;
      newCamera.lookAt(0, 0, 0);
      
      newRenderer.render(newScene, newCamera);
    };
    animate();

    setRenderer(newRenderer);

    // Handle resize
    const handleResize = () => {
      const w = mountElement.clientWidth;
      const h = mountElement.clientHeight;
      
      newCamera.aspect = w / h;
      newCamera.updateProjectionMatrix();
      newRenderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (newRenderer.domElement.parentNode === mountElement) {
        mountElement.removeChild(newRenderer.domElement);
      }
      newRenderer.dispose();
    };
  }, [data, chartType]);

  const handleDownloadPNG = () => {
    if (renderer && renderer.domElement) {
      const url = renderer.domElement.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title}.png`;
      link.click();
    }
  };

  const handleDownloadPDF = async () => {
    if (mountRef.current) {
      const canvas = await html2canvas(mountRef.current, { useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'landscape' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth - 20, pdfHeight - 20);
      pdf.save(`${title}.pdf`);
    }
  };

  const handleGetInsights = async () => {
    setLoadingInsights(true);
    setInsights(null);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/analysis/ai-insights`,
        { chartData: { ...data, type: chartType } },
        { headers: { 'x-auth-token': token } }
      );
      setInsights(response.data.insights);
    } catch (err) {
      setInsights('Failed to fetch insights.');
    } finally {
      setLoadingInsights(false);
    }
  };

  return (
    <div className="bg-[#111827] border border-white/5 p-6 rounded-[24px] shadow-lg relative overflow-hidden">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-black font-heading text-white mb-2">
            {title}
          </h3>
          <div className="flex space-x-2">
            <span className="px-2 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] uppercase font-bold rounded-full">
              3D {chartType.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleDownloadPNG}
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-heading font-black px-3.5 py-1.5 rounded-lg text-[10px] uppercase tracking-wider transition-colors"
          >
            Download PNG
          </button>
          <button
            onClick={handleDownloadPDF}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-heading font-black px-3.5 py-1.5 rounded-lg text-[10px] uppercase tracking-wider transition-colors"
          >
            Download PDF
          </button>
          <button
            onClick={handleGetInsights}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-heading font-black px-3.5 py-1.5 rounded-lg text-[10px] uppercase tracking-wider transition-all"
            disabled={loadingInsights}
          >
            {loadingInsights ? 'Generating...' : 'AI Insights'}
          </button>
        </div>
      </div>
      <div className="w-full h-96 rounded-xl overflow-hidden relative" style={{ minHeight: '400px' }}>
        <div 
          ref={mountRef} 
          className="w-full h-full"
        />
        {!user?.isPremium && (
          <div className="absolute bottom-6 right-6 bg-slate-950/80 border border-white/10 backdrop-blur px-3 py-1.5 rounded-lg text-[10px] font-heading font-black uppercase tracking-widest text-cyan-400 select-none pointer-events-none z-10 shadow-lg">
            ExcelViz
          </div>
        )}
      </div>
      {insights && (
        <div className="mt-6 p-4 bg-indigo-500/10 border-l-4 border-indigo-500 text-slate-300 rounded-xl border-y border-r border-white/5 font-sans font-medium text-xs leading-relaxed">
          <strong className="text-white block mb-1">AI Insights:</strong> {insights}
        </div>
      )}
    </div>
  );
};

export default Chart3D;
