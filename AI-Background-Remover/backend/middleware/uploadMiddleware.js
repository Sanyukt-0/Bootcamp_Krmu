/**
 * middleware/uploadMiddleware.js
 * Express middleware wrapper around Multer configuration.
 */

const upload = require('../config/multer');

// Standard multer 'single' middleware mapping to field name 'image'
const uploadMiddleware = upload.single('image');

module.exports = uploadMiddleware;
