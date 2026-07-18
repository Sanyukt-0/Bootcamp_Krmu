/**
 * pages/Dashboard.jsx
 * Application landing view highlighting features and CTA redirects.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { APP_INFO } from '../utils/constants';

const Dashboard = () => {
  return (
    <div style={styles.dashboard}>
      <header style={styles.header}>
        <h1>{APP_INFO.NAME}</h1>
        <p style={styles.tagline}>{APP_INFO.TAGLINE}</p>
      </header>

      <section style={styles.heroSection} className="glass-card">
        <div style={styles.heroContent}>
          <h2>Instant Background Eraser</h2>
          <p style={{ margin: '1rem 0 2rem 0', maxWidth: '600px' }}>
            Powered by high-quality AI models, remove.bg clients segment image subjects 
            with precision. Upload JPG/PNG file and get a transparent background download instantly.
          </p>
          <Link to="/upload" className="btn-primary" style={{ textDecoration: 'none' }}>
            🚀 Start Removing Now
          </Link>
        </div>
      </section>

      <section style={styles.features}>
        <div className="glass-card" style={styles.featureCard}>
          <span style={styles.featureIcon}>⚡</span>
          <h3>Ultra Fast</h3>
          <p>Remove backgrounds in seconds using cutting edge computer vision API integrations.</p>
        </div>
        <div className="glass-card" style={styles.featureCard}>
          <span style={styles.featureIcon}>🎯</span>
          <h3>Precise Edges</h3>
          <p>Intelligent edge detection preserves details like hair, fur, and intricate patterns.</p>
        </div>
        <div className="glass-card" style={styles.featureCard}>
          <span style={styles.featureIcon}>📂</span>
          <h3>History Log</h3>
          <p>Review past processes, compare results and re-download transparent PNGs at any time.</p>
        </div>
      </section>
    </div>
  );
};

const styles = {
  dashboard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3rem',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginTop: '1rem',
  },
  tagline: {
    fontSize: '1.2rem',
    marginTop: '0.5rem',
    color: '#a0a5c0',
  },
  heroSection: {
    padding: '4rem 3rem',
    borderRadius: '24px',
    textAlign: 'center',
    background: 'radial-gradient(circle at top right, rgba(123, 97, 255, 0.1) 0%, rgba(18, 20, 32, 0.7) 100%)',
  },
  heroContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  featureCard: {
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  featureIcon: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
  }
};

export default Dashboard;
