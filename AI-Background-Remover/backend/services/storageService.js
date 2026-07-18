/**
 * services/storageService.js
 * Interface for saving and deleting files from the file system.
 */

const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');
const deleteFile = require('../utils/deleteFile');

/**
 * Delete original and processed images from storage.
 * @param {string} originalRelativePath - e.g. '/uploads/originals/image.png'
 * @param {string} processedRelativePath - e.g. '/uploads/processed/processed-image.png'
 */
exports.deleteRecordFiles = async (originalRelativePath, processedRelativePath) => {
  try {
    // Resolve absolute paths
    const originalAbsPath = path.join(__dirname, '..', originalRelativePath);
    const processedAbsPath = path.join(__dirname, '..', processedRelativePath);

    logger.info(`Deleting stored files: ${originalAbsPath} and ${processedAbsPath}`);

    // Call deletion utility
    await deleteFile(originalAbsPath);
    await deleteFile(processedAbsPath);
  } catch (error) {
    logger.error('Failed to delete stored files:', error.message);
  }
};
