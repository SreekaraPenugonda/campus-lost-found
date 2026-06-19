import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>🔍 Lost & Found</h3>
            <p>Helping Vignan students and staff recover lost items quickly and securely.</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/items">Browse Items</Link>
            <Link to="/report-lost">Report Lost</Link>
            <Link to="/report-found">Report Found</Link>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <Link to="/faq">FAQ</Link>
            <Link to="/guidelines">Guidelines</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/about">About</Link>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <p>📧 support@vignan.edu.in</p>
            <p>📱 +91 863 123 4567</p>
            <p>📍 Student Affairs Building</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Vignan Lost & Found. All rights reserved.</p>
        </div>
      </div>

      <style>{`
        .footer {
          background: #1a365d;
          color: white;
          padding: 40px 20px 20px;
          margin-top: 60px;
        }
        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 32px;
          margin-bottom: 32px;
        }
        .footer-section h3 {
          font-size: 18px;
          margin: 0 0 12px;
          color: #7FFF00;
        }
        .footer-section h4 {
          font-size: 16px;
          margin: 0 0 12px;
          color: white;
        }
        .footer-section p {
          margin: 0 0 8px;
          font-size: 14px;
          opacity: 0.9;
          line-height: 1.6;
        }
        .footer-section a {
          display: block;
          color: white;
          text-decoration: none;
          font-size: 14px;
          margin-bottom: 8px;
          opacity: 0.9;
          transition: opacity 0.2s ease;
        }
        .footer-section a:hover {
          opacity: 1;
          color: #7FFF00;
        }
        .footer-bottom {
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }
        .footer-bottom p {
          margin: 0;
          font-size: 13px;
          opacity: 0.8;
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}