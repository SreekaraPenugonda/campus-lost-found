import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Settings() {
  const [preferences, setPreferences] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: true,
    language: 'English',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Load preferences from user profile on mount
    const loadPreferences = async () => {
      try {
        const response = await api.get('/profile/');
        if (response.data.preferences) {
          setPreferences(prev => ({
            ...prev,
            ...response.data.preferences
          }));
        }
      } catch (err) {
        console.error('Failed to load preferences:', err);
      }
    };
    loadPreferences();
  }, []);

  const handleToggle = (key) => {
    const updated = { ...preferences, [key]: !preferences[key] };
    setPreferences(updated);
    savePreferences(updated);
  };

  const handleLanguageChange = (e) => {
    const updated = { ...preferences, language: e.target.value };
    setPreferences(updated);
    savePreferences(updated);
  };

  const savePreferences = async (prefs) => {
    setLoading(true);
    setMessage('');
    try {
      await api.patch('/profile/', { preferences: prefs });
      // Update localStorage user data
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      userData.preferences = prefs;
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (err) {
      console.error('Failed to save preferences:', err);
      setMessage('Failed to save preferences');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <div className="settings-header">
          <h1>Settings</h1>
          <p>Manage your preferences and account settings</p>
        </div>

        {message && (
          <div className="settings-message error">{message}</div>
        )}

        <div className="settings-section">
          <h2>Appearance</h2>
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Dark Mode</span>
              <span className="setting-description">Switch between light and dark theme</span>
            </div>
            <button
              className={`toggle ${preferences.darkMode ? 'active' : ''}`}
              onClick={() => handleToggle('darkMode')}
              disabled={loading}
            >
              <span className="toggle-slider"></span>
            </button>
          </div>
        </div>

        <div className="settings-section">
          <h2>Notifications</h2>
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Email Notifications</span>
              <span className="setting-description">Receive updates via email</span>
            </div>
            <button
              className={`toggle ${preferences.emailNotifications ? 'active' : ''}`}
              onClick={() => handleToggle('emailNotifications')}
              disabled={loading}
            >
              <span className="toggle-slider"></span>
            </button>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Push Notifications</span>
              <span className="setting-description">Receive notifications on your device</span>
            </div>
            <button
              className={`toggle ${preferences.pushNotifications ? 'active' : ''}`}
              onClick={() => handleToggle('pushNotifications')}
              disabled={loading}
            >
              <span className="toggle-slider"></span>
            </button>
          </div>
        </div>

        <div className="settings-section">
          <h2>Language</h2>
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">App Language</span>
              <span className="setting-description">Choose your preferred language</span>
            </div>
            <select
              className="language-select"
              value={preferences.language}
              onChange={handleLanguageChange}
              disabled={loading}
            >
              <option value="English">English</option>
              <option value="Telugu">Telugu</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>
        </div>

        <div className="settings-section">
          <h2>Account</h2>
          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Change Password</span>
              <span className="setting-description">Update your account password</span>
            </div>
            <Link to="/change-password" className="btn-secondary">
              Update
            </Link>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Delete Account</span>
              <span className="setting-description text-danger">Permanently delete your account</span>
            </div>
            <button className="btn-danger" onClick={() => {
              if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                alert('Account deletion is not available yet.');
              }
            }}>Delete</button>
          </div>
        </div>
      </div>

      <style>{`
        .settings-page {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px 16px 40px;
        }

        .settings-container {
          background: white;
          border-radius: 8px;
          padding: 32px;
          border: 1px solid #eaeef2;
        }

        .settings-header {
          margin-bottom: 32px;
        }

        .settings-header h1 {
          font-size: 24px;
          font-weight: 600;
          color: #1a365d;
          margin: 0 0 4px 0;
        }

        .settings-header p {
          color: #6b7280;
          margin: 0;
        }

        .settings-message {
          padding: 12px 16px;
          border-radius: 6px;
          margin-bottom: 20px;
          font-size: 14px;
        }

        .settings-message.error {
          background: #fee2e2;
          color: #991b1b;
        }

        .settings-section {
          padding: 20px 0;
          border-top: 1px solid #eaeef2;
        }

        .settings-section:first-of-type {
          border-top: none;
        }

        .settings-section h2 {
          font-size: 16px;
          font-weight: 600;
          color: #1a365d;
          margin: 0 0 16px 0;
        }

        .setting-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
        }

        .setting-info {
          flex: 1;
          margin-right: 16px;
        }

        .setting-label {
          display: block;
          font-size: 15px;
          font-weight: 500;
          color: #1a1a1a;
        }

        .setting-description {
          display: block;
          font-size: 13px;
          color: #6b7280;
        }

        .text-danger {
          color: #dc2626;
        }

        .toggle {
          position: relative;
          width: 48px;
          height: 26px;
          background: #d1d5db;
          border: none;
          border-radius: 13px;
          cursor: pointer;
          transition: background 0.2s ease;
          flex-shrink: 0;
        }

        .toggle.active {
          background: #7FFF00;
        }

        .toggle:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .toggle-slider {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          transition: transform 0.2s ease;
        }

        .toggle.active .toggle-slider {
          transform: translateX(22px);
        }

        .language-select {
          padding: 8px 14px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          background: white;
          outline: none;
          cursor: pointer;
        }

        .language-select:focus {
          border-color: #7FFF00;
        }

        .language-select:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-danger {
          background: #dc2626;
          color: white;
          padding: 8px 20px;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .btn-danger:hover {
          background: #b91c1c;
        }

        @media (max-width: 600px) {
          .setting-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .toggle, .language-select, .btn-secondary, .btn-danger {
            align-self: flex-start;
          }

          .settings-container {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}