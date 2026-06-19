import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import MatchCard from '../components/MatchCard';
import AnonymousChat from '../components/AnonymousChat';
import OwnershipVerification from '../components/OwnershipVerification';
import QRGenerator from '../components/QRGenerator';

export default function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    loadItem();
    loadMatches();
  }, [id]);

  const loadItem = async () => {
    try {
      const res = await api.get(`/items/${id}/`);
      setItem(res.data);
    } catch (err) {
      console.error('Failed to load item:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMatches = async () => {
    try {
      const res = await api.post('/matches/find_matches/', { item_id: id });
      setMatches(res.data.matches || []);
    } catch (err) {
      console.error('Failed to load matches:', err);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
        <p>Loading item details...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="error-container">
        <h2>Item not found</h2>
        <Link to="/items" className="btn-primary">Back to Items</Link>
      </div>
    );
  }

  return (
    <div className="item-detail-page">
      <div className="item-container">
        {/* Item Header */}
        <div className="item-header">
          <div className="item-icon">
            {item.status === 'LOST' ? '❌' : item.status === 'FOUND' ? '✅' : '🎉'}
          </div>
          <div className="item-title-section">
            <h1>{item.title}</h1>
            <div className="item-meta">
              <span className="status-badge" style={{
                background: item.status === 'LOST' ? '#fef3c7' : item.status === 'FOUND' ? '#dcfce7' : '#dbeafe',
                color: item.status === 'LOST' ? '#92400e' : item.status === 'FOUND' ? '#166534' : '#1e40af'
              }}>
                {item.status}
              </span>
              <span className="urgency-badge" style={{
                background: item.urgency === 'HIGH' ? '#fee2e2' : item.urgency === 'MEDIUM' ? '#fef3c7' : '#dcfce7',
                color: item.urgency === 'HIGH' ? '#991b1b' : item.urgency === 'MEDIUM' ? '#92400e' : '#166534'
              }}>
                {item.urgency} Priority
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            📋 Details
          </button>
          {matches.length > 0 && (
            <button
              className={`tab ${activeTab === 'matches' ? 'active' : ''}`}
              onClick={() => setActiveTab('matches')}
            >
              🎯 Matches ({matches.length})
            </button>
          )}
          <button
            className={`tab ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            💬 Chat
          </button>
          <button
            className={`tab ${activeTab === 'verify' ? 'active' : ''}`}
            onClick={() => setActiveTab('verify')}
          >
            🔐 Verify
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'details' && (
            <div className="details-tab">
              <div className="detail-section">
                <h3>📝 Description</h3>
                <p>{item.description || 'No description provided'}</p>
              </div>

              <div className="detail-section">
                <h3>📍 Location</h3>
                <p>{item.building}</p>
                {item.room && <p>Room: {item.room}</p>}
              </div>

              <div className="detail-section">
                <h3>📅 Date & Time</h3>
                <p>{new Date(item.date_occurred).toLocaleString()}</p>
                <p className="reported-date">
                  Reported: {new Date(item.date_reported).toLocaleDateString()}
                </p>
              </div>

              {item.color && (
                <div className="detail-section">
                  <h3>🎨 Color</h3>
                  <p>{item.color}</p>
                </div>
              )}

              {item.brand && (
                <div className="detail-section">
                  <h3>🏷️ Brand</h3>
                  <p>{item.brand}</p>
                </div>
              )}

              <div className="detail-section">
                <h3>📂 Category</h3>
                <span className="category-tag">{item.category}</span>
              </div>

              <div className="action-buttons">
                <QRGenerator itemId={item.id} itemTitle={item.title} />
                <Link to="/items" className="btn-secondary">← Back to Items</Link>
              </div>
            </div>
          )}

          {activeTab === 'matches' && (
            <div className="matches-tab">
              <h3>🎯 Potential Matches</h3>
              {matches.length === 0 ? (
                <div className="no-matches">
                  <p>No matches found yet</p>
                  <p className="hint">We'll notify you when we find potential matches</p>
                </div>
              ) : (
                <div className="matches-list">
                  {matches.map(match => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="chat-tab">
              <AnonymousChat matchId={id} userId="current-user" />
            </div>
          )}

          {activeTab === 'verify' && (
            <div className="verify-tab">
              <OwnershipVerification item={item} onVerify={(answers) => {
                console.log('Verification answers:', answers);
                alert('Verification submitted!');
              }} />
            </div>
          )}
        </div>
      </div>

      <style>{`
        .item-detail-page {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 16px 40px;
        }
        .loading-container, .error-container {
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
        .error-container h2 {
          color: #1a365d;
          margin: 0 0 16px;
        }
        .item-container {
          background: white;
          border-radius: 12px;
          border: 1px solid #eaeef2;
          overflow: hidden;
        }
        .item-header {
          display: flex;
          gap: 20px;
          padding: 24px;
          background: linear-gradient(135deg, #1a365d, #2d5a8e);
          color: white;
        }
        .item-icon {
          font-size: 48px;
        }
        .item-title-section {
          flex: 1;
        }
        .item-title-section h1 {
          margin: 0 0 12px;
          font-size: 28px;
        }
        .item-meta {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .status-badge, .urgency-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }
        .tabs {
          display: flex;
          border-bottom: 1px solid #eaeef2;
        }
        .tab {
          flex: 1;
          padding: 14px;
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
          transition: all 0.2s ease;
          border-bottom: 2px solid transparent;
        }
        .tab:hover {
          color: #1a365d;
          background: #f8f9fa;
        }
        .tab.active {
          color: #7FFF00;
          border-bottom-color: #7FFF00;
        }
        .tab-content {
          padding: 24px;
        }
        .detail-section {
          margin-bottom: 24px;
        }
        .detail-section h3 {
          font-size: 14px;
          color: #6b7280;
          margin: 0 0 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .detail-section p {
          margin: 0;
          color: #1a365d;
          font-size: 15px;
        }
        .reported-date {
          font-size: 13px;
          color: #9ca3af;
          margin-top: 4px;
        }
        .category-tag {
          display: inline-block;
          padding: 6px 12px;
          background: #f0fdf4;
          color: #166534;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
        }
        .action-buttons {
          display: flex;
          gap: 12px;
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid #eaeef2;
        }
        .no-matches, .matches-list {
          text-align: center;
          padding: 40px;
        }
        .no-matches p {
          margin: 0;
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
          gap: 16px;
          text-align: left;
        }
        @media (max-width: 600px) {
          .item-header {
            flex-direction: column;
            text-align: center;
          }
          .tabs {
            flex-wrap: wrap;
          }
          .tab {
            flex: 1 1 50%;
          }
        }
      `}</style>
    </div>
  );
}