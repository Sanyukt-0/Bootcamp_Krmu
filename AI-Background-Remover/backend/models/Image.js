/**
 * models/Image.js
 * Mongoose model schema defining metadata structure for background-removed images.
 */

const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  originalName: {
    type: String,
    required: true
  },
  originalPath: {
    type: String,
    required: true
  },
  processedPath: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Image', ImageSchema);
