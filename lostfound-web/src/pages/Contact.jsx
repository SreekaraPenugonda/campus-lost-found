import { useState } from 'react';
import api from '../services/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await api.post('/feedback/', { ...form, rating: 5 });
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>📧 Contact Us</h1>
        <p>Have questions? We're here to help!</p>
      </div>

      <div className="contact-grid">
        <form className="contact-form" onSubmit={handleSubmit}>
          {status === 'sent' && <div className="success-msg">✅ Message sent successfully!</div>}
          {status === 'error' && <div className="error-msg">❌ Failed to send. Please try again.</div>}
          
          <input placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          <input type="email" placeholder="Your Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
          <input placeholder="Subject" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} required />
          <textarea rows="5" placeholder="Your Message" value={form.message} onChange={e => setForm({...form, message: e.target.value})} required />
          <button type="submit" className="btn-primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <div className="contact-info">
          <div className="info-card">
            <span className="info-icon">📍</span>
            <h3>Location</h3>
            <p>Vignan University<br/>Main Campus, Lost & Found Office</p>
          </div>
          <div className="info-card">
            <span className="info-icon">📞</span>
            <h3>Phone</h3>
            <p>+91 863 234 5678</p>
          </div>
          <div className="info-card">
            <span className="info-icon">✉️</span>
            <h3>Email</h3>
            <p>lostandfound@vignan.ac.in</p>
          </div>
          <div className="info-card">
            <span className="info-icon">🕐</span>
            <h3>Hours</h3>
            <p>Mon-Fri: 9AM - 5PM<br/>Sat: 9AM - 1PM</p>
          </div>
        </div>
      </div>

      <style>{`
        .contact-page { max-width: 1000px; margin: 0 auto; padding: 0 16px 40px; }
        .contact-header { text-align: center; margin-bottom: 32px; }
        .contact-header h1 { font-size: 28px; color: #1a365d; margin: 0 0 8px; }
        .contact-header p { color: #6b7280; margin: 0; }
        .contact-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 24px; }
        .contact-form { background: white; padding: 28px; border-radius: 8px; border: 1px solid #eaeef2; display: flex; flex-direction: column; gap: 12px; }
        .contact-form input, .contact-form textarea { padding: 10px 14px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; outline: none; }
        .contact-form input:focus, .contact-form textarea:focus { border-color: #7FFF00; }
        .success-msg { background: #dcfce7; color: #166534; padding: 10px; border-radius: 6px; }
        .error-msg { background: #fee2e2; color: #991b1b; padding: 10px; border-radius: 6px; }
        .contact-info { display: flex; flex-direction: column; gap: 12px; }
        .info-card { background: white; padding: 20px; border-radius: 8px; border: 1px solid #eaeef2; }
        .info-icon { font-size: 24px; }
        .info-card h3 { font-size: 15px; color: #1a365d; margin: 8px 0 4px; }
        .info-card p { font-size: 13px; color: #6b7280; margin: 0; line-height: 1.5; }
        @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}