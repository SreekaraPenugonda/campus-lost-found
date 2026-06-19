import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'How do I report a lost item?',
      a: 'Click "Report Lost Item" on the homepage. Fill in the details (takes 30 seconds). No account required - just provide your email or phone number.'
    },
    {
      q: 'Do I need to create an account?',
      a: 'No! You can report items as a guest. Just provide your contact information. Creating an account is optional but gives you access to your dashboard and match history.'
    },
    {
      q: 'How does the matching system work?',
      a: 'Our AI automatically compares lost items with found items based on category, location, color, brand, and description. When a match is found, both parties are notified.'
    },
    {
      q: 'Is my personal information safe?',
      a: 'Yes. Your contact information is only shared when you choose to connect with someone. Until then, all communication is anonymous through our secure chat system.'
    },
    {
      q: 'How long does it take to find a match?',
      a: 'Most matches are found within 24 hours. The system checks for matches every time a new item is reported.'
    },
    {
      q: 'What if I found an item?',
      a: 'Click "Report Found Item" and provide the details. The system will automatically search for matching lost items and notify the owner.'
    },
    {
      q: 'Can I delete my report?',
      a: 'Yes. Go to your dashboard, find the item, and click "Delete". The item will be removed from the system.'
    },
    {
      q: 'What if someone claims my found item is theirs?',
      a: 'Use our ownership verification system. The claimant must answer questions about the item to prove ownership before you share your contact details.'
    }
  ];

  return (
    <div className="faq-page">
      <div className="faq-container">
        <h1>Frequently Asked Questions</h1>
        <p className="faq-subtitle">Everything you need to know about Vignan Lost & Found</p>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? 'open' : ''}`}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="faq-question">
                <h3>{faq.q}</h3>
                <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
              </div>
              {openIndex === index && (
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="faq-cta">
          <p>Still have questions?</p>
          <Link to="/contact" className="btn-primary">Contact Us</Link>
        </div>
      </div>

      <style>{`
        .faq-page {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 16px;
        }
        .faq-container {
          background: white;
          border-radius: 12px;
          border: 1px solid #eaeef2;
          padding: 40px;
        }
        .faq-container h1 {
          font-size: 32px;
          color: #1a365d;
          margin: 0 0 8px;
          text-align: center;
        }
        .faq-subtitle {
          text-align: center;
          color: #6b7280;
          margin: 0 0 32px;
        }
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 40px;
        }
        .faq-item {
          border: 1px solid #eaeef2;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .faq-item:hover {
          border-color: #7FFF00;
        }
        .faq-item.open {
          border-color: #7FFF00;
          background: #f0fdf4;
        }
        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
        }
        .faq-question h3 {
          margin: 0;
          font-size: 16px;
          color: #1a365d;
          flex: 1;
        }
        .faq-icon {
          width: 24px;
          height: 24px;
          background: #7FFF00;
          color: #1a365d;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 600;
          flex-shrink: 0;
          margin-left: 16px;
        }
        .faq-answer {
          padding: 0 16px 16px;
          color: #6b7280;
          line-height: 1.6;
        }
        .faq-answer p {
          margin: 0;
        }
        .faq-cta {
          text-align: center;
          padding-top: 32px;
          border-top: 1px solid #eaeef2;
        }
        .faq-cta p {
          margin: 0 0 16px;
          color: #6b7280;
        }
        .btn-primary {
          display: inline-block;
          padding: 12px 24px;
          background: #7FFF00;
          color: #1a365d;
          text-decoration: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}