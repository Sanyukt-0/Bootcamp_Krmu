/**
 * components/processing/ProcessingStatus.jsx
 * Current background-removal task status descriptor.
 */

import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import ProgressBar from './ProgressBar';

const ProcessingStatus = ({ progress, statusMessage }) => {
  return (
    <div style={styles.statusBox}>
      <LoadingSpinner />
      <div style={styles.message}>{statusMessage || 'Analyzing image subject...'}</div>
      <ProgressBar progress={progress} />
    </div>
  );
};

const styles = {
  statusBox: {
    padding: '2.5rem',
    borderRadius: '16px',
    backgroundColor: 'rgba(18, 20, 32, 0.6)',
    border: '1px solid rgba(123, 97, 255, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    maxWidth: '500px',
    margin: '2rem auto',
    textAlign: 'center',
  },
  message: {
    fontSize: '1rem',
    color: '#f1f2f6',
    fontWeight: '500',
    marginTop: '0.5rem',
  }
};

export default ProcessingStatus;
