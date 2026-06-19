import { useState, useEffect } from 'react';
import api from '../services/api';

export default function CampusMap() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, [filter]);

  const loadItems = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter !== 'ALL') params.append('status', filter);
      const res = await api.get(`/items/?${params.toString()}`);
      setItems(res.data.results || res.data);
    } catch (err) {
      console.error('Failed to load items:', err);
    } finally {
      setLoading(false);
    }
  };

  const getMarkerIcon = (status) => {
    switch (status) {
      case 'LOST': return '❌';
      case 'FOUND': return '✅';
      case 'RESOLVED': return '🎉';
      default: return '📍';
    }
  };

  const getMarkerColor = (status) => {
    switch (status) {
      case 'LOST': return '#f59e0b';
      case 'FOUND': return '#16a34a';
      case 'RESOLVED': return '#7FFF00';
      default: return '#1a365d';
    }
  };

  // Group items by building
  const groupedItems = items.reduce((acc, item) => {
    const building = item.building || 'Unknown Location';
    if (!acc[building]) acc[building] = [];
    acc[building].push(item);
    return acc;
  }, {});

  return (
    <div className="campus-map">
      <div className="map-header">
        <h2>📍 Campus Map</h2>
        <p>See where items are lost/found</p>
      </div>

      {/* Filters */}
      <div className="map-filters">
        <button
          className={`filter-btn ${filter === 'ALL' ? 'active' : ''}`}
          onClick={() => setFilter('ALL')}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === 'LOST' ? 'active' : ''}`}
          onClick={() => setFilter('LOST')}
        >
          ❌ Lost
        </button>
        <button
          className={`filter-btn ${filter === 'FOUND' ? 'active' : ''}`}
          onClick={() => setFilter('FOUND')}
        >
          ✅ Found
        </button>
      </div>

      <div className="map-content">
        {/* Map Placeholder */}
        <div className="map-visual">
          <div className="map-placeholder">
            <div className="campus-illustration">
              <div className="building main">🏛️ Main Building</div>
              <div className="building library">📚 Library</div>
              <div className="building cafeteria">🍽️ Cafeteria</div>
              <div className="building hostel">🏠 Hostel</div>
              <div className="building lab">🔬 Lab Complex</div>
              <div className="building sports">⚽ Sports Complex</div>
            </div>
          </div>
        </div>

        {/* Items List */}
        <div className="map-items">
          <h3>Recent Reports ({items.length})</h3>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : items.length === 0 ? (
            <div className="empty">No items found</div>
          ) : (
            <div className="items-list">
              {Object.entries(groupedItems).map(([building, buildingItems]) => (
                <div key={building} className="building-group">
                  <h4 className="building-name">📍 {building}</h4>
                  {buildingItems.map(item => (
                    <div
                      key={item.id}
                      className={`map-item ${selectedItem === item.id ? 'selected' : ''}`}
                      onClick={() => setSelectedItem(item.id)}
                    >
                      <span
                        className="item-marker"
                        style={{ background: getMarkerColor(item.status) }}
                      >
                        {getMarkerIcon(item.status)}
                      </span>
                      <div className="item-details">
                        <p className="item-title">{item.title}</p>
                        <p className="item-meta">
                          {item.category} • {new Date(item.date_reported).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .campus-map {
          background: white;
          border-radius: 12px;
          padding: 24px;
          border: 1px solid #eaeef2;
        }
        .map-header {
          text-align: center;
          margin-bottom: 20px;
        }
        .map-header h2 {
          font-size: 24px;
          color: #1a365d;
          margin: 0 0 4px;
        }
        .map-header p {
          color: #6b7280;
          margin: 0;
          font-size: 14px;
        }
        .map-filters {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
          justify-content: center;
        }
        .filter-btn {
          padding: 8px 16px;
          border: 1px solid #eaeef2;
          background: white;
          border-radius: 20px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          color: #6b7280;
          transition: all 0.2s ease;
        }
        .filter-btn:hover {
          border-color: #7FFF00;
          color: #1a365d;
        }
        .filter-btn.active {
          background: #7FFF00;
          color: #1a365d;
          border-color: #7FFF00;
        }
        .map-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .map-visual {
          background: #f0fdf4;
          border-radius: 8px;
          padding: 20px;
          min-height: 400px;
        }
        .map-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .campus-illustration {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          width: 100%;
        }
        .building {
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          font-size: 12px;
          font-weight: 600;
          color: #1a365d;
          background: white;
          border: 2px solid #eaeef2;
          transition: all 0.2s ease;
        }
        .building:hover {
          border-color: #7FFF00;
          transform: scale(1.05);
        }
        .building.main { grid-column: span 2; background: #fef3c7; }
        .building.library { background: #dbeafe; }
        .building.cafeteria { background: #fce7f3; }
        .building.hostel { grid-column: span 2; background: #e0e7ff; }
        .building.lab { background: #d1fae5; }
        .building.sports { grid-column: span 2; background: #fee2e2; }
        .map-items {
          max-height: 500px;
          overflow-y: auto;
        }
        .map-items h3 {
          font-size: 16px;
          color: #1a365d;
          margin: 0 0 12px;
        }
        .building-group {
          margin-bottom: 16px;
        }
        .building-name {
          font-size: 13px;
          color: #6b7280;
          margin: 0 0 8px;
          font-weight: 600;
        }
        .items-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .map-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px;
          background: #f8f9fa;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }
        .map-item:hover {
          background: white;
          border-color: #7FFF00;
        }
        .map-item.selected {
          background: #f0fdf4;
          border-color: #7FFF00;
        }
        .item-marker {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
        }
        .item-details {
          flex: 1;
          min-width: 0;
        }
        .item-title {
          font-size: 13px;
          font-weight: 600;
          color: #1a365d;
          margin: 0 0 2px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .item-meta {
          font-size: 11px;
          color: #9ca3af;
          margin: 0;
        }
        .loading, .empty {
          text-align: center;
          padding: 40px;
          color: #6b7280;
        }
        @media (max-width: 768px) {
          .map-content {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}