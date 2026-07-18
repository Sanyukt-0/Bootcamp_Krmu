/**
 * pages/NotFound.jsx
 * Elegant dark theme 404 page.
 */

import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.code}>404</h1>
      <h2>Page Not Found</h2>
      <p style={{ maxWidth: '400px', textAlign: 'center', marginTop: '0.5rem' }}>
        The workspace path you requested does not exist. It might have been moved or deleted.
      </p>
      <Link to="/" className="btn-primary" style={{ marginTop: '1.5rem', textDecoration: 'none' }}>
        🏠 Return to Dashboard
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '60vh',
  },
  code: {
    fontSize: '6rem',
    fontWeight: '800',
    letterSpacing: '-2px',
    lineHeight: '1',
  }
};

export default NotFound;
