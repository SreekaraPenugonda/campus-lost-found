import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [claiming, setClaiming] = useState(false);
  const [claimDesc, setClaimDesc] = useState('');
  const [claimMsg, setClaimMsg] = useState('');
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetchItem();
    fetchMatches();
    // Increment view count
    api.post(`/items/${id}/increment_views/`).catch(() => {});
  }, [id]);

  const fetchItem = async () => {
    try {
      const response = await api.get(`/items/${id}/`);
      setItem(response.data);
    } catch (err) {
      setError('Item not found');
    } finally {
      setLoading(false);
    }
  };

  const fetchMatches = async () => {
    try {
      const response = await api.get(`/items/matches/`);
      if (Array.isArray(response.data)) {
        setMatches(response.data.filter(m => m.lost_item === parseInt(id) || m.found_item === parseInt(id)));
      }
    } catch (e) { /* silent */ }
  };

  const submitClaim = async () => {
    if (!claimDesc.trim()) return;
    setClaiming(true);
    try {
      await api.post('/claims/', { item: parseInt(id), description: claimDesc });
      setClaimMsg('✅ Claim submitted successfully!');
      setClaimDesc('');
    } catch (err) {
      setClaimMsg('Failed to submit claim. Please try again.');
    } finally {
      setClaiming(false);
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

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-3xl mb-2">⏳</div>
        <div className="text-gray-600">Loading item details...</div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow">
        <div className="text-4xl mb-2">🔍</div>
        <p className="text-gray-600">Item not found</p>
        <Link to="/items" className="inline-block mt-4 btn-primary">Browse All Items</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{item.title}</h1>
              <div className="flex gap-2 mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{item.category}</span>
              </div>
            </div>
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">👁️ {item.views_count || 0} views</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
              <p className="text-gray-800">{item.description}</p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Building</h3>
                <p className="text-gray-800">{item.building}</p>
              </div>
              {item.room && <div>
                <h3 className="text-sm font-medium text-gray-500">Room</h3>
                <p className="text-gray-800">{item.room}</p>
              </div>}
              <div>
                <h3 className="text-sm font-medium text-gray-500">Date Reported</h3>
                <p className="text-gray-800">{new Date(item.date_reported).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Date Occurred</h3>
                <p className="text-gray-800">{new Date(item.date_occurred).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Optional Details */}
            {(item.color || item.brand || item.model) && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Item Details</h3>
                <div className="flex flex-wrap gap-2">
                  {item.color && <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">🎨 {item.color}</span>}
                  {item.brand && <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">🏷️ {item.brand}</span>}
                  {item.model && <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">📱 {item.model}</span>}
                </div>
              </div>
            )}

            {/* Reported By */}
            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-500">
                Reported by: <span className="font-medium text-gray-700">{item.reported_by_username}</span>
              </p>
            </div>

            {/* Claim Section */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">📋 Claim This Item</h3>
              {claimMsg && (
                <div className={`p-3 rounded-lg mb-3 text-sm ${claimMsg.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                  {claimMsg}
                </div>
              )}
              <textarea
                placeholder="Describe why this item belongs to you (include serial numbers, unique marks, etc.)"
                className="input-field mb-3"
                rows="3"
                value={claimDesc}
                onChange={(e) => setClaimDesc(e.target.value)}
              />
              <button
                onClick={submitClaim}
                disabled={claiming || !claimDesc.trim()}
                className="btn-primary"
              >
                {claiming ? 'Submitting...' : 'Submit Claim'}
              </button>
            </div>

            {/* Matches Section */}
            {matches.length > 0 && (
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">🎯 Potential Matches</h3>
                {matches.map((m, i) => (
                  <div key={i} className="bg-green-50 border border-green-200 rounded-lg p-3 mb-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-green-800">{m.score}% Match</span>
                      <Link to={`/item/${m.lost_item === parseInt(id) ? m.found_item : m.lost_item}`} className="text-sm text-blue-600 hover:underline">
                        View Matching Item →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button onClick={() => navigate(-1)} className="flex-1 btn-secondary py-2">← Back</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}