/**
 * components/history/DeleteHistoryModal.jsx
 * Safe check prompt asking if user wishes to delete records.
 */

import React from 'react';

const DeleteHistoryModal = ({ item, onConfirm, onCancel }) => {
  if (!item) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="glass-card modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Confirm Deletion</h3>
        <p style={{ fontSize: '0.95rem' }}>
          Are you sure you want to delete the record for <strong>{item.originalName}</strong>? 
          This action will permanently delete files from local storage.
        </p>
        <div className="modal-buttons">
          <button className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-danger" onClick={() => onConfirm(item._id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteHistoryModal;
