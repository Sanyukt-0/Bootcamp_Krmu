/**
 * context/ImageContext.jsx
 * Context API provider managing the state of the active processed/loaded image.
 */

import React, { createContext, useState } from 'react';

export const ImageContext = createContext(null);

export const ImageProvider = ({ children }) => {
  const [currentImage, setCurrentImage] = useState(null);

  const resetImageState = () => {
    setCurrentImage(null);
  };

  return (
    <ImageContext.Provider value={{ currentImage, setCurrentImage, resetImageState }}>
      {children}
    </ImageContext.Provider>
  );
};
