/**
 * components/Footer.jsx
 * Bottom footer component.
 */

import React from 'react';
import { APP_INFO } from '../utils/constants';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>{APP_INFO.FOOTER_TEXT}</p>
    </footer>
  );
};

const styles = {
  footer: {
    padding: '2rem',
    borderTop: '1px solid rgba(123, 97, 255, 0.08)',
    textAlign: 'center',
    marginTop: 'auto',
    backgroundColor: '#090a0f',
  },
  text: {
    fontSize: '0.85rem',
    color: '#626784',
  }
};

export default Footer;
