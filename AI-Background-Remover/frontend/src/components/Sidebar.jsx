/**
 * components/Sidebar.jsx
 * Side navigation drawer displaying links to dashboard, uploads, and history.
 */

import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.navMenu}>
        <NavLink 
          to="/" 
          style={({ isActive }) => ({ ...styles.navLink, ...(isActive ? styles.activeLink : {}) })}
        >
          <span style={styles.icon}>⚡</span>
          <span style={styles.label}>Dashboard</span>
        </NavLink>
        
        <NavLink 
          to="/upload" 
          style={({ isActive }) => ({ ...styles.navLink, ...(isActive ? styles.activeLink : {}) })}
        >
          <span style={styles.icon}>📤</span>
          <span style={styles.label}>Remove BG</span>
        </NavLink>

        <NavLink 
          to="/history" 
          style={({ isActive }) => ({ ...styles.navLink, ...(isActive ? styles.activeLink : {}) })}
        >
          <span style={styles.icon}>📜</span>
          <span style={styles.label}>History</span>
        </NavLink>
      </div>
    </aside>
  );
};

const styles = {
  sidebar: {
    position: 'fixed',
    top: '70px',
    left: 0,
    bottom: 0,
    width: '260px',
    backgroundColor: '#0c0d14',
    borderRight: '1px solid rgba(123, 97, 255, 0.1)',
    padding: '2rem 1rem',
    zIndex: 40,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '@media (maxWidth: 992px)': {
      width: '80px',
    }
  },
  navMenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '12px 16px',
    borderRadius: '10px',
    color: '#a0a5c0',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  },
  activeLink: {
    color: '#fff',
    backgroundColor: 'rgba(123, 97, 255, 0.12)',
    boxShadow: 'inset 4px 0 0 #7b61ff',
  },
  icon: {
    fontSize: '1.2rem',
  },
  label: {
    fontSize: '0.95rem',
  }
};

export default Sidebar;
