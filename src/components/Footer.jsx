import React from 'react';

function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© 2024, All rights reserved. Book Flare</p>
      <div style={styles.links}>
        <a href="/">FAQs</a>
        <a href="/">Pricing</a>
        <a href="/">Contact Us</a>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#054b29',
    color: 'white',
  },
  links: {
    marginTop: '10px',
  },
};

export default Footer;
