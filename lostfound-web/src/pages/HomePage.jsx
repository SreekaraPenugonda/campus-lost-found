import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function HomePage() {
  const [stats, setStats] = useState({ 
    total: 0, 
    lost: 0, 
    found: 0, 
    resolved: 0 
  });
  const [recentItems, setRecentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, itemsRes] = await Promise.all([
        api.get('/items/stats/'),
        api.get('/items/')
      ]);
      
      setStats({
        total: statsRes.data?.total || 0,
        lost: statsRes.data?.lost || 0,
        found: statsRes.data?.found || 0,
        resolved: statsRes.data?.resolved || 0
      });
      
      const items = Array.isArray(itemsRes.data) ? itemsRes.data.slice(0, 6) : [];
      setRecentItems(items);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'LOST': return 'Lost';
      case 'FOUND': return 'Found';
      case 'RESOLVED': return 'Resolved';
      default: return status;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'LOST': return 'status-lost';
      case 'FOUND': return 'status-found';
      case 'RESOLVED': return 'status-resolved';
      default: return 'status-default';
    }
  };

  return (
    <div className="home-page">
      {/* Header Section */}
      <section className="page-header">
        <h1>Lost Something? Found Something?</h1>
        <p>
          Vignan University's official lost and found system helps you 
          reunite with your belongings quickly and securely.
        </p>
        <div className="header-actions">
          <Link to="/report-lost" className="btn-primary">
            Report Lost
          </Link>
          <Link to="/report-found" className="btn-secondary">
            Report Found
          </Link>
          <Link to="/items" className="btn-outline">
            Browse All
          </Link>
        </div>
      </section>

      {/* Statistics */}
      <section className="stats-section">
        <div className="stat-card">
          <span className="stat-number">{stats.total}</span>
          <span className="stat-label">Total Items</span>
        </div>
        <div className="stat-card">
          <span className="stat-number stat-lost">{stats.lost}</span>
          <span className="stat-label">Lost</span>
        </div>
        <div className="stat-card">
          <span className="stat-number stat-found">{stats.found}</span>
          <span className="stat-label">Found</span>
        </div>
        <div className="stat-card">
          <span className="stat-number stat-resolved">{stats.resolved}</span>
          <span className="stat-label">Resolved</span>
        </div>
      </section>

      {/* Search */}
      <section className="search-section">
        <input
          type="text"
          placeholder="Search for items, categories, or locations..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && searchTerm.trim()) {
              window.location.href = `/items?search=${encodeURIComponent(searchTerm.trim())}`;
            }
          }}
        />
      </section>

      {/* Recent Items */}
      <section className="items-section">
        <h2>Recently Reported</h2>
        
        {loading ? (
          <p className="loading-text">Loading items...</p>
        ) : recentItems.length === 0 ? (
          <div className="empty-state">
            <p>No items have been reported yet.</p>
          </div>
        ) : (
          <div className="items-grid">
            {recentItems.map(item => (
              <Link to={`/item/${item.id}`} key={item.id} className="item-card">
                <div className="item-header">
                  <h3>{item.title}</h3>
                  <span className={`status-badge ${getStatusColor(item.status)}`}>
                    {getStatusLabel(item.status)}
                  </span>
                </div>
                <p className="item-description">{item.description}</p>
                <div className="item-meta">
                  <span>{item.category}</span>
                  <span>📍 {item.building}</span>
                  <span>📅 {new Date(item.date_reported).toLocaleDateString()}</span>
                </div>
                <div className="item-footer">
                  <span>Reported by: {item.reported_by_username}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Footer Links */}
      <section className="footer-links">
        <div className="link-group">
          <h4>Quick Actions</h4>
          <Link to="/report-lost">Report Lost Item</Link>
          <Link to="/report-found">Report Found Item</Link>
          <Link to="/items">Browse All Items</Link>
        </div>
        <div className="link-group">
          <h4>Help</h4>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact Support</Link>
          <Link to="/guidelines">Guidelines</Link>
        </div>
        <div className="link-group">
          <h4>About</h4>
          <Link to="/about">About This System</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </section>

      <style>{`
        /* ===== PAGE LAYOUT ===== */
        .home-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px 40px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #1a1a1a;
          background: #f8f9fa;
        }

        /* ===== HEADER ===== */
        .page-header {
          background: #1a365d;
          color: white;
          padding: 40px 48px;
          border-radius: 8px;
          margin-bottom: 32px;
        }

        .page-header h1 {
          font-size: 28px;
          font-weight: 600;
          margin: 0 0 8px 0;
          letter-spacing: -0.01em;
        }

        .page-header p {
          font-size: 16px;
          opacity: 0.85;
          margin: 0 0 20px 0;
          max-width: 600px;
          line-height: 1.6;
        }

        .header-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        /* ===== BUTTONS ===== */
        .btn-primary {
          display: inline-block;
          background: #7FFF00;
          color: #1a365d;
          padding: 10px 24px;
          border-radius: 6px;
          font-weight: 500;
          font-size: 15px;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .btn-primary:hover {
          background: #6ee600;
        }

        .btn-secondary {
          display: inline-block;
          background: transparent;
          color: white;
          padding: 10px 24px;
          border-radius: 6px;
          font-weight: 500;
          font-size: 15px;
          text-decoration: none;
          border: 1px solid rgba(255, 255, 255, 0.4);
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.6);
        }

        .btn-outline {
          display: inline-block;
          background: transparent;
          color: white;
          padding: 10px 24px;
          border-radius: 6px;
          font-weight: 500;
          font-size: 15px;
          text-decoration: none;
          border: 1px solid rgba(255, 255, 255, 0.2);
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .btn-outline:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.4);
        }

        /* ===== STATISTICS ===== */
        .stats-section {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: white;
          padding: 20px 24px;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
          display: flex;
          flex-direction: column;
          border: 1px solid #eaeef2;
        }

        .stat-number {
          font-size: 32px;
          font-weight: 600;
          color: #1a365d;
          line-height: 1.2;
        }

        .stat-number.stat-lost { color: #dc2626; }
        .stat-number.stat-found { color: #16a34a; }
        .stat-number.stat-resolved { color: #2563eb; }

        .stat-label {
          font-size: 14px;
          color: #6b7280;
          margin-top: 4px;
        }

        /* ===== SEARCH ===== */
        .search-section {
          margin-bottom: 32px;
        }

        .search-input {
          width: 100%;
          padding: 12px 16px;
          font-size: 15px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          background: white;
          outline: none;
          transition: border-color 0.15s ease;
          box-sizing: border-box;
        }

        .search-input:focus {
          border-color: #7FFF00;
          box-shadow: 0 0 0 3px rgba(127, 255, 0, 0.15);
        }

        .search-input::placeholder {
          color: #9ca3af;
        }

        /* ===== ITEMS SECTION ===== */
        .items-section h2 {
          font-size: 20px;
          font-weight: 600;
          color: #1a365d;
          margin: 0 0 16px 0;
        }

        .items-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .item-card {
          background: white;
          border-radius: 8px;
          padding: 20px;
          text-decoration: none;
          color: inherit;
          border: 1px solid #eaeef2;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
          display: block;
        }

        .item-card:hover {
          border-color: #7FFF00;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }

        .item-header h3 {
          font-size: 16px;
          font-weight: 600;
          margin: 0;
          color: #1a365d;
          flex: 1;
          margin-right: 12px;
          line-height: 1.4;
        }

        .status-badge {
          font-size: 12px;
          font-weight: 500;
          padding: 3px 10px;
          border-radius: 20px;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .status-lost {
          background: #fee2e2;
          color: #991b1b;
        }

        .status-found {
          background: #dcfce7;
          color: #166534;
        }

        .status-resolved {
          background: #dbeafe;
          color: #1e40af;
        }

        .status-default {
          background: #f3f4f6;
          color: #4b5563;
        }

        .item-description {
          font-size: 14px;
          color: #4b5563;
          line-height: 1.5;
          margin: 0 0 12px 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .item-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          font-size: 13px;
          color: #6b7280;
          padding: 10px 0;
          border-top: 1px solid #f3f4f6;
          border-bottom: 1px solid #f3f4f6;
          margin-bottom: 10px;
        }

        .item-footer {
          font-size: 13px;
          color: #9ca3af;
        }

        /* ===== EMPTY STATE ===== */
        .empty-state {
          background: white;
          padding: 48px;
          border-radius: 8px;
          text-align: center;
          border: 1px solid #eaeef2;
          color: #6b7280;
        }

        .loading-text {
          color: #6b7280;
          padding: 24px 0;
        }

        /* ===== FOOTER LINKS ===== */
        .footer-links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          margin-top: 48px;
          padding-top: 32px;
          border-top: 1px solid #eaeef2;
        }

        .link-group h4 {
          font-size: 14px;
          font-weight: 600;
          color: #1a365d;
          margin: 0 0 12px 0;
        }

        .link-group a {
          display: block;
          font-size: 14px;
          color: #6b7280;
          text-decoration: none;
          padding: 4px 0;
          transition: color 0.15s ease;
        }

        .link-group a:hover {
          color: #1a365d;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
          .stats-section {
            grid-template-columns: repeat(2, 1fr);
          }

          .items-grid {
            grid-template-columns: 1fr;
          }

          .footer-links {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .page-header {
            padding: 24px;
          }

          .page-header h1 {
            font-size: 22px;
          }

          .header-actions {
            flex-direction: column;
          }

          .header-actions a {
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .stats-section {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }

          .stat-card {
            padding: 14px 16px;
          }

          .stat-number {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
}