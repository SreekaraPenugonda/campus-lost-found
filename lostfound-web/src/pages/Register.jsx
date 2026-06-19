import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Register({ onRegister }) {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (form.password !== form.password2) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await api.post('/register/', {
        username: form.username,
        email: form.email,
        password: form.password
      });
      if (onRegister) onRegister();
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h1>Create Account</h1>
          <p>Join to track your items</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Choose username"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Min 8 characters"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
              minLength={8}
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Re-enter password"
              value={form.password2}
              onChange={e => setForm({ ...form, password2: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn-primary btn-full" disabled={loading}>
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div className="register-footer">
          <p>Already have an account? <Link to="/login">Login</Link></p>
          <Link to="/" className="back-link">← Back to Home</Link>
        </div>
      </div>

      <style>{`
        .register-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1a365d 0%, #2d5a8e 100%);
          padding: 20px;
        }
        .register-container {
          background: white;
          padding: 40px;
          border-radius: 12px;
          width: 100%;
          max-width: 400px;
        }
        .register-header {
          text-align: center;
          margin-bottom: 32px;
        }
        .register-header h1 {
          font-size: 28px;
          color: #1a365d;
          margin: 0 0 8px;
        }
        .register-header p {
          color: #6b7280;
          margin: 0;
        }
        .error-message {
          padding: 12px;
          background: #fee2e2;
          color: #991b1b;
          border-radius: 6px;
          margin-bottom: 16px;
          font-size: 14px;
        }
        .register-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
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
        .form-group input {
          padding: 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
        }
        .form-group input:focus {
          outline: none;
          border-color: #7FFF00;
        }
        .btn-full {
          width: 100%;
          padding: 14px;
          font-size: 15px;
        }
        .register-footer {
          text-align: center;
        }
        .register-footer p {
          margin: 0 0 12px;
          color: #6b7280;
          font-size: 14px;
        }
        .register-footer a {
          color: #7FFF00;
          font-weight: 600;
        }
        .back-link {
          display: inline-block;
          margin-top: 12px;
          color: #6b7280;
          font-size: 13px;
        }
      `}</style>
    </div>
  );
}