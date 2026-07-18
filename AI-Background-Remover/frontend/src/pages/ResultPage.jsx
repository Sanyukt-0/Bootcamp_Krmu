/**
 * pages/ResultPage.jsx
 * Results workspace displaying split sliders, metadata cards, and download triggers.
 */

import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageContext } from '../context/ImageContext';
import { useDownload } from '../hooks/useDownload';
import ImageComparison from '../components/compare/ImageComparison';
import DownloadCard from '../components/download/DownloadCard';

const ResultPage = () => {
  const navigate = useNavigate();
  const { currentImage, resetImageState } = useContext(ImageContext);
  const { isDownloading, triggerDownload } = useDownload();

  useEffect(() => {
    // Redirect back to upload workspace if there's no processed image in the context
    if (!currentImage) {
      navigate('/upload');
    }
  }, [currentImage, navigate]);

  if (!currentImage) return null;

  const handleDownload = () => {
    // Resolve absolute path through proxy
    const processedUrl = currentImage.processedPath;
    const originalNameWithoutExt = currentImage.originalName.split('.').slice(0, -1).join('.');
    triggerDownload(processedUrl, `${originalNameWithoutExt}-no-bg.png`);
  };

  const handleReset = () => {
    resetImageState();
    navigate('/upload');
  };

  return (
    <div className="result-page">
      <div>
        <h1>Compare Results</h1>
        <p>Use the slider to compare the original image with the background-removed version.</p>
      </div>

      <div className="result-grid">
        <ImageComparison 
          originalUrl={currentImage.originalPath} 
          processedUrl={currentImage.processedPath} 
          originalName={currentImage.originalName} 
        />

        <DownloadCard 
          originalName={currentImage.originalName} 
          size={currentImage.size} 
          mimeType={currentImage.mimeType} 
          onDownload={handleDownload} 
          onReset={handleReset} 
          isDownloading={isDownloading} 
        />
      </div>
    </div>
  );
};

export default ResultPage;
