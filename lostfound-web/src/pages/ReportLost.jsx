import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function ReportLost() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '', description: '', category: 'OTHER', building: '', room: '',
    urgency: 'MEDIUM', color: '', brand: '', model: '', serial_number: '', is_anonymous: false
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      await api.post('/items/', { ...form, status: 'LOST' });
      setMsg('✅ Item reported successfully!');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setMsg('❌ Failed to report item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-page">
      <div className="report-header">
        <h1>❌ Report Lost Item</h1>
        <p>Help us help you find your belongings</p>
      </div>

      {msg && <div className={`report-msg ${msg.includes('✅') ? 'success' : 'error'}`}>{msg}</div>}

      <form onSubmit={handleSubmit} className="report-form">
        <div className="form-group">
          <label>Item Title *</label>
          <input placeholder="e.g., Blue Backpack, iPhone 13, Wallet" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea rows="4" placeholder="Describe your item in detail..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category *</label>
            <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
              <option value="ELECTRONICS">📱 Electronics</option>
              <option value="BOOKS">📚 Books & Stationery</option>
              <option value="ID_CARDS">🪪 ID Cards & Documents</option>
              <option value="BAGS">🎒 Bags & Luggage</option>
              <option value="CLOTHING">👕 Clothing & Accessories</option>
              <option value="KEYS">🔑 Keys & Keychains</option>
              <option value="OTHER">📦 Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Urgency Level</label>
            <select value={form.urgency} onChange={e => setForm({...form, urgency: e.target.value})}>
              <option value="LOW">🟢 Low</option>
              <option value="MEDIUM">🟡 Medium</option>
              <option value="HIGH">🔴 High</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Building *</label>
            <input placeholder="e.g., Main Building, Library" value={form.building} onChange={e => setForm({...form, building: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Room (Optional)</label>
            <input placeholder="e.g., Room 201, Lab 3" value={form.room} onChange={e => setForm({...form, room: e.target.value})} />
          </div>
        </div>

        <div className="form-section">
          <h3>📝 Additional Details (Optional)</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Color</label>
              <input placeholder="e.g., Blue, Black" value={form.color} onChange={e => setForm({...form, color: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Brand</label>
              <input placeholder="e.g., Apple, Nike" value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Model</label>
              <input placeholder="e.g., iPhone 13, Galaxy S21" value={form.model} onChange={e => setForm({...form, model: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Serial Number</label>
              <input placeholder="If applicable" value={form.serial_number} onChange={e => setForm({...form, serial_number: e.target.value})} />
            </div>
          </div>
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input type="checkbox" checked={form.is_anonymous} onChange={e => setForm({...form, is_anonymous: e.target.checked})} />
            <span>Report anonymously (hide your identity)</span>
          </label>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate(-1)} className="btn-secondary">Cancel</button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>
        </div>
      </form>

      <style>{`
        .report-page { max-width: 800px; margin: 0 auto; padding: 0 16px 40px; }
        .report-header { text-align: center; margin-bottom: 24px; }
        .report-header h1 { font-size: 28px; color: #1a365d; margin: 0 0 6px; }
        .report-header p { color: #6b7280; margin: 0; }
        .report-msg { padding: 12px; border-radius: 6px; margin-bottom: 16px; text-align: center; }
        .report-msg.success { background: #dcfce7; color: #166534; }
        .report-msg.error { background: #fee2e2; color: #991b1b; }
        .report-form { background: white; padding: 28px; border-radius: 12px; border: 1px solid #eaeef2; display: flex; flex-direction: column; gap: 16px; }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-group label { font-size: 14px; font-weight: 500; color: #374151; }
        .form-group input, .form-group select, .form-group textarea { padding: 10px 14px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: #7FFF00; outline: none; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-section { background: #f8f9fa; padding: 16px; border-radius: 8px; }
        .form-section h3 { font-size: 16px; color: #1a365d; margin: 0 0 12px; }
        .checkbox-group label { display: flex; align-items: center; gap: 8px; cursor: pointer; }
        .checkbox-group input[type="checkbox"] { width: 18px; height: 18px; accent-color: #7FFF00; }
        .form-actions { display: flex; gap: 12px; justify-content: flex-end; }
        @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}