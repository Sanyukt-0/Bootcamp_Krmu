/**
 * services/historyService.js
 * Service managing background removals history list queries and item deletions.
 */

import apiClient from './api';

export const fetchHistory = async () => {
  const response = await apiClient.get('/history');
  return response.data;
};

export const fetchHistoryById = async (id) => {
  const response = await apiClient.get(`/history/${id}`);
  return response.data;
};

export const deleteHistoryItem = async (id) => {
  const response = await apiClient.delete(`/history/${id}`);
  return response.success;
};
