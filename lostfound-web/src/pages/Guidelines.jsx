export default function Guidelines() {
  return (
    <div className="guidelines-page">
      <div className="guidelines-header">
        <h1>📋 Reporting Guidelines</h1>
        <p>Follow these guidelines to ensure accurate and helpful reports</p>
      </div>

      <div className="guidelines-content">
        <section className="guide-section">
          <h2>✅ DO's</h2>
          <ul>
            <li><strong>Be specific:</strong> Include brand, color, model, and unique marks</li>
            <li><strong>Add location:</strong> Building name and room number help a lot</li>
            <li><strong>Use photos:</strong> A picture helps identify items faster</li>
            <li><strong>Report quickly:</strong> The sooner you report, the better the chance of recovery</li>
            <li><strong>Check regularly:</strong> Monitor your dashboard for matches and notifications</li>
            <li><strong>Be honest:</strong> Provide accurate details for verification</li>
          </ul>
        </section>

        <section className="guide-section">
          <h2>❌ DON'Ts</h2>
          <ul>
            <li><strong>Don't fake reports:</strong> False reports waste community time</li>
            <li><strong>Don't share others' info:</strong> Respect privacy of other users</li>
            <li><strong>Don't claim without proof:</strong> You must verify ownership</li>
            <li><strong>Don't delete reports:</strong> Keep records for reference</li>
          </ul>
        </section>

        <section className="guide-section">
          <h2>📱 Reporting a Lost Item</h2>
          <ol>
            <li>Click <strong>"Report Lost"</strong> in the navigation</li>
            <li>Select the appropriate category</li>
            <li>Fill in title, description, and details</li>
            <li>Add location (building, room if known)</li>
            <li>Set urgency level (High/Medium/Low)</li>
            <li>Submit and monitor your dashboard</li>
          </ol>
        </section>

        <section className="guide-section">
          <h2>✅ Reporting a Found Item</h2>
          <ol>
            <li>Click <strong>"Report Found"</strong> in the navigation</li>
            <li>Select category matching the item</li>
            <li>Describe the item accurately</li>
            <li>Add where and when you found it</li>
            <li>Submit - the owner will be notified if matched</li>
          </ol>
        </section>

        <section className="guide-section">
          <h2>🎯 Matching Process</h2>
          <p>Our system automatically matches items based on:</p>
          <ul>
            <li>Category (40 points)</li>
            <li>Building location (25 points)</li>
            <li>Brand name (15 points)</li>
            <li>Color (10 points)</li>
            <li>Keyword matching (10 points)</li>
          </ul>
          <p>A match score above 50% triggers notifications to both parties.</p>
        </section>

        <section className="guide-section">
          <h2>💬 Communication Etiquette</h2>
          <ul>
            <li>Be polite and respectful in chat</li>
            <li>Ask for verification details to confirm ownership</li>
            <li>Meet in public, secure locations on campus</li>
            <li>Bring your ID when meeting</li>
            <li>Report any suspicious behavior</li>
          </ul>
        </section>
      </div>

      <style>{`
        .guidelines-page { max-width: 900px; margin: 0 auto; padding: 0 16px 40px; }
        .guidelines-header { text-align: center; margin-bottom: 32px; }
        .guidelines-header h1 { font-size: 28px; color: #1a365d; margin: 0 0 8px; }
        .guidelines-header p { color: #6b7280; margin: 0; }
        .guidelines-content { background: white; border-radius: 12px; padding: 32px; border: 1px solid #eaeef2; }
        .guide-section { margin-bottom: 28px; }
        .guide-section:last-child { margin-bottom: 0; }
        .guide-section h2 { font-size: 20px; color: #1a365d; margin: 0 0 12px; }
        .guide-section ul, .guide-section ol { color: #4b5563; line-height: 1.8; padding-left: 24px; }
        .guide-section li { margin-bottom: 6px; }
        .guide-section strong { color: #1a365d; }
      `}</style>
    </div>
  );
}