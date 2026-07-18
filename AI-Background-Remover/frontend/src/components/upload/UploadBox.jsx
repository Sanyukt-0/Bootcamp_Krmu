/**
 * components/upload/UploadBox.jsx
 * File select drag-and-drop zone container.
 */

import React, { useRef } from 'react';

const UploadBox = ({ isDragging, onDragOver, onDragLeave, onDrop, onFileSelect, children }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div 
      className={`upload-box ${isDragging ? 'dragging' : ''}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={handleClick}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/png, image/jpeg, image/webp"
        style={{ display: 'none' }}
      />
      {children}
    </div>
  );
};

export default UploadBox;
