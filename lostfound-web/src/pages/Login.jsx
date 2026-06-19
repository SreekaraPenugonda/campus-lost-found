import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/token/', form);
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      if (onLogin) onLogin();
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Login to track your items</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn-primary btn-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <Link to="/register">Register</Link></p>
          <Link to="/" className="back-link">← Back to Home</Link>
        </div>
      </div>

      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1a365d 0%, #2d5a8e 100%);
          padding: 20px;
        }
        .login-container {
          background: white;
          padding: 40px;
          border-radius: 12px;
          width: 100%;
          max-width: 400px;
        }
        .login-header {
          text-align: center;
          margin-bottom: 32px;
        }
        .login-header h1 {
          font-size: 28px;
          color: #1a365d;
          margin: 0 0 8px;
        }
        .login-header p {
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
        .login-form {
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
        .login-footer {
          text-align: center;
        }
        .login-footer p {
          margin: 0 0 12px;
          color: #6b7280;
          font-size: 14px;
        }
        .login-footer a {
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