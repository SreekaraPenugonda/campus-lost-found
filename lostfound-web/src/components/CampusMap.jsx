export default function CampusMap({ items }) {
  // In production, integrate with Google Maps or Leaflet
  return (
    <div className="map-container">
      <div className="map-placeholder">
        <div className="map-icon">🗺️</div>
        <h3>Interactive Campus Map</h3>
        <p>View lost and found items on campus</p>
        
        <div className="map-items">
          {items && items.slice(0, 5).map(item => (
            <div key={item.id} className="map-item">
              <span className={`marker ${item.status === 'LOST' ? 'lost' : 'found'}`}>📍</span>
              <div>
                <strong>{item.title}</strong>
                <span className="map-location">{item.building}</span>
              </div>
            </div>
          ))}
        </div>

        <button className="btn-primary">View Full Map</button>
      </div>

      <style>{`
        .map-container {
          background: white;
          border-radius: 8px;
          border: 1px solid #eaeef2;
          overflow: hidden;
        }

        .map-placeholder {
          padding: 40px;
          text-align: center;
          background: #f8f9fa;
        }

        .map-icon {
          font-size: 48px;
          margin-bottom: 12px;
        }

        .map-placeholder h3 {
          font-size: 18px;
          font-weight: 600;
          color: #1a365d;
          margin: 0 0 4px 0;
        }

        .map-placeholder p {
          color: #6b7280;
          margin: 0 0 20px 0;
        }

        .map-items {
          text-align: left;
          max-width: 400px;
          margin: 0 auto 20px auto;
        }

        .map-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          border-bottom: 1px solid #eaeef2;
        }

        .map-item:last-child {
          border-bottom: none;
        }

        .marker {
          font-size: 20px;
        }

        .map-item strong {
          display: block;
          font-size: 14px;
          color: #1a365d;
        }

        .map-location {
          font-size: 13px;
          color: #6b7280;
        }
      `}</style>
    </div>
  );
}