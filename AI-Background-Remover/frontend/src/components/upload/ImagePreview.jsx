/**
 * components/upload/ImagePreview.jsx
 * Uploaded local image file preview wrapper.
 */

import React from 'react';

const ImagePreview = ({ previewUrl, onClear }) => {
  return (
    <div className="image-preview-container" onClick={(e) => e.stopPropagation()}>
      <img src={previewUrl} alt="Upload preview" className="image-preview" />
      <button className="clear-btn" onClick={onClear} title="Remove image">
        ✕
      </button>
    </div>
  );
};

export default ImagePreview;
