/**
 * utils/deleteFile.js
 * Safely deletes a file from the local file system.
 */

const fs = require('fs');
const logger = require('./logger');

/**
 * Deletes file at path asynchronously.
 * @param {string} filePath - Absolute path to delete
 * @returns {Promise<boolean>} Resolves true if deleted, false if file did not exist
 */
const deleteFile = async (filePath) => {
  return new Promise((resolve) => {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        // File does not exist, nothing to delete
        return resolve(false);
      }

      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          logger.error(`Error deleting file: ${filePath}`, unlinkErr);
          return resolve(false);
        }
        logger.info(`Successfully deleted file: ${filePath}`);
        resolve(true);
      });
    });
  });
};

module.exports = deleteFile;
