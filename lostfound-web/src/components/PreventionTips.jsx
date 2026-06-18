// components/PreventionTips.jsx
export default function PreventionTips() {
  const tips = [
    { icon: '🏷️', text: 'Attach a label with your contact to valuable items' },
    { icon: '📸', text: 'Take a photo of your important items for reference' },
    { icon: '💻', text: 'Enable tracking features on electronics' },
    { icon: '🎒', text: 'Keep important items in the same place always' },
    { icon: '📱', text: 'Store digital copies of important documents' },
    { icon: '🔑', text: 'Use a keychain with your contact info' },
    { icon: '📚', text: 'Write your name inside books and notebooks' },
    { icon: '👛', text: 'Keep a list of important items in your wallet' }
  ];

  return (
    <div className="prevention-tips">
      <h3>🛡️ Prevent Loss - Smart Tips</h3>
      <div className="tips-grid">
        {tips.map((tip, index) => (
          <div key={index} className="tip-card">
            <span className="tip-icon">{tip.icon}</span>
            <p>{tip.text}</p>
          </div>
        ))}
      </div>

      <style>{`
        .prevention-tips {
          background: white;
          border-radius: 12px;
          padding: 24px;
          border: 1px solid #eaeef2;
        }

        .prevention-tips h3 {
          font-size: 16px;
          color: #1a365d;
          margin: 0 0 16px 0;
        }

        .tips-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .tip-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: #f8f9fa;
          border-radius: 8px;
          border: 1px solid #eaeef2;
        }

        .tip-icon {
          font-size: 24px;
          flex-shrink: 0;
        }

        .tip-card p {
          font-size: 13px;
          color: #374151;
          margin: 0;
          line-height: 1.4;
        }

        @media (max-width: 600px) {
          .tips-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}