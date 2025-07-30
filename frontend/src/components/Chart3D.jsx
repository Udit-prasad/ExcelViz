import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Chart3D = ({ data, chartType = 'bar', title = '3D Data Visualization' }) => {
  const mountRef = useRef(null);
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [insights, setInsights] = useState(null);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    if (!mountRef.current || !data) return;

    // Scene setup
    const newScene = new THREE.Scene();
    newScene.background = new THREE.Color(0xf8fafc);

    // Camera setup
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    const newCamera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    newCamera.position.set(10, 10, 10);
    newCamera.lookAt(0, 0, 0);

    // Renderer setup
    const newRenderer = new THREE.WebGLRenderer({ antialias: true });
    newRenderer.setSize(width, height);
    newRenderer.shadowMap.enabled = true;
    newRenderer.shadowMap.type = THREE.PCFSoftShadowMap;

    mountRef.current.appendChild(newRenderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    newScene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    newScene.add(directionalLight);

    // Create 3D bars
    if (data.datasets && data.datasets[0] && data.datasets[0].data) {
      const barData = data.datasets[0].data;
      const labels = data.labels || [];
      const colors = [
        0x3b82f6, 0xef4444, 0x10b981, 0xf59e0b, 0x8b5cf6,
        0x06b6d4, 0x84cc16, 0xf97316, 0xec4899, 0x6366f1
      ];

      barData.forEach((value, index) => {
        const geometry = new THREE.BoxGeometry(0.8, Math.max(value * 0.1, 0.1), 0.8);
        const material = new THREE.MeshLambertMaterial({ 
          color: colors[index % colors.length],
          transparent: true,
          opacity: 0.8
        });
        const bar = new THREE.Mesh(geometry, material);
        
        bar.position.x = (index - barData.length / 2) * 1.5;
        bar.position.y = Math.max(value * 0.1, 0.1) / 2;
        bar.position.z = 0;
        
        bar.castShadow = true;
        bar.receiveShadow = true;
        
        newScene.add(bar);
      });
    }

    // Grid helper
    const gridHelper = new THREE.GridHelper(20, 20, 0xcccccc, 0xcccccc);
    newScene.add(gridHelper);

    // Animation
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      // Rotate camera around the scene
      const time = Date.now() * 0.001;
      newCamera.position.x = Math.cos(time * 0.5) * 15;
      newCamera.position.z = Math.sin(time * 0.5) * 15;
      newCamera.lookAt(0, 0, 0);
      
      newRenderer.render(newScene, newCamera);
    };
    animate();

    setScene(newScene);
    setCamera(newCamera);
    setRenderer(newRenderer);

    // Handle resize
    const handleResize = () => {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      newCamera.aspect = width / height;
      newCamera.updateProjectionMatrix();
      newRenderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (mountRef.current && newRenderer.domElement) {
        mountRef.current.removeChild(newRenderer.domElement);
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
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {title}
          </h3>
          <div className="flex space-x-2">
            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
              3D {chartType.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleDownloadPNG}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
          >
            Download PNG
          </button>
          <button
            onClick={handleDownloadPDF}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
          >
            Download PDF
          </button>
          <button
            onClick={handleGetInsights}
            className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-xs"
            disabled={loadingInsights}
          >
            {loadingInsights ? 'Generating Insights...' : 'AI Insights'}
          </button>
        </div>
      </div>
      <div 
        ref={mountRef} 
        className="w-full h-96 rounded-lg overflow-hidden"
        style={{ minHeight: '400px' }}
      />
      {insights && (
        <div className="mt-4 p-4 bg-purple-50 border-l-4 border-purple-400 text-purple-800 rounded">
          <strong>AI Insights:</strong> {insights}
        </div>
      )}
    </div>
  );
};

export default Chart3D; 