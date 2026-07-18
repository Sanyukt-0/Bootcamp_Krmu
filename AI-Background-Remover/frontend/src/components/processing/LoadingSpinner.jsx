/**
 * components/processing/LoadingSpinner.jsx
 * Premium rotating loading spinner.
 */

import React from 'react';

const LoadingSpinner = () => {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
  },
  spinner: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '3px solid rgba(123, 97, 255, 0.1)',
    borderTopColor: '#7b61ff',
    borderRightColor: '#00f0ff',
    animation: 'spin 1s linear infinite',
  }
};

// Insert keyframes dynamically if not present in CSS
const styleSheet = document.styleSheets[0];
try {
  styleSheet.insertRule(`
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `, styleSheet.cssRules.length);
} catch (e) {}

export default LoadingSpinner;
