import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, this would send to backend
    console.log('Contact form:', form);
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p className="contact-subtitle">Have questions? We're here to help.</p>

        <div className="contact-content">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <div className="info-item">
              <span className="info-icon">📧</span>
              <div>
                <h3>Email</h3>
                <p>support@vignan.edu.in</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📱</span>
              <div>
                <h3>Phone</h3>
                <p>+91 863 123 4567</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📍</span>
              <div>
                <h3>Office</h3>
                <p>Student Affairs Building, Room 101</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">🕐</span>
              <div>
                <h3>Hours</h3>
                <p>Mon-Fri: 9AM - 5PM</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            <h2>Send Message</h2>
            {sent && (
              <div className="success-message">
                ✅ Message sent! We'll get back to you soon.
              </div>
            )}
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
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
              <label>Message</label>
              <textarea
                rows="5"
                placeholder="How can we help?"
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn-primary">Send Message</button>
          </form>
        </div>
      </div>

      <style>{`
        .contact-page {
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 16px;
        }
        .contact-container {
          background: white;
          border-radius: 12px;
          border: 1px solid #eaeef2;
          padding: 40px;
        }
        .contact-container h1 {
          font-size: 32px;
          color: #1a365d;
          margin: 0 0 8px;
          text-align: center;
        }
        .contact-subtitle {
          text-align: center;
          color: #6b7280;
          margin: 0 0 40px;
        }
        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }
        .contact-info h2, .contact-form h2 {
          font-size: 20px;
          color: #1a365d;
          margin: 0 0 20px;
        }
        .info-item {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
        }
        .info-icon {
          font-size: 24px;
        }
        .info-item h3 {
          margin: 0 0 4px;
          font-size: 14px;
          color: #6b7280;
        }
        .info-item p {
          margin: 0;
          color: #1a365d;
          font-size: 15px;
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
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
        .form-group input, .form-group textarea {
          padding: 10px 14px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          font-family: inherit;
        }
        .form-group input:focus, .form-group textarea:focus {
          outline: none;
          border-color: #7FFF00;
        }
        .success-message {
          padding: 12px;
          background: #dcfce7;
          color: #166534;
          border-radius: 6px;
          font-size: 14px;
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
        @media (max-width: 768px) {
          .contact-content {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}