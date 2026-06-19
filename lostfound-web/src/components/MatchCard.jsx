import { useState } from 'react';
import api from '../services/api';

export default function MatchCard({ match, onContact }) {
  const [showContact, setShowContact] = useState(false);
  const [contacting, setContacting] = useState(false);

  const scoreColor = match.match_score >= 80 ? '#16a34a' : match.match_score >= 60 ? '#f59e0b' : '#ef4444';
  const scoreBg = match.match_score >= 80 ? '#dcfce7' : match.match_score >= 60 ? '#fef3c7' : '#fee2e2';

  const handleContact = async () => {
    setContacting(true);
    try {
      await api.post(`/matches/${match.id}/mark_contacted/`);
      setShowContact(true);
      if (onContact) onContact(match);
    } catch (err) {
      console.error('Failed to mark contacted:', err);
    } finally {
      setContacting(false);
    }
  };

  const lostItem = match.lost_item;
  const foundItem = match.found_item;

  return (
    <div className="match-card">
      <div className="match-header">
        <div className="match-score" style={{ background: scoreBg, color: scoreColor }}>
          {match.match_score}% Match
        </div>
        <span className="match-date">
          {new Date(match.created_at).toLocaleDateString()}
        </span>
      </div>

      <div className="match-items">
        <div className="match-item lost">
          <div className="item-icon">❌</div>
          <div className="item-info">
            <h4>Lost</h4>
            <p className="item-title">{lostItem.title}</p>
            <p className="item-location">📍 {lostItem.building}</p>
            <p className="item-date">{new Date(lostItem.date_occurred).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="match-arrow">→</div>

        <div className="match-item found">
          <div className="item-icon">✅</div>
          <div className="item-info">
            <h4>Found</h4>
            <p className="item-title">{foundItem.title}</p>
            <p className="item-location">📍 {foundItem.building}</p>
            <p className="item-date">{new Date(foundItem.date_occurred).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {!showContact ? (
        <button
          className="btn-primary btn-contact"
          onClick={handleContact}
          disabled={contacting}
        >
          {contacting ? 'Processing...' : '🔒 Contact Finder Securely'}
        </button>
      ) : (
        <div className="contact-success">
          <p>✅ Contact request sent!</p>
          <p className="contact-hint">You'll be connected via secure chat</p>
        </div>
      )}

      <style>{`
        .match-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          border: 1px solid #eaeef2;
          margin-bottom: 16px;
          transition: all 0.2s ease;
        }
        .match-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border-color: #7FFF00;
        }
        .match-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .match-score {
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 700;
        }
        .match-date {
          font-size: 12px;
          color: #9ca3af;
        }
        .match-items {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .match-item {
          flex: 1;
          display: flex;
          gap: 12px;
          padding: 12px;
          background: #f8f9fa;
          border-radius: 8px;
        }
        .match-item.lost {
          border-left: 3px solid #f59e0b;
        }
        .match-item.found {
          border-left: 3px solid #16a34a;
        }
        .item-icon {
          font-size: 24px;
        }
        .item-info {
          flex: 1;
        }
        .item-info h4 {
          font-size: 12px;
          color: #6b7280;
          margin: 0 0 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .item-title {
          font-size: 14px;
          font-weight: 600;
          color: #1a365d;
          margin: 0 0 4px;
        }
        .item-location {
          font-size: 12px;
          color: #6b7280;
          margin: 0 0 2px;
        }
        .item-date {
          font-size: 11px;
          color: #9ca3af;
          margin: 0;
        }
        .match-arrow {
          font-size: 20px;
          color: #7FFF00;
          font-weight: bold;
        }
        .btn-contact {
          width: 100%;
          padding: 12px;
          font-size: 14px;
          font-weight: 600;
        }
        .contact-success {
          text-align: center;
          padding: 12px;
          background: #dcfce7;
          border-radius: 8px;
          color: #166534;
        }
        .contact-success p {
          margin: 0;
        }
        .contact-hint {
          font-size: 12px;
          color: #16a34a;
          margin-top: 4px;
        }
        @media (max-width: 600px) {
          .match-items {
            flex-direction: column;
          }
          .match-arrow {
            transform: rotate(90deg);
          }
        }
      `}</style>
    </div>
  );
}