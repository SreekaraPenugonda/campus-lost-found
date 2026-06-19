import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1>About Vignan Lost & Found</h1>
        
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            Vignan Lost & Found is a campus-wide platform designed to help students and staff 
            recover lost items quickly and efficiently. We believe that no one should have to 
            stress about losing their belongings on campus.
          </p>
        </section>

        <section className="about-section">
          <h2>How We Help</h2>
          <div className="features-grid">
            <div className="feature">
              <span className="feature-icon">⚡</span>
              <h3>Fast Reporting</h3>
              <p>Report lost or found items in under 30 seconds. No lengthy forms.</p>
            </div>
            <div className="feature">
              <span className="feature-icon">🎯</span>
              <h3>Smart Matching</h3>
              <p>Our AI automatically matches lost items with found items based on multiple factors.</p>
            </div>
            <div className="feature">
              <span className="feature-icon">🔒</span>
              <h3>Secure Chat</h3>
              <p>Communicate anonymously until you're ready to share contact details.</p>
            </div>
            <div className="feature">
              <span className="feature-icon">📍</span>
              <h3>Campus Map</h3>
              <p>See where items are lost/found across campus in real-time.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Contact Us</h2>
          <p>Have questions or suggestions? Reach out to us:</p>
          <div className="contact-info">
            <p>📧 Email: support@vignan.edu.in</p>
            <p>📱 Phone: +91 863 123 4567</p>
            <p>📍 Office: Student Affairs Building, Room 101</p>
          </div>
        </section>

        <div className="about-cta">
          <Link to="/report-lost" className="btn-primary">Report Lost Item</Link>
          <Link to="/report-found" className="btn-secondary">Report Found Item</Link>
        </div>
      </div>

      <style>{`
        .about-page {
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 16px;
        }
        .about-container {
          background: white;
          border-radius: 12px;
          border: 1px solid #eaeef2;
          padding: 40px;
        }
        .about-container h1 {
          font-size: 32px;
          color: #1a365d;
          margin: 0 0 32px;
          text-align: center;
        }
        .about-section {
          margin-bottom: 40px;
        }
        .about-section h2 {
          font-size: 24px;
          color: #1a365d;
          margin: 0 0 16px;
        }
        .about-section p {
          color: #6b7280;
          line-height: 1.6;
          margin: 0;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        .feature {
          padding: 24px;
          background: #f8f9fa;
          border-radius: 8px;
          text-align: center;
        }
        .feature-icon {
          font-size: 40px;
          display: block;
          margin-bottom: 12px;
        }
        .feature h3 {
          font-size: 16px;
          color: #1a365d;
          margin: 0 0 8px;
        }
        .feature p {
          font-size: 13px;
          color: #6b7280;
        }
        .contact-info {
          margin-top: 16px;
          padding: 20px;
          background: #f0fdf4;
          border-radius: 8px;
        }
        .contact-info p {
          margin: 8px 0;
          color: #1a365d;
        }
        .about-cta {
          display: flex;
          gap: 16px;
          justify-content: center;
          margin-top: 40px;
          padding-top: 40px;
          border-top: 1px solid #eaeef2;
        }
        .btn-primary, .btn-secondary {
          padding: 14px 28px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 15px;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .btn-primary {
          background: #7FFF00;
          color: #1a365d;
        }
        .btn-secondary {
          background: white;
          color: #1a365d;
          border: 2px solid #eaeef2;
        }
      `}</style>
    </div>
  );
}