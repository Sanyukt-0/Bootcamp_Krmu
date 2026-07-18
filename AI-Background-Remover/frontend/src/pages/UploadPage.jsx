/**
 * pages/UploadPage.jsx
 * Upload workspace displaying dropzone triggers, preview boxes, and status spinners.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpload } from '../hooks/useUpload';
import UploadBox from '../components/upload/UploadBox';
import UploadButton from '../components/upload/UploadButton';
import ImagePreview from '../components/upload/ImagePreview';
import FileInfo from '../components/upload/FileInfo';
import ProcessingStatus from '../components/processing/ProcessingStatus';

const UploadPage = () => {
  const navigate = useNavigate();
  const {
    file,
    previewUrl,
    isDragging,
    isProcessing,
    progress,
    error,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    selectFile,
    clearFile,
    processImage
  } = useUpload();

  const handleStartProcessing = async () => {
    const result = await processImage();
    if (result) {
      navigate('/result');
    }
  };

  if (isProcessing) {
    return (
      <div className="upload-page">
        <ProcessingStatus 
          progress={progress} 
          statusMessage="Uploading to server and removing background using AI models..." 
        />
      </div>
    );
  }

  return (
    <div className="upload-page">
      <div>
        <h1>Background Remover</h1>
        <p>Upload a file to remove the background in a single click.</p>
      </div>

      <div className="glass-card" style={{ padding: '2rem' }}>
        {error && (
          <div style={styles.errorAlert}>
            ⚠️ {error}
          </div>
        )}

        {!file ? (
          <UploadBox 
            isDragging={isDragging} 
            onDragOver={handleDragOver} 
            onDragLeave={handleDragLeave} 
            onDrop={handleDrop} 
            onFileSelect={selectFile}
          >
            <span className="upload-icon">📤</span>
            <div>
              <h3>Drag and drop your image here</h3>
              <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
                Supports PNG, JPG, JPEG, and WebP (Max 5MB)
              </p>
            </div>
            <button className="btn-secondary" style={{ pointerEvents: 'none' }}>
              Choose File
            </button>
          </UploadBox>
        ) : (
          <div style={styles.previewSection}>
            <ImagePreview previewUrl={previewUrl} onClear={clearFile} />
            <FileInfo name={file.name} size={file.size} type={file.type} />
            <UploadButton onClick={handleStartProcessing} disabled={false} loading={false} />
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  errorAlert: {
    padding: '1rem',
    backgroundColor: 'rgba(255, 77, 77, 0.12)',
    border: '1px solid rgba(255, 77, 77, 0.3)',
    color: '#ff4d4d',
    borderRadius: '10px',
    marginBottom: '1.5rem',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  previewSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    alignItems: 'stretch',
  }
};

export default UploadPage;
