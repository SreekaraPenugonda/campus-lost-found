import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>About Vignan Lost & Found</h1>
        <p>Your trusted campus companion for reuniting with lost belongings</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>🎯 Our Mission</h2>
          <p>To create a safe, efficient, and compassionate system that helps Vignan University students, faculty, and staff quickly recover lost items and return found belongings to their rightful owners.</p>
        </section>

        <section className="about-section">
          <h2>💡 How It Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Report</h3>
              <p>Report a lost or found item with details, location, and photos</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Match</h3>
              <p>Our smart system automatically matches lost items with found items</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Connect</h3>
              <p>Securely chat with the person who found your item</p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <h3>Reunite</h3>
              <p>Claim your item and get reunited! 🎉</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>🏆 Our Impact</h2>
          <div className="impact-stats">
            <div className="impact-stat">
              <span className="impact-number">500+</span>
              <span className="impact-label">Items Reported</span>
            </div>
            <div className="impact-stat">
              <span className="impact-number">85%</span>
              <span className="impact-label">Recovery Rate</span>
            </div>
            <div className="impact-stat">
              <span className="impact-number">1000+</span>
              <span className="impact-label">Users Helped</span>
            </div>
            <div className="impact-stat">
              <span className="impact-number">24h</span>
              <span className="impact-label">Avg Recovery Time</span>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>🛡️ Security & Privacy</h2>
          <p>Your privacy matters. We use industry-standard encryption, verified university emails, and secure messaging to ensure your data stays safe. Only verified Vignan University members can access the system.</p>
        </section>
      </div>

      <style>{`
        .about-page { max-width: 900px; margin: 0 auto; padding: 0 16px 40px; }
        .about-hero { background: linear-gradient(135deg, #1a365d, #2d5a8e); color: white; padding: 48px; border-radius: 12px; text-align: center; margin-bottom: 32px; }
        .about-hero h1 { font-size: 32px; margin: 0 0 8px; }
        .about-hero p { font-size: 16px; opacity: 0.85; margin: 0; }
        .about-content { background: white; border-radius: 12px; padding: 32px; border: 1px solid #eaeef2; }
        .about-section { margin-bottom: 32px; }
        .about-section h2 { font-size: 22px; color: #1a365d; margin: 0 0 16px; }
        .about-section p { color: #4b5563; line-height: 1.7; margin: 0; }
        .steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .step-card { background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; }
        .step-number { width: 36px; height: 36px; background: #7FFF00; color: #1a365d; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 18px; margin: 0 auto 12px; }
        .step-card h3 { font-size: 16px; color: #1a365d; margin: 0 0 8px; }
        .step-card p { font-size: 13px; color: #6b7280; margin: 0; }
        .impact-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .impact-stat { text-align: center; padding: 20px; background: #f0fdf4; border-radius: 8px; }
        .impact-number { display: block; font-size: 28px; font-weight: 700; color: #16a34a; }
        .impact-label { font-size: 14px; color: #6b7280; }
        @media (max-width: 768px) { .steps-grid, .impact-stats { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .steps-grid, .impact-stats { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}