/**
 * pages/HistoryPage.jsx
 * History dashboard page fetching lists and displaying deletion overlays.
 */

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHistory } from '../hooks/useHistory';
import { ImageContext } from '../context/ImageContext';
import HistoryList from '../components/history/HistoryList';
import DeleteHistoryModal from '../components/history/DeleteHistoryModal';

const HistoryPage = () => {
  const navigate = useNavigate();
  const { setCurrentImage } = useContext(ImageContext);
  
  const {
    history,
    isLoading,
    error,
    itemToDelete,
    setItemToDelete,
    removeItem
  } = useHistory();

  const handleView = (item) => {
    // Set the selected history item as the current active image in context
    setCurrentImage(item);
    navigate('/result');
  };

  const handleDeleteConfirm = async (id) => {
    const success = await removeItem(id);
    if (success) {
      setItemToDelete(null);
    }
  };

  return (
    <div className="history-page">
      <div>
        <h1>Processing History</h1>
        <p>Manage and download transparent images from your past background removal tasks.</p>
      </div>

      {error && (
        <div style={styles.errorAlert}>
          ⚠️ {error}
        </div>
      )}

      {isLoading ? (
        <div style={styles.loader}>
          <div className="btn-primary" style={{ pointerEvents: 'none' }}>
            Loading historical data...
          </div>
        </div>
      ) : (
        <HistoryList 
          items={history} 
          onView={handleView} 
          onDelete={setItemToDelete} 
        />
      )}

      <DeleteHistoryModal 
        item={itemToDelete} 
        onConfirm={handleDeleteConfirm} 
        onCancel={() => setItemToDelete(null)} 
      />
    </div>
  );
};

const styles = {
  errorAlert: {
    padding: '1rem',
    backgroundColor: 'rgba(255, 77, 77, 0.12)',
    border: '1px solid rgba(255, 77, 77, 0.3)',
    color: '#ff4d4d',
    borderRadius: '10px',
    marginTop: '1.5rem',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    padding: '4rem 0',
  }
};

export default HistoryPage;
