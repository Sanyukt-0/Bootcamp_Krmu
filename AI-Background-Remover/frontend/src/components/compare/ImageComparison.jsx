/**
 * components/compare/ImageComparison.jsx
 * Split slider image comparison control allowing before-after transparency inspection.
 */

import React, { useState } from 'react';
import BeforeImage from './BeforeImage';
import AfterImage from './AfterImage';

const ImageComparison = ({ originalUrl, processedUrl, originalName }) => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <div className="comparison-container">
      {/* Before (Original) Image */}
      <BeforeImage url={originalUrl} alt={originalName} />

      {/* After (Processed) Image with clip-path matching sliderPosition */}
      <AfterImage 
        url={processedUrl} 
        alt={`Processed ${originalName}`} 
        clipPercent={sliderPosition} 
      />

      {/* Vertical Slider line dividing overlays */}
      <div 
        className="slider-line" 
        style={{ left: `${sliderPosition}%` }}
      ></div>

      {/* Handles controller */}
      <div 
        className="slider-handle" 
        style={{ left: `${sliderPosition}%` }}
      >
        ↔
      </div>

      {/* Invisible Slider Input for dragging */}
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={sliderPosition} 
        onChange={handleSliderChange} 
        className="slider-input" 
        aria-label="Compare image transparency slider"
      />

      {/* Tags info */}
      <div className="image-label label-before">Original</div>
      <div className="image-label label-after">Background Removed</div>
    </div>
  );
};

export default ImageComparison;
