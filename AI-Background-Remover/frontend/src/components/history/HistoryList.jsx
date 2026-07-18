/**
 * components/history/HistoryList.jsx
 * Grid manager listing all cards in history dashboard.
 */

import React from 'react';
import HistoryCard from './HistoryCard';

const HistoryList = ({ items, onView, onDelete }) => {
  if (!items || items.length === 0) {
    return (
      <div style={styles.emptyState}>
        <span style={styles.emptyIcon}>📂</span>
        <h3>No History Found</h3>
        <p style={{ marginTop: '0.25rem' }}>Upload an image and run background removal to see history items here.</p>
      </div>
    );
  }

  return (
    <div className="history-grid">
      {items.map((item) => (
        <HistoryCard 
          key={item._id} 
          item={item} 
          onView={onView} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

const styles = {
  emptyState: {
    padding: '4rem 2rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    borderRadius: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    border: '1px dashed rgba(123, 97, 255, 0.1)',
    width: '100%',
    marginTop: '2rem',
  },
  emptyIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  }
};

export default HistoryList;
