/**
 * components/compare/BeforeImage.jsx
 * Original (underlay) image preview layer.
 */

import React from 'react';

const BeforeImage = ({ url, alt }) => {
  return (
    <div className="image-compare-wrapper">
      <img src={url} alt={alt || 'Original'} className="image-before" />
    </div>
  );
};

export default BeforeImage;
