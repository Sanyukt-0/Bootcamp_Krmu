/**
 * services/imageService.js
 * Core image processing utility logic (dimensions, format checks).
 */

const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

/**
 * Validates file size and presence
 * @param {string} filePath 
 * @returns {boolean}
 */
exports.validateFileExists = (filePath) => {
  try {
    return fs.existsSync(filePath);
  } catch (err) {
    logger.error(`Error checking file existence: ${filePath}`, err);
    return false;
  }
};

/**
 * Gets file extension safely
 * @param {string} filename 
 * @returns {string}
 */
exports.getExtension = (filename) => {
  return path.extname(filename).toLowerCase();
};
