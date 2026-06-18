// components/SmartSearch.jsx
export default function SmartSearch() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  const handleSearch = (value) => {
    setQuery(value);
    if (value.length > 2) {
      // Auto-suggest matching items
      fetchSuggestions(value);
    }
  };

  const fetchSuggestions = async (value) => {
    try {
      const response = await api.get(`/items/search/?q=${value}`);
      setSuggestions(response.data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  return (
    <div className="smart-search">
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="🔍 Search lost or found items..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="search-input"
        />
        {suggestions.length > 0 && (
          <div className="search-suggestions">
            {suggestions.map(item => (
              <div key={item.id} className="suggestion-item">
                <span>{item.title}</span>
                <span className="suggestion-meta">{item.building} • {item.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {recentSearches.length > 0 && !query && (
        <div className="recent-searches">
          <p>Recent Searches:</p>
          {recentSearches.map((search, index) => (
            <button key={index} onClick={() => setQuery(search)}>
              {search}
            </button>
          ))}
        </div>
      )}

      <style>{`
        .smart-search {
          position: relative;
        }

        .search-wrapper {
          position: relative;
        }

        .search-input {
          width: 100%;
          padding: 14px 20px;
          font-size: 16px;
          border: 2px solid #eaeef2;
          border-radius: 12px;
          outline: none;
          transition: all 0.2s ease;
          background: white;
        }

        .search-input:focus {
          border-color: #7FFF00;
          box-shadow: 0 0 0 4px rgba(127, 255, 0, 0.1);
        }

        .search-suggestions {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #eaeef2;
          border-radius: 8px;
          margin-top: 4px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
          z-index: 100;
          overflow: hidden;
        }

        .suggestion-item {
          display: flex;
          justify-content: space-between;
          padding: 12px 16px;
          cursor: pointer;
          transition: background 0.1s ease;
          border-bottom: 1px solid #f3f4f6;
        }

        .suggestion-item:hover {
          background: #f8f9fa;
        }

        .suggestion-meta {
          font-size: 12px;
          color: #6b7280;
        }

        .recent-searches {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 8px;
        }

        .recent-searches p {
          font-size: 13px;
          color: #6b7280;
          margin: 0 8px 0 0;
        }

        .recent-searches button {
          background: none;
          border: 1px solid #eaeef2;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 13px;
          color: #374151;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .recent-searches button:hover {
          background: #f3f4f6;
          border-color: #7FFF00;
        }
      `}</style>
    </div>
  );
}