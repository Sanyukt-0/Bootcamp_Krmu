/**
 * components/Navbar.jsx
 * Top navigation bar with app logo and settings controls.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { APP_INFO } from '../utils/constants';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.brandContainer}>
        <img src="/logo.png" alt="Logo" style={styles.logo} />
        <span style={styles.brandName}>{APP_INFO.NAME}</span>
      </Link>
      <div style={styles.navLinks}>
        <span style={styles.badge}>v1.0.0</span>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '70px',
    backgroundColor: 'rgba(9, 10, 15, 0.8)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(123, 97, 255, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2rem',
    zIndex: 50,
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    textDecoration: 'none',
  },
  logo: {
    height: '36px',
    width: '36px',
    borderRadius: '8px',
  },
  brandName: {
    fontFamily: "'Outfit', sans-serif",
    fontWeight: 700,
    fontSize: '1.25rem',
    color: '#fff',
    letterSpacing: '-0.5px',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  badge: {
    fontSize: '0.75rem',
    background: 'rgba(123, 97, 255, 0.15)',
    color: '#7b61ff',
    padding: '4px 8px',
    borderRadius: '4px',
    border: '1px solid rgba(123, 97, 255, 0.3)',
    fontWeight: '600',
  }
};

export default Navbar;
