/**
 * hooks/useHistory.js
 * Custom hook to control background-removal task records history.
 */

import { useState, useEffect, useCallback } from 'react';
import { fetchHistory, deleteHistoryItem } from '../services/historyService';

export const useHistory = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [itemToDelete, setItemToDelete] = useState(null);

  const loadHistory = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await fetchHistory();
      setHistory(data);
    } catch (err) {
      setError('Failed to fetch history list.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeItem = async (id) => {
    try {
      const success = await deleteHistoryItem(id);
      if (success) {
        setHistory((prev) => prev.filter((item) => item._id !== id));
        return true;
      }
      return false;
    } catch (err) {
      setError('Failed to delete history item.');
      return false;
    }
  };

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return {
    history,
    isLoading,
    error,
    itemToDelete,
    setItemToDelete,
    loadHistory,
    removeItem
  };
};
