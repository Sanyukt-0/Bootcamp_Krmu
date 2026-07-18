/**
 * utils/downloadImage.js
 * Downloads the given image by fetching it as a blob and clicking a temporary link.
 */

export const downloadImage = async (imageUrl, filename = 'transparent-image.png') => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error initiating file download:', error);
    throw error;
  }
};
