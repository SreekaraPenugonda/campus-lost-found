import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import PhotoUpload from '../components/PhotoUpload';

export default function ReportFound() {
  const navigate = useNavigate();
  const [isGuest, setIsGuest] = useState(true);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'OTHER',
    building: '',
    room: '',
    urgency: 'MEDIUM',
    color: '',
    brand: '',
    contact: '',
    is_anonymous: false
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const data = {
        ...form,
        status: 'FOUND',
        date_occurred: new Date().toISOString()
      };
      await api.post('/items/', data);
      setMsg('✅ Found item reported! The owner will be notified if matched.');
      setTimeout(() => navigate('/items'), 2000);
    } catch (err) {
      setMsg('❌ Failed to report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="report-page">
      <div className="report-header">
        <h1>✅ Report Found Item</h1>
        <p>Help someone get their belongings back. Takes 30 seconds.</p>
      </div>

      {msg && <div className={`report-msg ${msg.includes('✅') ? 'success' : 'error'}`}>{msg}</div>}

      <div className="mode-toggle">
        <button
          type="button"
          className={`toggle-btn ${isGuest ? 'active' : ''}`}
          onClick={() => setIsGuest(true)}
        >
          📱 Quick Report (No Signup)
        </button>
        <button
          type="button"
          className={`toggle-btn ${!isGuest ? 'active' : ''}`}
          onClick={() => setIsGuest(false)}
        >
          👤 With Account
        </button>
      </div>

      <form onSubmit={handleSubmit} className="report-form">
        {step === 1 && (
          <>
            <PhotoUpload onUpload={setImages} images={images} />

            <div className="form-group">
              <label>What did you find? *</label>
              <input
                placeholder="e.g., Black Wallet, Samsung Phone, Keys"
                value={form.title}
                onChange={e => updateForm('title', e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category *</label>
                <select value={form.category} onChange={e => updateForm('category', e.target.value)}>
                  <option value="ELECTRONICS">📱 Electronics</option>
                  <option value="BOOKS">📚 Books</option>
                  <option value="ID_CARDS">🪪 ID Cards</option>
                  <option value="BAGS">🎒 Bags</option>
                  <option value="CLOTHING">👕 Clothing</option>
                  <option value="KEYS">🔑 Keys</option>
                  <option value="OTHER">📦 Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Urgency</label>
                <select value={form.urgency} onChange={e => updateForm('urgency', e.target.value)}>
                  <option value="LOW">🟢 Low</option>
                  <option value="MEDIUM">🟡 Medium</option>
                  <option value="HIGH">🔴 High</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Where did you find it? *</label>
                <input
                  placeholder="e.g., Library, Main Building"
                  value={form.building}
                  onChange={e => updateForm('building', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Room (optional)</label>
                <input
                  placeholder="e.g., Room 201"
                  value={form.room}
                  onChange={e => updateForm('room', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Description (optional)</label>
              <textarea
                rows="3"
                placeholder="Any details that help identify the item..."
                value={form.description}
                onChange={e => updateForm('description', e.target.value)}
              />
            </div>

            <button
              type="button"
              className="btn-primary btn-next"
              onClick={() => setStep(2)}
              disabled={!form.title || !form.building}
            >
              Next: Contact Info →
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="step-indicator">
              <span className="step active">1. Item Details</span>
              <span className="arrow">→</span>
              <span className="step current">2. Contact</span>
            </div>

            {isGuest ? (
              <div className="guest-contact">
                <p className="guest-info">
                  📱 No account needed. We'll connect you with the owner.
                </p>
                <div className="form-group">
                  <label>Your Email or Phone Number *</label>
                  <input
                    type="text"
                    placeholder="email@example.com or +91 9876543210"
                    value={form.contact}
                    onChange={e => updateForm('contact', e.target.value)}
                    required
                  />
                </div>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={form.is_anonymous}
                    onChange={e => updateForm('is_anonymous', e.target.checked)}
                  />
                  <span>Keep my report anonymous</span>
                </label>
              </div>
            ) : (
              <div className="login-prompt">
                <p>Please log in to continue</p>
                <button type="button" className="btn-secondary" onClick={() => navigate('/login')}>
                  Go to Login
                </button>
              </div>
            )}

            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={() => setStep(1)}>
                ← Back
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={loading || (isGuest && !form.contact)}
              >
                {loading ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </>
        )}
      </form>

      <style>{`
        .report-page { max-width: 700px; margin: 0 auto; padding: 0 16px 40px; }
        .report-header { text-align: center; margin-bottom: 24px; }
        .report-header h1 { font-size: 28px; color: #1a365d; margin: 0 0 6px; }
        .report-header p { color: #6b7280; margin: 0; }
        .report-msg { padding: 12px; border-radius: 6px; margin-bottom: 16px; text-align: center; }
        .report-msg.success { background: #dcfce7; color: #166534; }
        .report-msg.error { background: #fee2e2; color: #991b1b; }
        .mode-toggle {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
          background: white;
          padding: 4px;
          border-radius: 8px;
          border: 1px solid #eaeef2;
        }
        .toggle-btn {
          flex: 1;
          padding: 10px;
          border: none;
          background: transparent;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
          transition: all 0.2s ease;
        }
        .toggle-btn.active {
          background: #7FFF00;
          color: #1a365d;
        }
        .toggle-btn:hover:not(.active) {
          background: #f3f4f6;
        }
        .report-form {
          background: white;
          padding: 28px;
          border-radius: 12px;
          border: 1px solid #eaeef2;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-group label { font-size: 14px; font-weight: 500; color: #374151; }
        .form-group input, .form-group select, .form-group textarea {
          padding: 10px 14px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
          border-color: #7FFF00;
          outline: none;
        }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .step-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 12px;
          background: #f8f9fa;
          border-radius: 8px;
          font-size: 14px;
        }
        .step { color: #9ca3af; }
        .step.active { color: #16a34a; font-weight: 600; }
        .step.current { color: #1a365d; font-weight: 600; }
        .arrow { color: #d1d5db; }
        .guest-contact { padding: 8px 0; }
        .guest-info {
          background: #dcfce7;
          padding: 12px;
          border-radius: 6px;
          color: #166534;
          font-size: 14px;
          margin-bottom: 16px;
        }
        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 14px;
        }
        .checkbox-label input[type="checkbox"] {
          width: 18px;
          height: 18px;
          accent-color: #7FFF00;
        }
        .login-prompt {
          text-align: center;
          padding: 32px;
          background: #f8f9fa;
          border-radius: 8px;
        }
        .form-actions {
          display: flex;
          gap: 12px;
          justify-content: space-between;
          margin-top: 8px;
        }
        .btn-next {
          width: 100%;
          margin-top: 8px;
        }
        .btn-next:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}