import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile } from '../features/analysis/analysisSlice';

const FileUpload = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.analysis);
  const fileInput = useRef();
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (file) => {
    if (file && (file.type === 'application/vnd.ms-excel' || 
                 file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                 file.name.endsWith('.xls') || 
                 file.name.endsWith('.xlsx'))) {
      dispatch(uploadFile(file));
    } else {
      alert('Please upload a valid Excel file (.xls or .xlsx)');
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

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="space-y-4">
          <div className="text-6xl">📊</div>
          <h3 className="text-lg font-medium text-gray-900">
            Upload Excel File
          </h3>
          <p className="text-gray-500">
            Drag and drop your Excel file here, or click to browse
          </p>
          <p className="text-sm text-gray-400">
            Supports .xls and .xlsx files
          </p>
          
          <input
            ref={fileInput}
            type="file"
            accept=".xls,.xlsx"
            onChange={(e) => handleFileChange(e.target.files[0])}
            className="hidden"
          />
          
          <button
            onClick={() => fileInput.current.click()}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            {loading ? 'Uploading...' : 'Choose File'}
          </button>
        </div>
      </div>
      
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload; 