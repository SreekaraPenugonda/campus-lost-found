import { useState } from 'react';

const faqs = [
  { q: "How do I report a lost item?", a: "Click 'Report Lost' in the navigation menu, fill in the details about your item including where and when you lost it, and submit. You'll need to be logged in." },
  { q: "How do I report a found item?", a: "Click 'Report Found' in the navigation menu, describe the item you found, where you found it, and submit so the owner can claim it." },
  { q: "How does the matching system work?", a: "Our AI-powered system automatically compares lost and found items based on category, location, brand, color, and keywords. When a match is found, both parties are notified." },
  { q: "How do I claim an item?", a: "Go to the item detail page and click 'Claim This Item'. Provide proof details describing why the item belongs to you (serial numbers, unique marks, etc.)." },
  { q: "Is my data safe?", a: "Yes! We use encryption, JWT authentication, and only verified @vignan.ac.in emails can use the system. Your personal data is never shared publicly." },
  { q: "How do I reset my password?", a: "Go to the login page and click 'Forgot password?'. Enter your registered email and you'll receive an OTP to reset your password." },
  { q: "How long does it take to find a match?", a: "Average recovery time is under 24 hours. Our system sends instant notifications when potential matches are found." },
  { q: "Can I report anonymously?", a: "Yes! You can enable anonymous mode when reporting items. Your identity will be hidden from other users." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="faq-page">
      <div className="faq-header">
        <h1>❓ Frequently Asked Questions</h1>
        <p>Everything you need to know about Vignan Lost & Found</p>
      </div>

      <div className="faq-list">
        {faqs.map((faq, i) => (
          <div key={i} className={`faq-item ${openIndex === i ? 'open' : ''}`}>
            <button className="faq-question" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
              <span>{faq.q}</span>
              <span className="faq-arrow">{openIndex === i ? '▾' : '▸'}</span>
            </button>
            {openIndex === i && (
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <style>{`
        .faq-page { max-width: 800px; margin: 0 auto; padding: 0 16px 40px; }
        .faq-header { text-align: center; margin-bottom: 32px; }
        .faq-header h1 { font-size: 28px; color: #1a365d; margin: 0 0 8px; }
        .faq-header p { color: #6b7280; margin: 0; }
        .faq-list { background: white; border-radius: 8px; border: 1px solid #eaeef2; overflow: hidden; }
        .faq-item { border-bottom: 1px solid #eaeef2; }
        .faq-item:last-child { border-bottom: none; }
        .faq-question { width: 100%; padding: 16px 20px; background: none; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-size: 15px; color: #1a365d; font-weight: 500; text-align: left; transition: background 0.15s ease; }
        .faq-question:hover { background: #f8f9fa; }
        .faq-arrow { font-size: 14px; color: #7FFF00; transition: transform 0.2s ease; }
        .faq-item.open .faq-arrow { transform: rotate(0deg); }
        .faq-answer { padding: 0 20px 16px; }
        .faq-answer p { color: #6b7280; line-height: 1.6; margin: 0; }
      `}</style>
    </div>
  );
}