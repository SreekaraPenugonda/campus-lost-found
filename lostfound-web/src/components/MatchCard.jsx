import { Link } from 'react-router-dom';

export default function MatchCard({ match }) {
  const { item, score, matchedItem } = match;

  return (
    <div className="match-card">
      <div className="match-header">
        <span className="match-score">{score}% Match</span>
        <span className="match-status">Potential Match</span>
      </div>
      <div className="match-items">
        <div className="match-item">
          <h4>Lost Item</h4>
          <p>{item.title}</p>
          <span className="match-meta">{item.category} • {item.building}</span>
        </div>
        <div className="match-arrow">→</div>
        <div className="match-item">
          <h4>Found Item</h4>
          <p>{matchedItem.title}</p>
          <span className="match-meta">{matchedItem.category} • {matchedItem.building}</span>
        </div>
      </div>
      <div className="match-actions">
        <Link to={`/item/${matchedItem.id}`} className="btn-primary">View Item</Link>
        <button className="btn-secondary">Claim Item</button>
      </div>

      <style>{`
        .match-card {
          background: white;
          border-radius: 8px;
          padding: 20px;
          border: 1px solid #eaeef2;
          margin-bottom: 16px;
        }

        .match-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .match-score {
          font-size: 18px;
          font-weight: 600;
          color: #7FFF00;
        }

        .match-status {
          font-size: 13px;
          color: #6b7280;
          background: #f3f4f6;
          padding: 4px 12px;
          border-radius: 20px;
        }

        .match-items {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 16px;
          align-items: center;
          padding: 12px 0;
          border-top: 1px solid #eaeef2;
          border-bottom: 1px solid #eaeef2;
        }

        .match-item h4 {
          font-size: 13px;
          font-weight: 500;
          color: #6b7280;
          margin: 0 0 4px 0;
        }

        .match-item p {
          font-size: 15px;
          font-weight: 500;
          color: #1a365d;
          margin: 0 0 4px 0;
        }

        .match-meta {
          font-size: 13px;
          color: #6b7280;
        }

        .match-arrow {
          font-size: 24px;
          color: #7FFF00;
        }

        .match-actions {
          display: flex;
          gap: 12px;
          margin-top: 12px;
        }

        @media (max-width: 600px) {
          .match-items {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .match-arrow {
            transform: rotate(90deg);
          }

          .match-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}