import { useState, useEffect } from 'react';
import api from '../services/api';

export default function Profile({ user, setUser }) {
  const [profile, setProfile] = useState({});
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', phone: '', university_id: '', department: '' });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await api.get('/profile/');
      setProfile(res.data);
      setForm({
        first_name: res.data.first_name || '',
        last_name: res.data.last_name || '',
        email: res.data.email || '',
        phone: res.data.phone || '',
        university_id: res.data.university_id || '',
        department: res.data.department || '',
      });
    } catch (e) { console.error(e); }
  };

  const handleSave = async () => {
    try {
      const res = await api.patch('/profile/', form);
      setProfile(res.data);
      setUser(prev => ({ ...prev, ...res.data }));
      setEditing(false);
      setMsg('✅ Profile updated');
      setTimeout(() => setMsg(''), 3000);
    } catch (e) {
      setMsg('❌ Failed to update');
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">👤</div>
        <div className="profile-info">
          <h1>{profile.first_name} {profile.last_name}</h1>
          <p>{profile.email}</p>
          <span className={`badge ${profile.is_email_verified ? 'verified' : 'unverified'}`}>
            {profile.is_email_verified ? '✅ Verified' : '⏳ Unverified'}
          </span>
        </div>
      </div>

      {msg && <div className="profile-msg">{msg}</div>}

      <div className="profile-card">
        <div className="profile-section">
          <h2>Personal Information</h2>
          {editing ? (
            <div className="profile-form">
              <div className="form-row">
                <input placeholder="First Name" value={form.first_name} onChange={e => setForm({...form, first_name: e.target.value})} />
                <input placeholder="Last Name" value={form.last_name} onChange={e => setForm({...form, last_name: e.target.value})} />
              </div>
              <input placeholder="Email" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} disabled />
              <div className="form-row">
                <input placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                <input placeholder="University ID" value={form.university_id} onChange={e => setForm({...form, university_id: e.target.value})} />
              </div>
              <input placeholder="Department" value={form.department} onChange={e => setForm({...form, department: e.target.value})} />
              <div className="form-actions">
                <button className="btn-primary" onClick={handleSave}>Save Changes</button>
                <button className="btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            <div className="profile-details">
              <div className="detail-row"><span>Name:</span><span>{profile.first_name} {profile.last_name}</span></div>
              <div className="detail-row"><span>Email:</span><span>{profile.email}</span></div>
              <div className="detail-row"><span>Phone:</span><span>{profile.phone || 'Not set'}</span></div>
              <div className="detail-row"><span>University ID:</span><span>{profile.university_id || 'Not set'}</span></div>
              <div className="detail-row"><span>Department:</span><span>{profile.department || 'Not set'}</span></div>
              <div className="detail-row"><span>Member Since:</span><span>{profile.date_joined ? new Date(profile.date_joined).toLocaleDateString() : 'N/A'}</span></div>
              <button className="btn-primary" onClick={() => setEditing(true)}>Edit Profile</button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .profile-page { max-width: 800px; margin: 0 auto; padding: 0 16px 40px; }
        .profile-header { background: white; padding: 32px; border-radius: 12px; border: 1px solid #eaeef2; display: flex; align-items: center; gap: 20px; margin-bottom: 24px; }
        .profile-avatar { width: 80px; height: 80px; background: #7FFF00; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 40px; }
        .profile-info h1 { font-size: 24px; color: #1a365d; margin: 0 0 4px; }
        .profile-info p { color: #6b7280; margin: 0 0 8px; }
        .badge { padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 500; }
        .badge.verified { background: #dcfce7; color: #166534; }
        .badge.unverified { background: #fef3c7; color: #92400e; }
        .profile-msg { padding: 12px; border-radius: 6px; margin-bottom: 16px; text-align: center; }
        .profile-card { background: white; padding: 28px; border-radius: 12px; border: 1px solid #eaeef2; }
        .profile-section h2 { font-size: 18px; color: #1a365d; margin: 0 0 16px; }
        .profile-form { display: flex; flex-direction: column; gap: 12px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .profile-form input { padding: 10px 14px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; }
        .profile-form input:focus { border-color: #7FFF00; outline: none; }
        .profile-form input:disabled { background: #f3f4f6; }
        .form-actions { display: flex; gap: 12px; margin-top: 8px; }
        .profile-details { display: flex; flex-direction: column; gap: 12px; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f3f4f6; }
        .detail-row span:first-child { color: #6b7280; font-size: 14px; }
        .detail-row span:last-child { color: #1a1a1a; font-weight: 500; }
        @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}