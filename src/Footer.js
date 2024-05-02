import React from 'react';
import './Footer.css'; // Import the CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h2>About Us</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque justo nec fringilla vehicula.</p>
        </div>
        <div className="footer-section">
          <h2>Contact Us</h2>
          <p>Email: example@example.com</p>
          <p>Phone: +1234567890</p>
        </div>
        <div className="footer-section">
          <h2>Follow Us</h2>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Workfys Food Delivery. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
