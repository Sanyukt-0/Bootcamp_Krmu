/**
 * components/processing/ProgressBar.jsx
 * Progress bar indicator demonstrating completion level.
 */

import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.track}>
        <div style={{ ...styles.bar, width: `${progress}%` }}></div>
      </div>
      <div style={styles.text}>{progress}% Complete</div>
    </div>
  );
};

const styles = {
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    margin: '1rem 0',
  },
  track: {
    width: '100%',
    height: '6px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '3px',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.02)',
  },
  bar: {
    height: '100%',
    background: 'linear-gradient(90deg, #7b61ff 0%, #00f0ff 100%)',
    borderRadius: '3px',
    transition: 'width 0.3s ease-out',
  },
  text: {
    alignSelf: 'flex-end',
    fontSize: '0.8rem',
    color: '#a0a5c0',
    fontWeight: '500',
  }
};

export default ProgressBar;
