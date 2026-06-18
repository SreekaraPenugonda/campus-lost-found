import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">🏫</div>
            <h3>Vignan University</h3>
            <p>Official Lost & Found System</p>
            <p className="footer-motto">"Building Skill India"</p>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4>Quick Links</h4>
            <Link to="/report-lost">Report Lost</Link>
            <Link to="/report-found">Report Found</Link>
            <Link to="/items">Browse Items</Link>
            <Link to="/guidelines">Guidelines</Link>
          </div>

          {/* Help */}
          <div className="footer-links">
            <h4>Help</h4>
            <Link to="/faq">FAQ</Link>
            <Link to="/contact">Contact Support</Link>
            <Link to="/about">About</Link>
          </div>

          {/* Contact */}
          <div className="footer-contact">
            <h4>Contact</h4>
            <p>📧 support@vignan.ac.in</p>
            <p>📍 Vignan University, India</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Vignan's Foundation for Science, 
            Technology & Research (VFSTR). All rights reserved.
          </p>
          <p className="footer-version">v2.0</p>
        </div>
      </div>

      <style>{`
        .footer {
          background: #1a365d;
          color: rgba(255, 255, 255, 0.8);
          border-top: 3px solid #7FFF00;
          margin-top: auto;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 32px 16px 16px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 32px;
          margin-bottom: 24px;
        }

        .footer-brand h3 {
          font-size: 18px;
          font-weight: 600;
          color: white;
          margin: 8px 0 4px 0;
        }

        .footer-brand p {
          font-size: 14px;
          margin: 0 0 4px 0;
          color: rgba(255, 255, 255, 0.6);
        }

        .footer-motto {
          color: #7FFF00 !important;
          font-weight: 500;
        }

        .footer-logo {
          font-size: 32px;
        }

        .footer-links h4,
        .footer-contact h4 {
          font-size: 14px;
          font-weight: 600;
          color: white;
          margin: 0 0 12px 0;
        }

        .footer-links a {
          display: block;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-size: 14px;
          padding: 4px 0;
          transition: color 0.15s ease;
        }

        .footer-links a:hover {
          color: #7FFF00;
        }

        .footer-contact p {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          margin: 4px 0;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.4);
        }

        .footer-version {
          font-size: 12px;
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }
        }

        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 4px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}