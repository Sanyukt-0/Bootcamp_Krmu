/**
 * components/history/HistoryCard.jsx
 * Display card for past processing task metadata item.
 */

import React from 'react';
import { formatDate } from '../../utils/formatDate';

const HistoryCard = ({ item, onView, onDelete }) => {
  const formatBytes = (bytes) => {
    if (!bytes) return '';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div className="glass-card history-card">
      <div className="history-card-media">
        <img 
          src={item.processedPath} 
          alt={item.originalName} 
          className="history-card-img" 
          onError={(e) => {
            // Fallback to original image if processed has issue loading
            e.target.src = item.originalPath;
          }}
        />
      </div>
      <div className="history-card-info">
        <div className="history-card-title" title={item.originalName}>
          {item.originalName}
        </div>
        <div className="history-card-meta">
          <span>{formatBytes(item.size)}</span>
          <span>{formatDate(item.createdAt)}</span>
        </div>
        <div className="history-card-actions">
          <button 
            className="btn-secondary" 
            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
            onClick={() => onView(item)}
          >
            👁 View
          </button>
          <button 
            className="btn-secondary" 
            style={{ padding: '6px 12px', fontSize: '0.8rem', borderColor: 'rgba(255, 77, 77, 0.3)', color: '#ff4d4d' }}
            onClick={() => onDelete(item)}
          >
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
