import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>2024, All rights reserved. Book Flare</p>
      <div className="footer-links">
        <a href="#" aria-label="FAQs">FAQs</a>
        <a href="#" aria-label="Pricing">Pricing</a>
        <a href="#" aria-label="About Us">About Us</a>
        <a href="#" aria-label="Contact Us">Contact Us</a>
      </div>
      <div className="social-icons">
        <a href="#" aria-label="Twitter"><i className="fa fa-twitter"></i></a>
        <a href="#" aria-label="Facebook"><i className="fa fa-facebook"></i></a>
        <a href="#" aria-label="YouTube"><i className="fa fa-youtube"></i></a>
      </div>
    </footer>
  );
}

// Ensure default export
export default Footer;
