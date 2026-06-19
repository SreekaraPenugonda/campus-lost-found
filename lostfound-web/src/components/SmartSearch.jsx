import { useState, useEffect } from 'react';
import api from '../services/api';

export default function SmartSearch({ onResults, placeholder = "Search items..." }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      searchItems();
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const searchItems = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/items/?search=${encodeURIComponent(query)}`);
      const results = res.data.results || res.data;
      setSuggestions(results.slice(0, 5));
      if (onResults) onResults(results);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    if (query.trim()) {
      searchItems();
    }
  };

  const quickFilters = [
    { label: '📱 Electronics', category: 'ELECTRONICS' },
    { label: '📚 Books', category: 'BOOKS' },
    { label: '🪪 ID Cards', category: 'ID_CARDS' },
    { label: '🎒 Bags', category: 'BAGS' },
    { label: '🔑 Keys', category: 'KEYS' }
  ];

  return (
    <div className="smart-search">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          {loading && <span className="search-loading">...</span>}
        </div>
        <button type="submit" className="search-btn">Search</button>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map(item => (
            <div
              key={item.id}
              className="suggestion-item"
              onClick={() => {
                setQuery(item.title);
                setShowSuggestions(false);
                if (onResults) onResults([item]);
              }}
            >
              <span className="suggestion-icon">
                {item.status === 'LOST' ? '❌' : '✅'}
              </span>
              <div className="suggestion-info">
                <p className="suggestion-title">{item.title}</p>
                <p className="suggestion-meta">
                  {item.category} • 📍 {item.building}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Filters */}
      <div className="quick-filters">
        {quickFilters.map(filter => (
          <button
            key={filter.category}
            className="filter-chip"
            onClick={() => {
              setQuery(filter.label);
              if (onResults) {
                api.get(`/items/?category=${filter.category}`)
                  .then(res => onResults(res.data.results || res.data))
                  .catch(console.error);
              }
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <style>{`
        .smart-search {
          position: relative;
          max-width: 700px;
          margin: 0 auto;
        }
        .search-form {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
        }
        .search-input-wrapper {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
        }
        .search-icon {
          position: absolute;
          left: 14px;
          font-size: 18px;
          z-index: 1;
        }
        .search-input-wrapper input {
          width: 100%;
          padding: 14px 14px 14px 44px;
          border: 2px solid #eaeef2;
          border-radius: 8px;
          font-size: 15px;
          transition: all 0.2s ease;
        }
        .search-input-wrapper input:focus {
          outline: none;
          border-color: #7FFF00;
          box-shadow: 0 0 0 3px rgba(127, 255, 0, 0.1);
        }
        .search-loading {
          position: absolute;
          right: 14px;
          color: #9ca3af;
          font-size: 14px;
        }
        .search-btn {
          padding: 14px 28px;
          background: #7FFF00;
          color: #1a365d;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .search-btn:hover {
          background: #6de600;
          transform: translateY(-1px);
        }
        .suggestions-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #eaeef2;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          z-index: 100;
          max-height: 300px;
          overflow-y: auto;
        }
        .suggestion-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .suggestion-item:hover {
          background: #f0fdf4;
        }
        .suggestion-item:not(:last-child) {
          border-bottom: 1px solid #f3f4f6;
        }
        .suggestion-icon {
          font-size: 20px;
        }
        .suggestion-info {
          flex: 1;
        }
        .suggestion-title {
          font-size: 14px;
          font-weight: 600;
          color: #1a365d;
          margin: 0 0 2px;
        }
        .suggestion-meta {
          font-size: 12px;
          color: #6b7280;
          margin: 0;
        }
        .quick-filters {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .filter-chip {
          padding: 8px 14px;
          background: white;
          border: 1px solid #eaeef2;
          border-radius: 20px;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .filter-chip:hover {
          border-color: #7FFF00;
          background: #f0fdf4;
        }
      `}</style>
    </div>
  );
}