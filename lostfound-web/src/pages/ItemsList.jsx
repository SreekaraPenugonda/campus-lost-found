import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../services/api';

export default function ItemsList() {
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    status: searchParams.get('status') || '',
    building: searchParams.get('building') || '',
    time: searchParams.get('time') || '',
    urgency: searchParams.get('urgency') || '',
  });

  useEffect(() => {
    fetchItems();
  }, [filters]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const res = await api.get(`/items/?${params.toString()}`);
      setItems(Array.isArray(res.data) ? res.data : (res.data?.results || []));
    } catch (e) {
      console.error('Failed to fetch items:', e);
    } finally {
      setLoading(false);
    }
  };

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'LOST': return 'bg-yellow-100 text-yellow-800';
      case 'FOUND': return 'bg-green-100 text-green-800';
      case 'RESOLVED': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyIcon = (urgency) => {
    switch(urgency) {
      case 'HIGH': return '🔴';
      case 'MEDIUM': return '🟡';
      case 'LOW': return '🟢';
      default: return '⚪';
    }
  };

  return (
    <div className="items-list-page">
      <div className="items-header">
        <h1>🔍 Browse Items</h1>
        <p>Find lost items or report found ones</p>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <input
          type="text"
          placeholder="Search items..."
          value={filters.search}
          onChange={e => updateFilter('search', e.target.value)}
          className="filter-input"
        />
        <select value={filters.category} onChange={e => updateFilter('category', e.target.value)} className="filter-select">
          <option value="">All Categories</option>
          <option value="ELECTRONICS">📱 Electronics</option>
          <option value="BOOKS">📚 Books</option>
          <option value="ID_CARDS">🪪 ID Cards</option>
          <option value="BAGS">🎒 Bags</option>
          <option value="CLOTHING">👕 Clothing</option>
          <option value="KEYS">🔑 Keys</option>
          <option value="OTHER">📦 Other</option>
        </select>
        <select value={filters.status} onChange={e => updateFilter('status', e.target.value)} className="filter-select">
          <option value="">All Status</option>
          <option value="LOST">🟢 Lost</option>
          <option value="FOUND">🔵 Found</option>
          <option value="RESOLVED">✅ Resolved</option>
        </select>
        <select value={filters.time} onChange={e => updateFilter('time', e.target.value)} className="filter-select">
          <option value="">Any Time</option>
          <option value="hour">Last Hour</option>
          <option value="day">Last 24 Hours</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
        </select>
        <button onClick={() => setFilters({ search: '', category: '', status: '', building: '', time: '', urgency: '' })} className="btn-clear">
          Clear
        </button>
      </div>

      {/* Results */}
      {loading ? (
        <div className="loading-state">⏳ Loading items...</div>
      ) : items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No items found</h3>
          <p>Try adjusting your filters or search terms</p>
        </div>
      ) : (
        <div className="items-grid">
          {items.map(item => (
            <Link to={`/item/${item.id}`} key={item.id} className="item-card">
              <div className="item-card-header">
                <span className={`status-badge ${getStatusColor(item.status)}`}>{item.status}</span>
                <span className="urgency-badge">{getUrgencyIcon(item.urgency)} {item.urgency}</span>
              </div>
              <h3>{item.title}</h3>
              <p className="item-desc">{item.description}</p>
              <div className="item-meta">
                <span>📍 {item.building}</span>
                <span>📅 {new Date(item.date_reported).toLocaleDateString()}</span>
                <span>👁️ {item.views_count || 0}</span>
              </div>
              {item.is_anonymous && <span className="anonymous-badge">Anonymous</span>}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        .items-list-page { max-width: 1200px; margin: 0 auto; padding: 0 16px 40px; }
        .items-header { text-align: center; margin-bottom: 24px; }
        .items-header h1 { font-size: 28px; color: #1a365d; margin: 0 0 6px; }
        .items-header p { color: #6b7280; margin: 0; }
        .filters-bar { background: white; padding: 16px; border-radius: 8px; border: 1px solid #eaeef2; display: flex; gap: 12px; margin-bottom: 24px; flex-wrap: wrap; }
        .filter-input { flex: 2; min-width: 200px; padding: 10px 14px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; }
        .filter-select { flex: 1; min-width: 140px; padding: 10px 14px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; background: white; }
        .btn-clear { padding: 10px 20px; background: #fee2e2; color: #991b1b; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; }
        .loading-state, .empty-state { text-align: center; padding: 60px 20px; background: white; border-radius: 8px; border: 1px solid #eaeef2; }
        .empty-icon { font-size: 48px; margin-bottom: 12px; }
        .empty-state h3 { color: #1a365d; margin: 0 0 6px; }
        .empty-state p { color: #6b7280; margin: 0; }
        .items-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
        .item-card { background: white; padding: 20px; border-radius: 8px; border: 1px solid #eaeef2; text-decoration: none; color: inherit; display: block; transition: all 0.15s ease; }
        .item-card:hover { border-color: #7FFF00; box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
        .item-card-header { display: flex; justify-content: space-between; margin-bottom: 10px; }
        .status-badge { padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }
        .urgency-badge { font-size: 12px; color: #6b7280; }
        .item-card h3 { font-size: 16px; color: #1a365d; margin: 0 0 6px; }
        .item-desc { font-size: 13px; color: #6b7280; margin: 0 0 10px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .item-meta { display: flex; gap: 12px; font-size: 12px; color: #9ca3af; padding-top: 10px; border-top: 1px solid #f3f4f6; }
        .anonymous-badge { display: inline-block; margin-top: 8px; padding: 2px 8px; background: #f3f4f6; color: #6b7280; border-radius: 4px; font-size: 11px; }
      `}</style>
    </div>
  );
}