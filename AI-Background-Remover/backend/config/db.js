/**
 * config/db.js
 * Configures and establishes connection to MongoDB using Mongoose.
 */

const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ai-background-remover';
  
  try {
    const conn = await mongoose.connect(mongoURI);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Database connection error: ${error.message}`);
    // Do not crash the server in local development if mongo is down, just log it.
    if (process.env.NODE_ENV === 'production') {
      throw error;
    }
  }
};

module.exports = connectDB;
