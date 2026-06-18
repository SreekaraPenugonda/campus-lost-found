// components/RecoveryTimeline.jsx
export default function RecoveryTimeline({ item }) {
  const timeline = [
    { label: 'Item Lost', date: item?.date_occurred, status: 'done' },
    { label: 'Report Submitted', date: item?.date_reported, status: 'done' },
    { label: 'Searching', date: 'In progress', status: 'active' },
    { label: 'Match Found', date: 'Pending', status: 'pending' },
    { label: 'Reunited! 🎉', date: 'Pending', status: 'pending' }
  ];

  return (
    <div className="recovery-timeline">
      <h3>📅 Recovery Journey</h3>
      <div className="timeline">
        {timeline.map((step, index) => (
          <div key={index} className={`timeline-step ${step.status}`}>
            <div className="step-dot"></div>
            <div className="step-content">
              <span className="step-label">{step.label}</span>
              <span className="step-date">{step.date}</span>
            </div>
            {index < timeline.length - 1 && <div className="step-line"></div>}
          </div>
        ))}
      </div>

      <style>{`
        .recovery-timeline {
          background: white;
          border-radius: 12px;
          padding: 24px;
          border: 1px solid #eaeef2;
        }

        .recovery-timeline h3 {
          font-size: 16px;
          color: #1a365d;
          margin: 0 0 16px 0;
        }

        .timeline {
          position: relative;
        }

        .timeline-step {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 8px 0;
          position: relative;
        }

        .step-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 4px;
          background: #d1d5db;
          border: 2px solid white;
          box-shadow: 0 0 0 2px #d1d5db;
          z-index: 2;
        }

        .timeline-step.done .step-dot {
          background: #16a34a;
          box-shadow: 0 0 0 2px #16a34a;
        }

        .timeline-step.active .step-dot {
          background: #7FFF00;
          box-shadow: 0 0 0 2px #7FFF00;
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        .step-line {
          position: absolute;
          left: 7px;
          top: 28px;
          width: 2px;
          height: calc(100% - 8px);
          background: #d1d5db;
        }

        .timeline-step.done .step-line {
          background: #16a34a;
        }

        .step-content {
          flex: 1;
          padding-bottom: 8px;
        }

        .step-label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #1a365d;
        }

        .step-date {
          display: block;
          font-size: 12px;
          color: #6b7280;
        }

        .timeline-step.pending .step-label {
          color: #9ca3af;
        }

        .timeline-step.pending .step-date {
          color: #d1d5db;
        }
      `}</style>
    </div>
  );
}