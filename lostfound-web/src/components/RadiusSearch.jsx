import { useState } from 'react';
import api from '../services/api';

export default function RadiusSearch({ onResults }) {
  const [radius, setRadius] = useState(5);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (location) params.append('building', location);
      params.append('radius', radius);
      const res = await api.get(`/items/?${params.toString()}`);
      const results = res.data.results || res.data;
      if (onResults) onResults(results);
    } catch (err) {
      console.error('Radius search failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="radius-search">
      <div className="radius-header">
        <h3>📍 Search Nearby</h3>
        <p>Find items within a specific radius</p>
      </div>

      <div className="radius-form">
        <div className="form-group">
          <label>Location / Building</label>
          <input
            type="text"
            placeholder="e.g., Library, Main Building"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Search Radius: {radius} km</label>
          <input
            type="range"
            min="1"
            max="25"
            value={radius}
            onChange={e => setRadius(parseInt(e.target.value))}
            className="radius-slider"
          />
          <div className="radius-options">
            {[1, 5, 10, 25].map(r => (
              <button
                key={r}
                className={`radius-option ${radius === r ? 'active' : ''}`}
                onClick={() => setRadius(r)}
              >
                {r} km
              </button>
            ))}
          </div>
        </div>

        <button
          className="btn-primary"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? 'Searching...' : '🔍 Search'}
        </button>
      </div>

      <style>{`
        .radius-search {
          background: white;
          padding: 24px;
          border-radius: 12px;
          border: 1px solid #eaeef2;
        }
        .radius-header {
          text-align: center;
          margin-bottom: 20px;
        }
        .radius-header h3 {
          font-size: 18px;
          color: #1a365d;
          margin: 0 0 4px;
        }
        .radius-header p {
          font-size: 13px;
          color: #6b7280;
          margin: 0;
        }
        .radius-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-group label {
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }
        .form-group input[type="text"] {
          padding: 10px 14px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
        }
        .form-group input[type="text"]:focus {
          outline: none;
          border-color: #7FFF00;
        }
        .radius-slider {
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: #eaeef2;
          outline: none;
          -webkit-appearance: none;
        }
        .radius-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #7FFF00;
          cursor: pointer;
        }
        .radius-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #7FFF00;
          cursor: pointer;
          border: none;
        }
        .radius-options {
          display: flex;
          gap: 8px;
        }
        .radius-option {
          flex: 1;
          padding: 8px;
          background: white;
          border: 1px solid #eaeef2;
          border-radius: 6px;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .radius-option:hover {
          border-color: #7FFF00;
        }
        .radius-option.active {
          background: #7FFF00;
          color: #1a365d;
          border-color: #7FFF00;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}