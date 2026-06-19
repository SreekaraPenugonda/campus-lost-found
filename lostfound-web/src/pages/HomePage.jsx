import { useState } from 'react';
import { Link } from 'react-router-dom';
import SmartSearch from '../components/SmartSearch';
import VisualSearch from '../components/VisualSearch';
import CampusMap from '../components/CampusMap';

export default function HomePage() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Lost Items <span className="highlight">Fast</span></h1>
          <p className="hero-subtitle">
            Report in 30 seconds. Get matched automatically. Recover in hours, not days.
          </p>
          <div className="hero-actions">
            <Link to="/report-lost" className="btn-primary btn-large">
              ❌ Report Lost Item
            </Link>
            <Link to="/report-found" className="btn-secondary btn-large">
              ✅ Report Found Item
            </Link>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">24h</span>
            <span className="stat-label">Avg Recovery</span>
          </div>
          <div className="stat">
            <span className="stat-number">85%</span>
            <span className="stat-label">Match Rate</span>
          </div>
          <div className="stat">
            <span className="stat-number">500+</span>
            <span className="stat-label">Items Recovered</span>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section">
        <SmartSearch onResults={setSearchResults} placeholder="Search for your item..." />
        
        {searchResults.length > 0 && (
          <div className="search-results">
            <h3>Found {searchResults.length} items</h3>
            <div className="results-grid">
              {searchResults.slice(0, 6).map(item => (
                <Link key={item.id} to={`/items/${item.id}`} className="result-card">
                  <span className="result-icon">{item.status === 'LOST' ? '❌' : '✅'}</span>
                  <div className="result-info">
                    <h4>{item.title}</h4>
                    <p>📍 {item.building}</p>
                    <span className="result-category">{item.category}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Report</h3>
            <p>Post in 30 seconds. No signup required.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Match</h3>
            <p>AI finds matches automatically.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Connect</h3>
            <p>Chat securely. Verify ownership.</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Recover</h3>
            <p>Get your item back. Fast.</p>
          </div>
        </div>
      </section>

      {/* Visual Search */}
      <section className="visual-section">
        <VisualSearch onSearch={(category) => {
          // Navigate to items list with category filter
          window.location.href = `/items?category=${category}`;
        }} />
      </section>

      {/* Campus Map */}
      <section className="map-section">
        <CampusMap />
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Lost Something?</h2>
          <p>Don't wait. Report it now and increase your chances of recovery.</p>
          <Link to="/report-lost" className="btn-primary btn-large">
            Report Lost Item Now
          </Link>
        </div>
      </section>

      <style>{`
        .home-page {
          min-height: 100vh;
        }

        /* Hero Section */
        .hero {
          background: linear-gradient(135deg, #1a365d 0%, #2d5a8e 100%);
          color: white;
          padding: 60px 20px;
          text-align: center;
        }
        .hero-content {
          max-width: 800px;
          margin: 0 auto 40px;
        }
        .hero h1 {
          font-size: 48px;
          margin: 0 0 16px;
          font-weight: 800;
        }
        .highlight {
          color: #7FFF00;
        }
        .hero-subtitle {
          font-size: 18px;
          opacity: 0.9;
          margin: 0 0 32px;
        }
        .hero-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .hero-stats {
          display: flex;
          gap: 40px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .stat {
          text-align: center;
        }
        .stat-number {
          display: block;
          font-size: 36px;
          font-weight: 800;
          color: #7FFF00;
        }
        .stat-label {
          font-size: 14px;
          opacity: 0.8;
        }

        /* Buttons */
        .btn-large {
          padding: 16px 32px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 8px;
          text-decoration: none;
          display: inline-block;
          transition: all 0.2s ease;
        }
        .btn-primary {
          background: #7FFF00;
          color: #1a365d;
          border: none;
        }
        .btn-primary:hover {
          background: #6de600;
          transform: translateY(-2px);
        }
        .btn-secondary {
          background: white;
          color: #1a365d;
          border: 2px solid white;
        }
        .btn-secondary:hover {
          background: transparent;
          color: white;
        }

        /* Search Section */
        .search-section {
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        .search-results {
          margin-top: 24px;
        }
        .search-results h3 {
          font-size: 18px;
          color: #1a365d;
          margin: 0 0 16px;
        }
        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }
        .result-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: white;
          border: 1px solid #eaeef2;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .result-card:hover {
          border-color: #7FFF00;
          transform: translateY(-2px);
        }
        .result-icon {
          font-size: 24px;
        }
        .result-info {
          flex: 1;
        }
        .result-info h4 {
          margin: 0 0 4px;
          color: #1a365d;
          font-size: 14px;
        }
        .result-info p {
          margin: 0 0 4px;
          font-size: 12px;
          color: #6b7280;
        }
        .result-category {
          display: inline-block;
          padding: 2px 8px;
          background: #f0fdf4;
          color: #166534;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
        }

        /* How It Works */
        .how-it-works {
          background: #f8f9fa;
          padding: 60px 20px;
          text-align: center;
        }
        .how-it-works h2 {
          font-size: 32px;
          color: #1a365d;
          margin: 0 0 40px;
        }
        .steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px;
          max-width: 1000px;
          margin: 0 auto;
        }
        .step {
          background: white;
          padding: 32px 20px;
          border-radius: 12px;
          border: 1px solid #eaeef2;
        }
        .step-number {
          width: 48px;
          height: 48px;
          background: #7FFF00;
          color: #1a365d;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 700;
          margin: 0 auto 16px;
        }
        .step h3 {
          font-size: 18px;
          color: #1a365d;
          margin: 0 0 8px;
        }
        .step p {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
        }

        /* Visual Section */
        .visual-section {
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        /* Map Section */
        .map-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        /* CTA Section */
        .cta-section {
          background: linear-gradient(135deg, #7FFF00 0%, #6de600 100%);
          padding: 60px 20px;
          text-align: center;
        }
        .cta-content {
          max-width: 600px;
          margin: 0 auto;
        }
        .cta-content h2 {
          font-size: 36px;
          color: #1a365d;
          margin: 0 0 12px;
        }
        .cta-content p {
          font-size: 16px;
          color: #1a365d;
          opacity: 0.8;
          margin: 0 0 24px;
        }
        .cta-content .btn-primary {
          background: #1a365d;
          color: white;
        }
        .cta-content .btn-primary:hover {
          background: #2d5a8e;
        }

        @media (max-width: 768px) {
          .hero h1 {
            font-size: 32px;
          }
          .hero-subtitle {
            font-size: 16px;
          }
          .hero-stats {
            gap: 20px;
          }
          .stat-number {
            font-size: 28px;
          }
        }
      `}</style>
    </div>
  );
}