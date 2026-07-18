/**
 * hooks/useDownload.js
 * Custom hook wrapping utility calls to trigger browser file downloads.
 */

import { useState } from 'react';
import { downloadImage } from '../utils/downloadImage';

export const useDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState('');

  const triggerDownload = async (imageUrl, defaultFilename = 'transparent-image.png') => {
    setIsDownloading(true);
    setError('');
    try {
      await downloadImage(imageUrl, defaultFilename);
    } catch (err) {
      setError('Download failed. Please try saving manually.');
    } finally {
      setIsDownloading(false);
    }
  };

  return {
    isDownloading,
    error,
    triggerDownload
  };
};
