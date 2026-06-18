// components/VisualSearch.jsx
export default function VisualSearch() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
      performSearch(file);
    }
  };

  const performSearch = async (file) => {
    setLoading(true);
    // In production: Send image to AI for matching
    setTimeout(() => {
      setResults([
        { title: 'Black Laptop', confidence: 89 },
        { title: 'Dell XPS 13', confidence: 76 },
        { title: 'Laptop Bag', confidence: 62 }
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="visual-search">
      <div className="upload-area">
        {preview ? (
          <div className="preview-container">
            <img src={preview} alt="Uploaded item" />
            <button onClick={() => setPreview(null)}>✕</button>
          </div>
        ) : (
          <label className="upload-label">
            <span className="upload-icon">📸</span>
            <p>Upload Photo to Find</p>
            <span className="upload-hint">AI will match your item</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              hidden
            />
          </label>
        )}
      </div>

      {loading && (
        <div className="search-loading">
          <div className="loading-spinner"></div>
          <p>AI is analyzing your photo...</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="visual-results">
          <h3>Potential Matches</h3>
          {results.map((result, index) => (
            <div key={index} className="result-item">
              <span>{result.title}</span>
              <span className="confidence">{result.confidence}% match</span>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .visual-search {
          background: white;
          border-radius: 12px;
          padding: 24px;
          border: 2px dashed #eaeef2;
          text-align: center;
        }

        .upload-area {
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .upload-label {
          cursor: pointer;
          padding: 40px 20px;
          border-radius: 12px;
          transition: all 0.2s ease;
          width: 100%;
        }

        .upload-label:hover {
          background: #f8f9fa;
        }

        .upload-icon {
          font-size: 48px;
          display: block;
          margin-bottom: 8px;
        }

        .upload-label p {
          font-size: 16px;
          font-weight: 500;
          color: #1a365d;
          margin: 0;
        }

        .upload-hint {
          font-size: 13px;
          color: #6b7280;
        }

        .preview-container {
          position: relative;
          display: inline-block;
        }

        .preview-container img {
          max-height: 200px;
          border-radius: 8px;
          border: 2px solid #7FFF00;
        }

        .preview-container button {
          position: absolute;
          top: -10px;
          right: -10px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: none;
          background: #dc2626;
          color: white;
          cursor: pointer;
          font-size: 16px;
        }

        .search-loading {
          margin-top: 16px;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #eaeef2;
          border-top-color: #7FFF00;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 8px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .visual-results {
          margin-top: 16px;
          text-align: left;
        }

        .visual-results h3 {
          font-size: 16px;
          color: #1a365d;
          margin: 0 0 12px 0;
        }

        .result-item {
          display: flex;
          justify-content: space-between;
          padding: 10px 12px;
          border-bottom: 1px solid #f3f4f6;
        }

        .confidence {
          font-weight: 500;
          color: #7FFF00;
        }
      `}</style>
    </div>
  );
}