import React from 'react';
import '../assets/footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <a href="#home" className="logo">
            3D<span>Arch</span>
          </a>
          <p className="footer-text">Professional 3D Architectural & Interior Design</p>
          
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://behance.net" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-behance"></i>
            </a>
          </div>
          
          <p className="copyright">
            &copy; {new Date().getFullYear()} 3DArch Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;