/**
 * middleware/errorHandler.js
 * Standardized error handling middleware.
 */

const logger = require('../utils/logger');

// Express global error handler
const errorHandler = (err, req, res, next) => {
  logger.error(`Error processing request: ${err.message}`, err);

  const statusCode = err.status || 500;
  
  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || 'Internal Server Error',
      status: statusCode
    }
  });
};

module.exports = errorHandler;
