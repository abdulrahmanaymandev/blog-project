import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* Brand & Tagline */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src="/favicon0.ico" alt="Inkline" width={35} height={35} />
            <span className="footer-logo-text">Inkline</span>
          </Link>

          <p className="footer-tagline">
            Thoughtful writing, beautifully kept. Inkline is an independent
            publishing platform designed for writers who value craft and readers
            who value depth.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="footer-links-group">
          <div className="footer-links-col">
            <h4 className="footer-col-title">Explore</h4>

            <ul className="footer-list">
              <li>
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/posts" className="footer-link">
                  Library
                </Link>
              </li>

              <li>
                <Link
                  to="/posts?category=Technology"
                  className="footer-link"
                >
                  Technology
                </Link>
              </li>

              <li>
                <Link to="/posts?category=Design" className="footer-link">
                  Design
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">Inkline</h4>

            <ul className="footer-list">
              <li>
                <Link to="/about" className="footer-link">
                  About Us
                </Link>
              </li>

              <li>
                <Link to="/careers" className="footer-link">
                  Careers
                </Link>
              </li>

              <li>
                <Link to="/press-kit" className="footer-link">
                  Press Kit
                </Link>
              </li>

              <li>
                <Link to="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-title">Social</h4>

            <ul className="footer-list">
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Twitter
                </a>
              </li>

              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  GitHub
                </a>
              </li>

              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  LinkedIn
                </a>
              </li>

              <li>
                <a
                  href="https://dribbble.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Dribbble
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="footer-copyright">
            &copy; {currentYear} Inkline. All rights reserved.
          </p>

          <div className="footer-legal">
            <Link to="/privacy-policy" className="footer-legal-link">
              Privacy Policy
            </Link>

            <Link to="/terms" className="footer-legal-link">
              Terms of Service
            </Link>

            <Link to="/cookies" className="footer-legal-link">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;