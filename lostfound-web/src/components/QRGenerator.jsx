import { useState } from 'react';

export default function QRGenerator({ itemId, itemTitle }) {
  const [showQR, setShowQR] = useState(false);

  const qrUrl = `https://positive-upliftment-production-ecca.up.railway.app/items/${itemId}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrUrl)}`;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `qr-${itemTitle || 'item'}-${itemId}.png`;
    link.click();
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head><title>QR Code - ${itemTitle}</title></head>
        <body style="display:flex;justify-content:center;align-items:center;min-height:100vh;font-family:Arial">
          <div style="text-align:center">
            <h2>${itemTitle}</h2>
            <img src="${qrCodeUrl}" style="width:200px;height:200px" />
            <p>Scan to view item details</p>
            <p style="font-size:12px;color:#666">${qrUrl}</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="qr-generator">
      <button
        type="button"
        className="btn-secondary qr-btn"
        onClick={() => setShowQR(!showQR)}
      >
        🏷️ Generate QR Tag
      </button>

      {showQR && (
        <div className="qr-modal">
          <div className="qr-content">
            <h3>🏷️ QR Recovery Tag</h3>
            <p className="qr-instructions">
              Stick this QR code on your item. Anyone who finds it can scan and contact you.
            </p>

            <div className="qr-preview">
              <img src={qrCodeUrl} alt="QR Code" />
            </div>

            <div className="qr-actions">
              <button className="btn-primary" onClick={handleDownload}>
                📥 Download PNG
              </button>
              <button className="btn-secondary" onClick={handlePrint}>
                🖨️ Print Label
              </button>
            </div>

            <div className="qr-url">
              <label>Shareable Link:</label>
              <input
                type="text"
                readOnly
                value={qrUrl}
                onClick={(e) => e.target.select()}
              />
              <button
                className="btn-small"
                onClick={() => navigator.clipboard.writeText(qrUrl)}
              >
                Copy
              </button>
            </div>

            <button
              type="button"
              className="btn-close"
              onClick={() => setShowQR(false)}
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}

      <style>{`
        .qr-generator {
          display: inline-block;
        }
        .qr-btn {
          padding: 8px 16px;
          font-size: 13px;
        }
        .qr-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }
        .qr-content {
          background: white;
          padding: 32px;
          border-radius: 12px;
          max-width: 400px;
          width: 100%;
          text-align: center;
        }
        .qr-content h3 {
          margin: 0 0 8px;
          color: #1a365d;
        }
        .qr-instructions {
          color: #6b7280;
          font-size: 14px;
          margin: 0 0 20px;
        }
        .qr-preview {
          background: white;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #eaeef2;
          display: inline-block;
          margin-bottom: 20px;
        }
        .qr-preview img {
          width: 200px;
          height: 200px;
        }
        .qr-actions {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
        }
        .qr-actions button {
          flex: 1;
        }
        .qr-url {
          margin-bottom: 16px;
        }
        .qr-url label {
          display: block;
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 6px;
          text-align: left;
        }
        .qr-url input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 12px;
          margin-bottom: 8px;
        }
        .btn-small {
          padding: 6px 12px;
          background: #7FFF00;
          color: #1a365d;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }
        .btn-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 32px;
          height: 32px;
          background: #f3f4f6;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          font-size: 16px;
        }
        .btn-close:hover {
          background: #e5e7eb;
        }
      `}</style>
    </div>
  );
}