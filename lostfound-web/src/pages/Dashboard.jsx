import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Dashboard({ user }) {
  const [myItems, setMyItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ total: 0, lost: 0, found: 0 });

  useEffect(() => {
    if (user) {
      fetchMyItems();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchMyItems = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Use backend filtering with ?user=me parameter
      const response = await api.get('/items/?user=me');
      const data = response.data;
      
      let itemsArray = [];
      if (data === null || data === undefined) {
        itemsArray = [];
      } else if (Array.isArray(data)) {
        itemsArray = data;
      } else if (typeof data === 'object' && data.results !== undefined) {
        itemsArray = Array.isArray(data.results) ? data.results : [];
      } else {
        itemsArray = [];
      }
      
      setMyItems(itemsArray);
      
      const total = itemsArray.length;
      const lost = itemsArray.filter(i => i && i.status === 'LOST').length;
      const found = itemsArray.filter(i => i && i.status === 'FOUND').length;
      setStats({ total, lost, found });
      
    } catch (error) {
      console.error('Error fetching items:', error);
      setError('Failed to load your items. Please try again.');
      setMyItems([]);
      setStats({ total: 0, lost: 0, found: 0 });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'LOST': return 'bg-yellow-100 text-yellow-800';
      case 'FOUND': return 'bg-green-100 text-green-800';
      case 'RESOLVED': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const itemsToRender = Array.isArray(myItems) ? myItems : [];

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-3xl mb-2">⏳</div>
        <div className="text-gray-600">Loading your items...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow p-8">
        <div className="text-4xl mb-2">⚠️</div>
        <p className="text-red-600 mb-4">{error}</p>
        <button onClick={fetchMyItems} className="btn-primary">
          🔄 Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl p-6 md:p-8 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">
          👋 Welcome back, {user?.first_name || user?.username || 'User'}!
        </h1>
        <p className="text-green-100 mt-2">
          Here's an overview of your lost and found activity
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 md:gap-6 mb-8">
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-md text-center">
          <div className="text-2xl font-bold text-gray-900">{stats.total || 0}</div>
          <div className="text-gray-600 text-sm">Total Items</div>
        </div>
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-md text-center">
          <div className="text-2xl font-bold text-yellow-600">{stats.lost || 0}</div>
          <div className="text-gray-600 text-sm">Lost</div>
        </div>
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-md text-center">
          <div className="text-2xl font-bold text-green-600">{stats.found || 0}</div>
          <div className="text-gray-600 text-sm">Found</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Link to="/report-lost" className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 text-center hover:bg-yellow-100 transition">
          <div className="text-3xl mb-2">❌</div>
          <h3 className="font-semibold text-gray-900">Report Lost</h3>
          <p className="text-sm text-gray-600">I lost something</p>
        </Link>
        <Link to="/report-found" className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center hover:bg-green-100 transition">
          <div className="text-3xl mb-2">✅</div>
          <h3 className="font-semibold text-gray-900">Report Found</h3>
          <p className="text-sm text-gray-600">I found something</p>
        </Link>
      </div>

      {/* My Items */}
      <h2 className="text-xl font-bold mb-4">📦 My Items</h2>
      {itemsToRender.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <div className="text-4xl mb-2">📭</div>
          <p className="text-gray-600">You haven't reported any items yet</p>
          <Link to="/report-lost" className="inline-block mt-4 btn-primary">
            Report Your First Item
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {itemsToRender.map(item => (
            <Link to={`/item/${item.id}`} key={item.id} className="block bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.title || 'Untitled'}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{item.description || 'No description'}</p>
                  <div className="flex flex-wrap gap-2 mt-2 text-xs">
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded">{item.category || 'Other'}</span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded">📍 {item.building || 'Unknown'}</span>
                    <span className="text-gray-500">
                      📅 {item.date_reported ? new Date(item.date_reported).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${getStatusColor(item.status)}`}>
                  {item.status || 'Unknown'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}