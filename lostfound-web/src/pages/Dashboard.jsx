import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import MatchCard from '../components/MatchCard';

export default function Dashboard() {
  const [myItems, setMyItems] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [itemsRes, matchesRes] = await Promise.all([
        api.get('/items/'),
        api.get('/matches/my_matches/')
      ]);
      setMyItems(itemsRes.data.results || itemsRes.data);
      setMatches(matchesRes.data || []);
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const lostItems = myItems.filter(item => item.status === 'LOST');
  const foundItems = myItems.filter(item => item.status === 'FOUND');

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>📊 Dashboard</h1>
        <p>Track your reports and matches</p>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <Link to="/report-lost" className="action-card lost">
          <span className="action-icon">❌</span>
          <div>
            <h3>Report Lost</h3>
            <p>Post in 30 seconds</p>
          </div>
        </Link>
        <Link to="/report-found" className="action-card found">
          <span className="action-icon">✅</span>
          <div>
            <h3>Report Found</h3>
            <p>Help someone</p>
          </div>
        </Link>
        <Link to="/recovery" className="action-card stats">
          <span className="action-icon">📊</span>
          <div>
            <h3>Recovery Stats</h3>
            <p>View analytics</p>
          </div>
        </Link>
      </div>

      {/* Stats */}
      <div className="stats-section">
        <div className="stat-box">
          <span className="stat-value">{lostItems.length}</span>
          <span className="stat-label">Lost Items</span>
        </div>
        <div className="stat-box">
          <span className="stat-value">{foundItems.length}</span>
          <span className="stat-label">Found Items</span>
        </div>
        <div className="stat-box">
          <span className="stat-value">{matches.length}</span>
          <span className="stat-label">Matches</span>
        </div>
      </div>

      {/* Recent Matches */}
      {matches.length > 0 && (
        <div className="matches-section">
          <h2>🎯 Your Matches</h2>
          <div className="matches-list">
            {matches.slice(0, 5).map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      )}

      {/* Recent Items */}
      <div className="items-section">
        <h2>📋 Your Recent Reports</h2>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : myItems.length === 0 ? (
          <div className="empty">
            <p>No reports yet</p>
            <Link to="/report-lost" className="btn-primary">Report Your First Item</Link>
          </div>
        ) : (
          <div className="items-list">
            {myItems.slice(0, 5).map(item => (
              <Link key={item.id} to={`/items/${item.id}`} className="item-row">
                <span className="item-icon">
                  {item.status === 'LOST' ? '❌' : '✅'}
                </span>
                <div className="item-info">
                  <h4>{item.title}</h4>
                  <p>📍 {item.building} • {new Date(item.date_reported).toLocaleDateString()}</p>
                </div>
                <span className="item-status" style={{
                  background: item.status === 'LOST' ? '#fef3c7' : '#dcfce7',
                  color: item.status === 'LOST' ? '#92400e' : '#166534'
              }}>
                  {item.status}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .dashboard-page {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 16px 40px;
        }
        .dashboard-header {
          text-align: center;
          margin-bottom: 32px;
        }
        .dashboard-header h1 {
          font-size: 32px;
          color: #1a365d;
          margin: 0 0 6px;
        }
        .dashboard-header p {
          color: #6b7280;
          margin: 0;
        }

        /* Quick Actions */
        .quick-actions {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 32px;
        }
        .action-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: white;
          border: 1px solid #eaeef2;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .action-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
        .action-card.lost { border-left: 4px solid #f59e0b; }
        .action-card.found { border-left: 4px solid #16a34a; }
        .action-card.stats { border-left: 4px solid #7FFF00; }
        .action-icon {
          font-size: 32px;
        }
        .action-card h3 {
          margin: 0 0 4px;
          color: #1a365d;
          font-size: 16px;
        }
        .action-card p {
          margin: 0;
          font-size: 13px;
          color: #6b7280;
        }

        /* Stats */
        .stats-section {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 32px;
        }
        .stat-box {
          background: white;
          padding: 24px;
          border-radius: 12px;
          border: 1px solid #eaeef2;
          text-align: center;
        }
        .stat-value {
          display: block;
          font-size: 36px;
          font-weight: 700;
          color: #1a365d;
          margin-bottom: 4px;
        }
        .stat-label {
          font-size: 13px;
          color: #6b7280;
        }

        /* Sections */
        .matches-section, .items-section {
          background: white;
          padding: 24px;
          border-radius: 12px;
          border: 1px solid #eaeef2;
          margin-bottom: 24px;
        }
        .matches-section h2, .items-section h2 {
          font-size: 20px;
          color: #1a365d;
          margin: 0 0 16px;
        }
        .loading, .empty {
          text-align: center;
          padding: 40px;
          color: #6b7280;
        }
        .empty .btn-primary {
          margin-top: 16px;
        }
        .items-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .item-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: #f8f9fa;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .item-row:hover {
          background: white;
          border: 1px solid #7FFF00;
        }
        .item-row .item-icon {
          font-size: 24px;
        }
        .item-info {
          flex: 1;
        }
        .item-info h4 {
          margin: 0 0 4px;
          color: #1a365d;
          font-size: 14px;
        }
        .item-info p {
          margin: 0;
          font-size: 12px;
          color: #6b7280;
        }
        .item-status {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .quick-actions {
            grid-template-columns: 1fr;
          }
          .stats-section {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}