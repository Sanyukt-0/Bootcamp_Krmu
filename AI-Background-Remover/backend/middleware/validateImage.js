/**
 * middleware/validateImage.js
 * Additional validations for incoming uploaded files.
 */

const path = require('path');
const logger = require('../utils/logger');

const validateImage = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded' });
  }

  // Validate extension
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  const ext = path.extname(req.file.originalname).toLowerCase();
  
  if (!allowedExtensions.includes(ext)) {
    logger.warn(`Rejected file with forbidden extension: ${ext}`);
    return res.status(400).json({ error: `Allowed file types are: ${allowedExtensions.join(', ')}` });
  }

  // Double check file size limit (5MB)
  if (req.file.size > 5 * 1024 * 1024) {
    logger.warn(`Rejected file exceeding size limit: ${req.file.size} bytes`);
    return res.status(400).json({ error: 'File size must not exceed 5MB' });
  }

  next();
};

module.exports = validateImage;
