/**
 * components/download/DownloadButtons.jsx
 * Trigger buttons initiating high-quality transparent image downloads.
 */

import React from 'react';

const DownloadButtons = ({ onDownload, onReset, isDownloading }) => {
  return (
    <div style={styles.btnRow}>
      <button 
        className="btn-primary" 
        onClick={onDownload}
        disabled={isDownloading}
        style={{ flex: 1, justifyContent: 'center' }}
      >
        {isDownloading ? 'Downloading...' : '📥 Download Image'}
      </button>
      <button 
        className="btn-secondary" 
        onClick={onReset}
        style={{ flex: 1, justifyContent: 'center' }}
      >
        🔄 Upload Another
      </button>
    </div>
  );
};

const styles = {
  btnRow: {
    display: 'flex',
    gap: '1rem',
    width: '100%',
  }
};

export default DownloadButtons;
