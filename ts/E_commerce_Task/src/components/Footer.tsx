import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer-div">
      <div className="footer-container">
        <div className="footer-right">
          <p>
            Developed by <span className="name">Technotery</span>
          </p>

          <a
            href="https://github.com/jaykhatik"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            View code on Github
            <span className="icon">
              <i className="fa-brands fa-github"></i>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;