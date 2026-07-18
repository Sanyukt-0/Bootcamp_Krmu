/**
 * routes/imageRoutes.js
 * Routing for image upload and AI background removal processes.
 */

const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const uploadMiddleware = require('../middleware/uploadMiddleware');
const validateImage = require('../middleware/validateImage');

// Route to remove background from uploaded image
router.post('/remove-bg', uploadMiddleware, validateImage, imageController.removeBackground);

module.exports = router;
