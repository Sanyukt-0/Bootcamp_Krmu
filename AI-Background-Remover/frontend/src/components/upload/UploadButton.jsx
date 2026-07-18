/**
 * components/upload/UploadButton.jsx
 * Trigger button to initiate background removal processing.
 */

import React from 'react';

const UploadButton = ({ onClick, disabled, loading }) => {
  return (
    <button 
      className="btn-primary" 
      onClick={onClick} 
      disabled={disabled || loading}
      style={{ width: '100%', justifyContent: 'center' }}
    >
      {loading ? 'Processing Background...' : 'Remove Background'}
    </button>
  );
};

export default UploadButton;
