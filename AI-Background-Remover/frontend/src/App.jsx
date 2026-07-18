/**
 * App.jsx
 * Root wrapper declaring layouts, global provider, and routing entries.
 */

import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';
import { ImageProvider } from './context/ImageContext';
import './App.css';

function App() {
  return (
    <ImageProvider>
      <div className="app-container">
        <Navbar />
        <Sidebar />
        <main className="main-content">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </ImageProvider>
  );
}

export default App;
