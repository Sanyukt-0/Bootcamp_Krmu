/**
 * controllers/historyController.js
 * Controls retrieval and deletion of processed image metadata.
 */

const Image = require('../models/Image');
const storageService = require('../services/storageService');
const logger = require('../utils/logger');

// Global mock database fallback for running without MongoDB running
let mockHistory = [];

exports.getAllHistory = async (req, res, next) => {
  try {
    let history = [];
    try {
      history = await Image.find().sort({ createdAt: -1 });
    } catch (dbError) {
      logger.error('Failed to query database, falling back to mock history list.', dbError);
      history = mockHistory;
    }
    res.status(200).json({ success: true, count: history.length, data: history });
  } catch (error) {
    next(error);
  }
};

exports.getHistoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let record;

    if (id.startsWith('mock-')) {
      record = mockHistory.find(item => item._id === id);
    } else {
      record = await Image.findById(id);
    }

    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.status(200).json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};

exports.deleteHistory = async (req, res, next) => {
  try {
    const { id } = req.params;
    let record;

    if (id.startsWith('mock-')) {
      const index = mockHistory.findIndex(item => item._id === id);
      if (index !== -1) {
        record = mockHistory[index];
        mockHistory.splice(index, 1);
      }
    } else {
      record = await Image.findByIdAndDelete(id);
    }

    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }

    // Delete original and processed images from storage
    await storageService.deleteRecordFiles(record.originalPath, record.processedPath);

    res.status(200).json({ success: true, message: 'Record and associated files deleted successfully' });
  } catch (error) {
    logger.error(`Error deleting history record ${id}:`, error);
    next(error);
  }
};

// Export method to add mock items externally (e.g. from the processing controller)
exports.addToMockHistory = (record) => {
  mockHistory.unshift(record);
};
