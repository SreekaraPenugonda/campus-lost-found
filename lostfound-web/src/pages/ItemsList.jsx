import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import SmartSearch from '../components/SmartSearch';
import VisualSearch from '../components/VisualSearch';
import CampusMap from '../components/CampusMap';
import MatchCard from '../components/MatchCard';

export default function ItemsList() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list'); // 'list' or 'map'

  useEffect(() => {
    loadItems();
  }, [filter, category]);

  const loadItems = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter !== 'ALL') params.append('status', filter);
      if (category) params.append('category', category);
      const res = await api.get(`/items/?${params.toString()}`);
      setItems(res.data.results || res.data);
    } catch (err) {
      console.error('Failed to load items:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchResults = (results) => {
    setItems(results);
  };

  const handleCategorySelect = (cat) => {
    setCategory(cat);
    setView('list');
  };

  return (
    <div className="items-list-page">
      <div className="page-header">
        <h1>📋 Browse Items</h1>
        <p>Find lost or found items on campus</p>
      </div>

      {/* Search */}
      <section className="search-section">
        <SmartSearch onResults={handleSearchResults} />
      </section>

      {/* Filters */}
      <div className="filters-bar">
        <div className="filter-buttons">
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
          <button
            className={`filter-btn ${filter === 'RESOLVED' ? 'active' : ''}`}
            onClick={() => setFilter('RESOLVED')}
          >
            🎉 Resolved
          </button>
        </div>

        <div className="view-toggle">
          <button
            className={`view-btn ${view === 'list' ? 'active' : ''}`}
            onClick={() => setView('list')}
          >
            📋 List
          </button>
          <button
            className={`view-btn ${view === 'map' ? 'active' : ''}`}
            onClick={() => setView('map')}
          >
            🗺️ Map
          </button>
        </div>
      </div>

      {/* Category Filter */}
      {category && (
        <div className="active-category">
          <span>Category: <strong>{category}</strong></span>
          <button onClick={() => setCategory('')}>Clear</button>
        </div>
      )}

      {/* Content */}
      {view === 'list' ? (
        <div className="items-grid">
          {loading ? (
            <div className="loading">Loading items...</div>
          ) : items.length === 0 ? (
            <div className="empty">
              <p>No items found</p>
              <p className="hint">Try adjusting your filters</p>
            </div>
          ) : (
            items.map(item => (
              <Link key={item.id} to={`/items/${item.id}`} className="item-card">
                <div className="item-header">
                  <span className="item-status">
                    {item.status === 'LOST' ? '❌' : item.status === 'FOUND' ? '✅' : '🎉'}
                  </span>
                  <span className="item-urgency" style={{
                    background: item.urgency === 'HIGH' ? '#fee2e2' : item.urgency === 'MEDIUM' ? '#fef3c7' : '#dcfce7',
                    color: item.urgency === 'HIGH' ? '#991b1b' : item.urgency === 'MEDIUM' ? '#92400e' : '#166534'
                  }}>
                    {item.urgency}
                  </span>
                </div>
                <h3>{item.title}</h3>
                <p className="item-category">{item.category}</p>
                <p className="item-location">📍 {item.building}</p>
                <p className="item-date">
                  {new Date(item.date_reported).toLocaleDateString()}
                </p>
              </Link>
            ))
          )}
        </div>
      ) : (
        <CampusMap />
      )}

      <style>{`
        .items-list-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px 40px;
        }
        .page-header {
          text-align: center;
          margin-bottom: 32px;
        }
        .page-header h1 {
          font-size: 32px;
          color: #1a365d;
          margin: 0 0 6px;
        }
        .page-header p {
          color: #6b7280;
          margin: 0;
        }
        .search-section {
          margin-bottom: 24px;
        }
        .filters-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .filter-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .filter-btn {
          padding: 8px 16px;
          background: white;
          border: 1px solid #eaeef2;
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
        .view-toggle {
          display: flex;
          gap: 8px;
        }
        .view-btn {
          padding: 8px 16px;
          background: white;
          border: 1px solid #eaeef2;
          border-radius: 8px;
          cursor: pointer;
          font-size: 13px;
          color: #6b7280;
          transition: all 0.2s ease;
        }
        .view-btn:hover {
          border-color: #7FFF00;
        }
        .view-btn.active {
          background: #7FFF00;
          color: #1a365d;
          border-color: #7FFF00;
        }
        .active-category {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: #f0fdf4;
          border-radius: 8px;
          margin-bottom: 20px;
          color: #166534;
        }
        .active-category button {
          margin-left: auto;
          padding: 4px 12px;
          background: white;
          border: 1px solid #eaeef2;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
        }
        .items-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }
        .item-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #eaeef2;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .item-card:hover {
          border-color: #7FFF00;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .item-status {
          font-size: 24px;
        }
        .item-urgency {
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
        }
        .item-card h3 {
          margin: 0 0 8px;
          color: #1a365d;
          font-size: 16px;
        }
        .item-category {
          display: inline-block;
          padding: 4px 10px;
          background: #f0fdf4;
          color: #166534;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .item-location {
          font-size: 13px;
          color: #6b7280;
          margin: 0 0 4px;
        }
        .item-date {
          font-size: 12px;
          color: #9ca3af;
          margin: 0;
        }
        .loading, .empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px;
          color: #6b7280;
        }
        .empty .hint {
          font-size: 13px;
          color: #9ca3af;
          margin-top: 4px;
        }
        @media (max-width: 768px) {
          .filters-bar {
            flex-direction: column;
            align-items: stretch;
          }
          .filter-buttons {
            justify-content: center;
          }
          .view-toggle {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}