import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '', password2: '', first_name: '', last_name: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/register/', form);
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setSuccess('Registration successful! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-header">
          <h1>🏫 Join Vignan Lost & Found</h1>
          <p>Create your account to get started</p>
        </div>

        {error && <div className="alert error">{error}</div>}
        {success && <div className="alert success">{success}</div>}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-row">
            <input
              type="text"
              placeholder="First Name"
              value={form.first_name}
              onChange={e => setForm({...form, first_name: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={form.last_name}
              onChange={e => setForm({...form, last_name: e.target.value})}
              required
            />
          </div>
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={e => setForm({...form, username: e.target.value})}
            required
          />
          <input
            type="email"
            placeholder="Email (@vignan.ac.in for auto-verification)"
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({...form, password: e.target.value})}
            required
            minLength={8}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={form.password2}
            onChange={e => setForm({...form, password2: e.target.value})}
            required
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="register-footer">
          Already have an account? <Link to="/login" className="link">Sign in</Link>
        </div>
      </div>

      <style>{`
        .register-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #1a365d, #2d5a8e); padding: 20px; }
        .register-card { background: white; padding: 40px; border-radius: 12px; width: 100%; max-width: 480px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); }
        .register-header { text-align: center; margin-bottom: 28px; }
        .register-header h1 { font-size: 24px; color: #1a365d; margin: 0 0 6px; }
        .register-header p { color: #6b7280; margin: 0; }
        .alert { padding: 10px; border-radius: 6px; margin-bottom: 16px; font-size: 14px; }
        .alert.error { background: #fee2e2; color: #991b1b; }
        .alert.success { background: #dcfce7; color: #166534; }
        .register-form { display: flex; flex-direction: column; gap: 12px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .register-form input { padding: 12px 14px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; }
        .register-form input:focus { border-color: #7FFF00; outline: none; }
        .register-footer { text-align: center; margin-top: 16px; font-size: 14px; color: #6b7280; }
        .link { color: #2563eb; text-decoration: none; font-weight: 500; }
        @media (max-width: 480px) { .form-row { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}