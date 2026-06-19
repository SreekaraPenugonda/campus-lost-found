import { Link } from 'react-router-dom';

export default function Guidelines() {
  return (
    <div className="guidelines-page">
      <div className="guidelines-container">
        <h1>📋 Reporting Guidelines</h1>
        <p className="guidelines-subtitle">Follow these guidelines to help us help you</p>

        <div className="guidelines-content">
          <section className="guideline-section">
            <h2>✅ Do's</h2>
            <ul className="guideline-list">
              <li>Provide accurate location details (building, room if known)</li>
              <li>Upload clear photos of the item (front, back, unique marks)</li>
              <li>Include specific details (brand, color, size, distinguishing features)</li>
              <li>Report within 24 hours of losing/finding the item</li>
              <li>Check the "Found" section regularly for your lost items</li>
              <li>Respond promptly to match notifications</li>
              <li>Use the secure chat to verify ownership before meeting</li>
            </ul>
          </section>

          <section className="guideline-section">
            <h2>❌ Don'ts</h2>
            <ul className="guideline-list">
              <li>Don't post false or misleading information</li>
              <li>Don't use the platform for non-campus items</li>
              <li>Don't share personal contact info in public descriptions</li>
              <li>Don't delete and repost the same item repeatedly</li>
              <li>Don't mark items as "Found" unless you actually have them</li>
              <li>Don't attempt to meet in isolated areas</li>
            </ul>
          </section>

          <section className="guideline-section">
            <h2>🔒 Safety Tips</h2>
            <ul className="guideline-list">
              <li>Always meet in public, well-lit areas (cafeteria, library, main building)</li>
              <li>Bring a friend when meeting to exchange items</li>
              <li>Verify ownership details before handing over items</li>
              <li>Report suspicious behavior to campus security</li>
              <li>Use the anonymous chat first - share contact info only when comfortable</li>
            </ul>
          </section>

          <section className="guideline-section">
            <h2>📝 Best Practices</h2>
            <ul className="guideline-list">
              <li><strong>For Lost Items:</strong> Be as specific as possible about when and where you lost it</li>
              <li><strong>For Found Items:</strong> Describe the item without touching it (if possible)</li>
              <li><strong>Photos:</strong> Take photos in good lighting, show all angles</li>
              <li><strong>Description:</strong> Include unique marks, scratches, stickers, engravings</li>
              <li><strong>Category:</strong> Choose the most specific category possible</li>
            </ul>
          </section>
        </div>

        <div className="guidelines-cta">
          <Link to="/report-lost" className="btn-primary">Report Lost Item</Link>
          <Link to="/report-found" className="btn-secondary">Report Found Item</Link>
        </div>
      </div>

      <style>{`
        .guidelines-page {
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 16px;
        }
        .guidelines-container {
          background: white;
          border-radius: 12px;
          border: 1px solid #eaeef2;
          padding: 40px;
        }
        .guidelines-container h1 {
          font-size: 32px;
          color: #1a365d;
          margin: 0 0 8px;
          text-align: center;
        }
        .guidelines-subtitle {
          text-align: center;
          color: #6b7280;
          margin: 0 0 40px;
        }
        .guidelines-content {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-bottom: 40px;
        }
        .guideline-section {
          padding: 24px;
          background: #f8f9fa;
          border-radius: 8px;
        }
        .guideline-section h2 {
          font-size: 18px;
          color: #1a365d;
          margin: 0 0 16px;
        }
        .guideline-list {
          margin: 0;
          padding-left: 20px;
        }
        .guideline-list li {
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 8px;
        }
        .guidelines-cta {
          display: flex;
          gap: 16px;
          justify-content: center;
          padding-top: 32px;
          border-top: 1px solid #eaeef2;
        }
        .btn-primary, .btn-secondary {
          padding: 14px 28px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 15px;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .btn-primary {
          background: #7FFF00;
          color: #1a365d;
        }
        .btn-secondary {
          background: white;
          color: #1a365d;
          border: 2px solid #eaeef2;
        }
        @media (max-width: 768px) {
          .guidelines-content {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}