/**
 * controllers/imageController.js
 * Controls background removal requests, calls processing services, and saves database records.
 */

const removeBgService = require('../services/removeBgService');
const storageService = require('../services/storageService');
const Image = require('../models/Image');
const logger = require('../utils/logger');
const historyController = require('./historyController');

exports.removeBackground = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload an image file.' });
    }

    logger.info(`Received image background removal request for file: ${req.file.filename}`);

    const originalPath = req.file.path;
    const filename = req.file.filename;

    // Call service to process background removal
    const processedResult = await removeBgService.removeBackground(originalPath, filename);

    // Save metadata to MongoDB
    const newImageRecord = new Image({
      originalName: req.file.originalname,
      originalPath: `/uploads/originals/${req.file.filename}`,
      processedPath: `/uploads/processed/${processedResult.filename}`,
      size: req.file.size,
      mimeType: req.file.mimetype
    });

    // Check if mongo connection is actually running, otherwise save mock metadata to run mock API.
    let savedRecord;
    try {
      savedRecord = await newImageRecord.save();
    } catch (dbError) {
      logger.error('Failed to save to MongoDB, returning metadata directly without DB persist:', dbError);
      savedRecord = {
        _id: 'mock-' + Date.now(),
        originalName: req.file.originalname,
        originalPath: `/uploads/originals/${req.file.filename}`,
        processedPath: `/uploads/processed/${processedResult.filename}`,
        size: req.file.size,
        createdAt: new Date()
      };
      historyController.addToMockHistory(savedRecord);
    }

    res.status(200).json({
      success: true,
      message: 'Background removed successfully',
      data: savedRecord
    });
  } catch (error) {
    logger.error('Error in removeBackground controller:', error);
    next(error);
  }
};
