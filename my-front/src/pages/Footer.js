import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Our Team</h3>
          <p>Top-Rated Colleges</p>
          <p>Recently Reviewed Colleges</p>
        </div>
        <div className="footer-section">
          <h3>Website Tutorials</h3>
          <p>Study Resources</p>
          <p>Exam Guidance</p>
        </div>
        <div className="footer-section">
        <div className="social">
  <h3>SOCIAL</h3>

</div>

        </div>
        <div className="footer-section">
          <h3>CONTACT US</h3>
          <p>📍 Uttarahalli-Kengeri Main Road, Srinivaspura, Bengaluru, 560060</p>
          <p>📞 8310368144</p>
          <p>✉️ example@gmail.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>2025 © College Review System, All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;