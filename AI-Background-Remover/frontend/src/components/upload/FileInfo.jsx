/**
 * components/upload/FileInfo.jsx
 * File details display (name, size, type).
 */

import React from 'react';

const FileInfo = ({ name, size, type }) => {
  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="file-info" onClick={(e) => e.stopPropagation()}>
      <div><strong>Filename:</strong> {name}</div>
      <div><strong>Size:</strong> {formatBytes(size)}</div>
      <div><strong>Format:</strong> {type.split('/')[1]?.toUpperCase() || 'Unknown'}</div>
    </div>
  );
};

export default FileInfo;
