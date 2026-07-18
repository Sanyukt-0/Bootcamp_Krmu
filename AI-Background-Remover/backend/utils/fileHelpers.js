/**
 * utils/fileHelpers.js
 * Assorted helper logic for directory and path resolution.
 */

const path = require('path');

/**
 * Format file size into human-readable bytes units.
 * @param {number} bytes 
 * @returns {string} e.g. "1.2 MB"
 */
exports.formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Check if extension is image
 * @param {string} ext 
 * @returns {boolean}
 */
exports.isImageExtension = (ext) => {
  const allowed = ['.png', '.jpg', '.jpeg', '.webp'];
  return allowed.includes(ext.toLowerCase());
};
