/**
 * hooks/useUpload.js
 * Custom hook to control file upload states, drag-and-drop actions, and API progress.
 */

import { useState, useContext } from 'react';
import { ImageContext } from '../context/ImageContext';
import { removeBackground } from '../services/imageService';
import { validateFile } from '../utils/fileValidation';

export const useUpload = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const { setCurrentImage } = useContext(ImageContext);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const selectFile = (selectedFile) => {
    setError('');
    const validation = validateFile(selectedFile);
    if (!validation.valid) {
      setError(validation.message);
      return;
    }

    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      selectFile(e.dataTransfer.files[0]);
    }
  };

  const clearFile = () => {
    setFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl('');
    setError('');
    setProgress(0);
  };

  const processImage = async () => {
    if (!file) return;

    setIsProcessing(true);
    setError('');
    setProgress(15);

    try {
      // Simulate incremental upload progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => (prev < 85 ? prev + 10 : prev));
      }, 200);

      const result = await removeBackground(file);
      
      clearInterval(progressInterval);
      setProgress(100);
      setCurrentImage(result);
      
      return result;
    } catch (err) {
      setError(err.message || 'Background removal failed. Please try again.');
      setProgress(0);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    file,
    previewUrl,
    isDragging,
    isProcessing,
    progress,
    error,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    selectFile,
    clearFile,
    processImage
  };
};
