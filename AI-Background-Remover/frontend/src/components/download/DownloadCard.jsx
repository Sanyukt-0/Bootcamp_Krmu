/**
 * components/download/DownloadCard.jsx
 * Wrap card component showing results metadata and downloads.
 */

import React from 'react';
import DownloadButtons from './DownloadButtons';
import FileInfo from '../upload/FileInfo';

const DownloadCard = ({ originalName, size, mimeType, onDownload, onReset, isDownloading }) => {
  return (
    <div className="glass-card download-card">
      <div>
        <span className="badge badge-processed">Ready for download</span>
        <h3 style={{ marginTop: '0.75rem', fontSize: '1.25rem' }}>Processing Complete</h3>
        <p style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Background removed using AI models. Transparent areas are shown in grid.
        </p>
      </div>

      <FileInfo name={originalName} size={size} type={mimeType || 'image/png'} />

      <DownloadButtons 
        onDownload={onDownload} 
        onReset={onReset} 
        isDownloading={isDownloading} 
      />
    </div>
  );
};

export default DownloadCard;
