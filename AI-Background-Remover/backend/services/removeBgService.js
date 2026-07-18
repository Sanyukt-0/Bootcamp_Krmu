/**
 * services/removeBgService.js
 * Calls remove.bg API through API client or runs a fallback mock simulation.
 */

const fs = require('fs');
const path = require('path');
const removeBgClient = require('../api/removeBgClient');
const logger = require('../utils/logger');

exports.removeBackground = async (filePath, filename) => {
  const apiKey = process.env.REMOVE_BG_API_KEY;
  const isMock =
    !apiKey ||
    apiKey.startsWith('dummy') ||
    apiKey === 'your_remove_bg_api_key_here';

  const outputFilename = `processed-${Date.now()}-${filename.split('.').slice(0, -1).join('.')}.png`;
  const outputPath = path.join(__dirname, '../uploads/processed', outputFilename);

  if (isMock) {
    logger.info(`[MOCK MODE] Simulating background removal. Copying file to processed directory.`);
    
    // In mock mode, we just copy the original file to simulating processing
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    fs.copyFileSync(filePath, outputPath);
    return {
      filename: outputFilename,
      path: outputPath,
      isMock: true
    };
  }

  try {
    logger.info(`Sending image to remove.bg API...`);
    const processedBuffer = await removeBgClient.removeBackground(filePath, apiKey);
    
    // Write the output transparent PNG buffer
    fs.writeFileSync(outputPath, processedBuffer);
    
    return {
      filename: outputFilename,
      path: outputPath,
      isMock: false
    };
  } catch (error) {
    logger.error('Error invoking remove.bg API:', error.message);
    throw new Error(`Background removal failed: ${error.message}`);
  }
};
