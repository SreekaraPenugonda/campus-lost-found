import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await api.get('/profile/');
      setUser(res.data);
    } catch (err) {
      console.error('Failed to load profile:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="avatar">
            {user?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="profile-info">
            <h1>{user?.username || 'User'}</h1>
            <p>{user?.email || 'No email'}</p>
          </div>
        </div>

        <div className="profile-stats">
          <div className="profile-stat">
            <span className="stat-value">12</span>
            <span className="stat-label">Items Reported</span>
          </div>
          <div className="profile-stat">
            <span className="stat-value">3</span>
            <span className="stat-label">Matches</span>
          </div>
          <div className="profile-stat">
            <span className="stat-value">2</span>
            <span className="stat-label">Recovered</span>
          </div>
        </div>

        <div className="profile-actions">
          <Link to="/settings" className="btn-secondary">⚙️ Settings</Link>
          <Link to="/dashboard" className="btn-secondary">📊 Dashboard</Link>
          <Link to="/recovery" className="btn-secondary">📈 Recovery Stats</Link>
        </div>
      </div>

      <style>{`
        .profile-page {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 16px;
        }
        .loading-container {
          text-align: center;
          padding: 60px;
        }
        .loading-spinner {
          width: 48px;
          height: 48px;
          border: 4px solid #eaeef2;
          border-top-color: #7FFF00;
          border-radius: 50%;
          margin: 0 auto 16px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .profile-container {
          background: white;
          border-radius: 12px;
          border: 1px solid #eaeef2;
          overflow: hidden;
        }
        .profile-header {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 32px;
          background: linear-gradient(135deg, #1a365d, #2d5a8e);
          color: white;
        }
        .avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #7FFF00;
          color: #1a365d;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          font-weight: 700;
        }
        .profile-info h1 {
          margin: 0 0 8px;
          font-size: 28px;
        }
        .profile-info p {
          margin: 0;
          opacity: 0.9;
        }
        .profile-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          padding: 24px;
          border-bottom: 1px solid #eaeef2;
        }
        .profile-stat {
          text-align: center;
        }
        .stat-value {
          display: block;
          font-size: 32px;
          font-weight: 700;
          color: #1a365d;
          margin-bottom: 4px;
        }
        .stat-label {
          font-size: 13px;
          color: #6b7280;
        }
        .profile-actions {
          display: flex;
          gap: 12px;
          padding: 24px;
          flex-wrap: wrap;
        }
        .btn-secondary {
          padding: 10px 20px;
          background: white;
          color: #1a365d;
          border: 1px solid #eaeef2;
          border-radius: 6px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        .btn-secondary:hover {
          border-color: #7FFF00;
          background: #f0fdf4;
        }
        @media (max-width: 600px) {
          .profile-stats {
            grid-template-columns: 1fr;
          }
          .profile-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}