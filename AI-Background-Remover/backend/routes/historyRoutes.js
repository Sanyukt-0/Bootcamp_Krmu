/**
 * routes/historyRoutes.js
 * Routing for retrieval and deletion of processed image history records.
 */

const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');

// Retrieve all processed images
router.get('/', historyController.getAllHistory);

// Get single history entry
router.get('/:id', historyController.getHistoryById);

// Delete historical record and associated files
router.delete('/:id', historyController.deleteHistory);

module.exports = router;
