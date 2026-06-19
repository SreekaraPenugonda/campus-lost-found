import { useState } from 'react';

export default function OwnershipVerification({ item, onVerify }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    { id: 'color', question: 'What color is the item?', hint: 'e.g., Black, Blue, Red' },
    { id: 'mark', question: 'What unique mark or damage does it have?', hint: 'e.g., Scratch on corner, Sticker, Engraving' },
    { id: 'location', question: 'Where exactly did you lose it?', hint: 'e.g., Near the entrance, 2nd floor' },
    { id: 'brand', question: 'What brand is it? (if applicable)', hint: 'e.g., Samsung, Nike, Apple' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (onVerify) onVerify(answers);
  };

  const getScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (answers[q.id]?.trim()) score += 25;
    });
    return score;
  };

  const score = getScore();

  return (
    <div className="ownership-verification">
      <div className="verification-header">
        <span className="verification-icon">🔐</span>
        <div>
          <h3>Verify Ownership</h3>
          <p>Answer these questions to prove this item is yours</p>
        </div>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="verification-form">
          {questions.map(q => (
            <div key={q.id} className="question-group">
              <label>{q.question}</label>
              <input
                type="text"
                placeholder={q.hint}
                value={answers[q.id] || ''}
                onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                required
              />
            </div>
          ))}

          <div className="verification-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${score}%` }} />
            </div>
            <span className="progress-text">{score}% complete</span>
          </div>

          <button type="submit" className="btn-primary" disabled={score < 75}>
            Submit for Verification
          </button>
          <p className="verification-hint">Answer at least 3 questions to submit</p>
        </form>
      ) : (
        <div className="verification-success">
          <div className="success-icon">✅</div>
          <h4>Verification Submitted!</h4>
          <p>Your answers have been sent to the finder. You'll be connected if they match.</p>
        </div>
      )}

      <style>{`
        .ownership-verification {
          background: white;
          padding: 24px;
          border-radius: 12px;
          border: 1px solid #eaeef2;
        }
        .verification-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .verification-icon {
          font-size: 32px;
        }
        .verification-header h3 {
          margin: 0;
          font-size: 18px;
          color: #1a365d;
        }
        .verification-header p {
          margin: 4px 0 0;
          font-size: 13px;
          color: #6b7280;
        }
        .verification-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .question-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .question-group label {
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }
        .question-group input {
          padding: 10px 14px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
        }
        .question-group input:focus {
          outline: none;
          border-color: #7FFF00;
        }
        .verification-progress {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .progress-bar {
          flex: 1;
          height: 8px;
          background: #eaeef2;
          border-radius: 4px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: #7FFF00;
          transition: width 0.3s ease;
        }
        .progress-text {
          font-size: 13px;
          color: #6b7280;
          font-weight: 600;
        }
        .verification-hint {
          text-align: center;
          font-size: 12px;
          color: #9ca3af;
          margin: 0;
        }
        .verification-success {
          text-align: center;
          padding: 32px;
        }
        .success-icon {
          font-size: 48px;
          margin-bottom: 12px;
        }
        .verification-success h4 {
          margin: 0 0 8px;
          color: #1a365d;
        }
        .verification-success p {
          color: #6b7280;
          font-size: 14px;
          margin: 0;
        }
      `}</style>
    </div>
  );
}