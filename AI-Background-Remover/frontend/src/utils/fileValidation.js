/**
 * utils/fileValidation.js
 * Frontend image files sizing/extension validations.
 */

export const validateFile = (file) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxSizeBytes = 5 * 1024 * 1024; // 5 MB

  if (!file) {
    return { valid: false, message: 'No file selected.' };
  }

  if (!allowedMimeTypes.includes(file.type)) {
    return {
      valid: false,
      message: 'Format not supported. Please upload PNG, JPG, or WebP images.'
    };
  }

  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      message: 'File is too large. Image size should not exceed 5MB.'
    };
  }

  return { valid: true };
};
