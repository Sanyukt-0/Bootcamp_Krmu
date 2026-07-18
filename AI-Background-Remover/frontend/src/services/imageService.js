/**
 * services/imageService.js
 * Service handling image processing and background removal API interactions.
 */

import apiClient from './api';

export const removeBackground = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  // Send request as multipart/form-data
  const response = await apiClient.post('/image/remove-bg', formData, true);
  return response.data;
};
