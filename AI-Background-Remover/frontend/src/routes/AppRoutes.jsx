/**
 * routes/AppRoutes.jsx
 * Defines front-end routing scheme using React Router.
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import UploadPage from '../pages/UploadPage';
import ResultPage from '../pages/ResultPage';
import HistoryPage from '../pages/HistoryPage';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
