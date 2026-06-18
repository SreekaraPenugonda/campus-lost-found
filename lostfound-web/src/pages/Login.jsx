import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Login({ setIsAuthenticated, setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStatus, setForgotStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/token/', { username: form.username, password: form.password });
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      const userRes = await api.get('/profile/');
      const userData = userRes.data;
      localStorage.setItem('user', JSON.stringify(userData));
      setIsAuthenticated(true);
      setUser(userData);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotStatus('sending');
    try {
      await api.post('/request-password-reset/', { email: forgotEmail });
      setForgotStatus('sent');
    } catch (err) {
      setForgotStatus('error');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1>🏫 Vignan Lost & Found</h1>
          <p>Sign in to your account</p>
        </div>

        {error && <div className="alert error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={e => setForm({...form, username: e.target.value})}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({...form, password: e.target.value})}
            required
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-links">
          <button onClick={() => setShowForgot(!showForgot)} className="link-btn">
            Forgot password?
          </button>
          <span>Don't have an account? <Link to="/register" className="link">Register</Link></span>
        </div>

        {showForgot && (
          <form onSubmit={handleForgotPassword} className="forgot-form">
            <h3>Reset Password</h3>
            <input
              type="email"
              placeholder="Enter your email"
              value={forgotEmail}
              onChange={e => setForgotEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn-secondary" disabled={forgotStatus === 'sending'}>
              {forgotStatus === 'sending' ? 'Sending...' : 'Send OTP'}
            </button>
            {forgotStatus === 'sent' && <p className="success">OTP sent to your email!</p>}
            {forgotStatus === 'error' && <p className="error">Failed to send OTP</p>}
          </form>
        )}
      </div>

      <style>{`
        .login-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #1a365d, #2d5a8e); padding: 20px; }
        .login-card { background: white; padding: 40px; border-radius: 12px; width: 100%; max-width: 400px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); }
        .login-header { text-align: center; margin-bottom: 28px; }
        .login-header h1 { font-size: 24px; color: #1a365d; margin: 0 0 6px; }
        .login-header p { color: #6b7280; margin: 0; }
        .alert { padding: 10px; border-radius: 6px; margin-bottom: 16px; font-size: 14px; }
        .alert.error { background: #fee2e2; color: #991b1b; }
        .login-form { display: flex; flex-direction: column; gap: 12px; }
        .login-form input { padding: 12px 14px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; }
        .login-form input:focus { border-color: #7FFF00; outline: none; }
        .login-links { display: flex; justify-content: space-between; margin-top: 16px; font-size: 13px; }
        .link-btn { background: none; border: none; color: #2563eb; cursor: pointer; font-size: 13px; }
        .link { color: #2563eb; text-decoration: none; font-weight: 500; }
        .forgot-form { margin-top: 20px; padding-top: 20px; border-top: 1px solid #eaeef2; }
        .forgot-form h3 { font-size: 16px; color: #1a365d; margin: 0 0 12px; }
        .forgot-form input { width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; margin-bottom: 8px; }
        .success { color: #16a34a; font-size: 13px; }
      `}</style>
    </div>
  );
}