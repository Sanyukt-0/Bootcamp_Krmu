/**
 * components/compare/AfterImage.jsx
 * Background-removed (overlay) image preview layer with clip-path mask.
 */

import React from 'react';

const AfterImage = ({ url, alt, clipPercent }) => {
  const clipPathStyle = {
    clipPath: `polygon(${clipPercent}% 0, 100% 0, 100% 100%, ${clipPercent}% 100%)`,
    WebkitClipPath: `polygon(${clipPercent}% 0, 100% 0, 100% 100%, ${clipPercent}% 100%)`
  };

  return (
    <div className="image-after-container" style={clipPathStyle}>
      <img src={url} alt={alt || 'Background Removed'} className="image-after" />
    </div>
  );
};

export default AfterImage;
