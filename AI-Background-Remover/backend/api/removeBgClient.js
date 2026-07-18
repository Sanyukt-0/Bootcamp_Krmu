/**
 * api/removeBgClient.js
 * API Client targeting remove.bg HTTP endpoint.
 */

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

/**
 * Send image to remove.bg.
 * @param {string} filePath - Absolute path to original image file
 * @param {string} apiKey - API Key for remove.bg
 * @returns {Promise<Buffer>} - Returns binary transparent PNG image buffer
 */
exports.removeBackground = async (filePath, apiKey) => {
  const url = 'https://api.remove.bg/v1.0/removebg';
  
  const formData = new FormData();
  formData.append('size', 'auto');
  formData.append('image_file', fs.createReadStream(filePath));

  try {
    const response = await axios.post(url, formData, {
      headers: {
        ...formData.getHeaders(),
        'X-Api-Key': apiKey,
      },
      responseType: 'arraybuffer'
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      // Decode arraybuffer to string error message
      let errMsg = error.message;
      try {
        const decoded = JSON.parse(Buffer.from(error.response.data).toString());
        if (decoded.errors && decoded.errors.length > 0) {
          errMsg = decoded.errors[0].title;
        }
      } catch (parseErr) {
        // Fall back to general status text
      }
      throw new Error(`remove.bg API Error: ${errMsg}`);
    }
    throw error;
  }
};
