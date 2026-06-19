import { useState } from 'react';
import api from '../services/api';

export default function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true
  });
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    try {
      await api.put('/profile/', { notifications });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Failed to save settings:', err);
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <h1>⚙️ Settings</h1>

        <div className="settings-section">
          <h2>Notifications</h2>
          <div className="setting-item">
            <div className="setting-info">
              <h3>Email Notifications</h3>
              <p>Receive match alerts via email</p>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={e => setNotifications({ ...notifications, email: e.target.checked })}
              />
              <span className="slider" />
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h3>SMS Notifications</h3>
              <p>Receive match alerts via SMS</p>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={notifications.sms}
                onChange={e => setNotifications({ ...notifications, sms: e.target.checked })}
              />
              <span className="slider" />
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h3>Push Notifications</h3>
              <p>Receive browser notifications</p>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={notifications.push}
                onChange={e => setNotifications({ ...notifications, push: e.target.checked })}
              />
              <span className="slider" />
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h2>Privacy</h2>
          <div className="setting-item">
            <div className="setting-info">
              <h3>Anonymous Reporting</h3>
              <p>Hide your identity when reporting items</p>
            </div>
            <label className="toggle">
              <input type="checkbox" defaultChecked />
              <span className="slider" />
            </label>
          </div>
        </div>

        <button className="btn-primary" onClick={handleSave}>
          {saved ? '✅ Saved!' : 'Save Settings'}
        </button>
      </div>

      <style>{`
        .settings-page {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 16px;
        }
        .settings-container {
          background: white;
          border-radius: 12px;
          border: 1px solid #eaeef2;
          padding: 32px;
        }
        .settings-container h1 {
          font-size: 28px;
          color: #1a365d;
          margin: 0 0 32px;
        }
        .settings-section {
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid #eaeef2;
        }
        .settings-section:last-of-type {
          border-bottom: none;
        }
        .settings-section h2 {
          font-size: 18px;
          color: #1a365d;
          margin: 0 0 16px;
        }
        .setting-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          background: #f8f9fa;
          border-radius: 8px;
          margin-bottom: 12px;
        }
        .setting-info h3 {
          margin: 0 0 4px;
          font-size: 15px;
          color: #1a365d;
        }
        .setting-info p {
          margin: 0;
          font-size: 13px;
          color: #6b7280;
        }
        .toggle {
          position: relative;
          display: inline-block;
          width: 48px;
          height: 24px;
        }
        .toggle input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #d1d5db;
          transition: 0.3s;
          border-radius: 24px;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background: white;
          transition: 0.3s;
          border-radius: 50%;
        }
        input:checked + .slider {
          background: #7FFF00;
        }
        input:checked + .slider:before {
          transform: translateX(24px);
        }
        .btn-primary {
          padding: 12px 24px;
          background: #7FFF00;
          color: #1a365d;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }
        .btn-primary:hover {
          background: #6de600;
        }
      `}</style>
    </div>
  );
}