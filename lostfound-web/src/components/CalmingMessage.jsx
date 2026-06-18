// components/CalmingMessage.jsx
export default function CalmingMessage({ type }) {
  const messages = {
    lost: [
      "💙 Don't worry, most items are found within 24 hours.",
      "💪 You're doing the right thing by reporting it.",
      "🌟 Thousands of items are reunited every day.",
      "🤝 You're not alone in this - we're here to help.",
      "⏰ The sooner you report, the better the chance.",
      "📱 Your item is now visible to hundreds of finders."
    ],
    found: [
      "🌟 You're about to make someone very happy!",
      "💙 Your kindness is appreciated.",
      "🤝 Thank you for being a good campus citizen.",
      "🎉 Someone is going to be relieved!"
    ],
    match: [
      "🎉 Great news! A potential match was found!",
      "💙 Hope is on the horizon.",
      "🤞 Fingers crossed - this could be it!",
      "🌟 We're getting closer to reuniting you!"
    ],
    resolved: [
      "🎉 Congratulations! Your item has been found!",
      "💙 Happy endings are the best.",
      "🌟 You're part of the success story!"
    ]
  };

  const randomMessage = messages[type] 
    ? messages[type][Math.floor(Math.random() * messages[type].length)]
    : '💙 We\'re here to help you.';

  return (
    <div className="calming-message">
      <p>{randomMessage}</p>

      <style>{`
        .calming-message {
          padding: 16px 20px;
          border-radius: 12px;
          background: #f0fdf4;
          border: 1px solid #86efac;
          margin: 12px 0;
        }

        .calming-message p {
          font-size: 16px;
          color: #166534;
          margin: 0;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}