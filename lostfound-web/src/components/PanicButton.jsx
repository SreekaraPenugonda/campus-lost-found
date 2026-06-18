import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PanicButton() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [calmMode, setCalmMode] = useState(false);

  const startCalmFlow = () => {
    setCalmMode(true);
    setStep(1);
  };

  return (
    <div className="panic-button-container">
      <button onClick={startCalmFlow} className="panic-button">
        <span className="panic-icon">😰</span>
        I Just Lost Something Important
      </button>

      {calmMode && (
        <div className="calm-flow">
          <div className="calm-step">
            <h2>💙 Take a Deep Breath</h2>
            <p>You're in the right place. Most items are found within 24 hours.</p>
            <div className="calm-steps">
              <div className={`calm-step-item ${step >= 1 ? 'completed' : ''} ${step === 1 ? 'active' : ''}`}>
                <span>✅</span> Stay Calm
              </div>
              <div className={`calm-step-item ${step >= 2 ? 'completed' : ''} ${step === 2 ? 'active' : ''}`}>
                <span>⏳</span> Report Your Item
              </div>
              <div className={`calm-step-item ${step >= 3 ? 'completed' : ''} ${step === 3 ? 'active' : ''}`}>
                <span>⏳</span> We'll Notify You
              </div>
              <div className={`calm-step-item ${step >= 4 ? 'completed' : ''} ${step === 4 ? 'active' : ''}`}>
                <span>⏳</span> Reunited! 🎉
              </div>
            </div>
            <button className="btn-primary" onClick={() => navigate('/report-lost')}>
              Report Now →
            </button>
          </div>
        </div>
      )}

      <style>{`
        .panic-button {
          background: linear-gradient(135deg, #7FFF00, #6ee600);
          color: #1a365d;
          padding: 16px 32px;
          border: none;
          border-radius: 12px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 4px 16px rgba(127, 255, 0, 0.3);
        }

        .panic-button:hover {
          transform: scale(1.02);
          box-shadow: 0 6px 24px rgba(127, 255, 0, 0.4);
        }

        .panic-icon {
          font-size: 24px;
        }

        .calm-flow {
          background: white;
          border-radius: 12px;
          padding: 32px;
          margin-top: 20px;
          border: 1px solid #eaeef2;
          animation: slideDown 0.4s ease;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .calm-step h2 {
          font-size: 24px;
          color: #1a365d;
          margin: 0 0 8px 0;
        }

        .calm-step p {
          color: #6b7280;
          margin: 0 0 20px 0;
          font-size: 16px;
        }

        .calm-steps {
          display: flex;
          gap: 16px;
          margin-bottom: 20px;
        }

        .calm-step-item {
          flex: 1;
          padding: 12px;
          text-align: center;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          background: #f3f4f6;
          color: #9ca3af;
        }

        .calm-step-item.completed {
          background: #dcfce7;
          color: #166534;
        }

        .calm-step-item.active {
          background: #7FFF00;
          color: #1a365d;
        }

        @media (max-width: 600px) {
          .calm-steps {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}