import { useState, useEffect } from 'react';
import api from '../services/api';

export default function RecoveryDashboard() {
  const [stats, setStats] = useState({
    itemsLost: 0,
    itemsFound: 0,
    recoveryRate: 0,
    avgTime: '0 hours'
  });
  const [recentMatches, setRecentMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
    loadMatches();
  }, []);

  const loadStats = async () => {
    try {
      const res = await api.get('/items/analytics/');
      const data = res.data;
      setStats({
        itemsLost: data.lost || 0,
        itemsFound: data.found || 0,
        recoveryRate: data.total_reported > 0 ? Math.round((data.resolved || 0) / data.total_reported * 100) : 0,
        avgTime: '4.2 hours'
      });
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  const loadMatches = async () => {
    try {
      const res = await api.get('/matches/my_matches/');
      setRecentMatches(res.data || []);
    } catch (err) {
      console.error('Failed to load matches:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recovery-dashboard">
      <div className="dashboard-header">
        <h2>📊 My Recovery Dashboard</h2>
        <p>Track your lost items and matches</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card lost">
          <span className="stat-icon">❌</span>
          <div className="stat-info">
            <span className="stat-number">{stats.itemsLost}</span>
            <span className="stat-label">Items Lost</span>
          </div>
        </div>
        <div className="stat-card found">
          <span className="stat-icon">✅</span>
          <div className="stat-info">
            <span className="stat-number">{stats.itemsFound}</span>
            <span className="stat-label">Items Found</span>
          </div>
        </div>
        <div className="stat-card rate">
          <span className="stat-icon">🎯</span>
          <div className="stat-info">
            <span className="stat-number">{stats.recoveryRate}%</span>
            <span className="stat-label">Recovery Rate</span>
          </div>
        </div>
        <div className="stat-card time">
          <span className="stat-icon">⏱️</span>
          <div className="stat-info">
            <span className="stat-number">{stats.avgTime}</span>
            <span className="stat-label">Avg Recovery</span>
          </div>
        </div>
      </div>

      {/* Recent Matches */}
      <div className="matches-section">
        <h3>🎯 Your Recent Matches</h3>
        {loading ? (
          <div className="loading">Loading matches...</div>
        ) : recentMatches.length === 0 ? (
          <div className="no-matches">
            <p>No matches yet</p>
            <p className="hint">We'll notify you when we find potential matches</p>
          </div>
        ) : (
          <div className="matches-list">
            {recentMatches.map(match => (
              <div key={match.id} className="match-item">
                <div className="match-score-badge" style={{
                  background: match.match_score >= 80 ? '#dcfce7' : '#fef3c7',
                  color: match.match_score >= 80 ? '#16a34a' : '#f59e0b'
                }}>
                  {match.match_score}%
                </div>
                <div className="match-details">
                  <p className="match-title">
                    {match.lost_item.title} → {match.found_item.title}
                  </p>
                  <p className="match-location">
                    📍 {match.lost_item.building} → {match.found_item.building}
                  </p>
                </div>
                <span className="match-date">
                  {new Date(match.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .recovery-dashboard {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 16px 40px;
        }
        .dashboard-header {
          text-align: center;
          margin-bottom: 32px;
        }
        .dashboard-header h2 {
          font-size: 28px;
          color: #1a365d;
          margin: 0 0 6px;
        }
        .dashboard-header p {
          color: #6b7280;
          margin: 0;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 32px;
        }
        .stat-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #eaeef2;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .stat-card.lost { border-left: 4px solid #f59e0b; }
        .stat-card.found { border-left: 4px solid #16a34a; }
        .stat-card.rate { border-left: 4px solid #7FFF00; }
        .stat-card.time { border-left: 4px solid #2563eb; }
        .stat-icon {
          font-size: 32px;
        }
        .stat-info {
          display: flex;
          flex-direction: column;
        }
        .stat-number {
          font-size: 24px;
          font-weight: 700;
          color: #1a365d;
        }
        .stat-label {
          font-size: 12px;
          color: #6b7280;
        }
        .matches-section {
          background: white;
          padding: 24px;
          border-radius: 12px;
          border: 1px solid #eaeef2;
        }
        .matches-section h3 {
          font-size: 18px;
          color: #1a365d;
          margin: 0 0 16px;
        }
        .loading, .no-matches {
          text-align: center;
          padding: 40px;
          color: #6b7280;
        }
        .no-matches .hint {
          font-size: 13px;
          color: #9ca3af;
          margin-top: 4px;
        }
        .matches-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .match-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: #f8f9fa;
          border-radius: 8px;
        }
        .match-score-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 700;
        }
        .match-details {
          flex: 1;
        }
        .match-title {
          font-size: 14px;
          font-weight: 600;
          color: #1a365d;
          margin: 0 0 4px;
        }
        .match-location {
          font-size: 12px;
          color: #6b7280;
          margin: 0;
        }
        .match-date {
          font-size: 11px;
          color: #9ca3af;
        }
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}