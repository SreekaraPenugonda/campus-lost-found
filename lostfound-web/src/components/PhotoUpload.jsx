import { useState } from 'react';

export default function PhotoUpload({ onUpload, images = [] }) {
  const [previews, setPreviews] = useState(images);

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newPreviews = files.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));

    const updated = [...previews, ...newPreviews].slice(0, 5); // Max 5 photos
    setPreviews(updated);
    onUpload(updated.map(p => p.file));
  };

  const removeImage = (index) => {
    const updated = previews.filter((_, i) => i !== index);
    setPreviews(updated);
    onUpload(updated.map(p => p.file));
  };

  return (
    <div className="photo-upload">
      <label className="upload-area">
        <span className="upload-icon">📸</span>
        <p className="upload-text">Upload Photo</p>
        <p className="upload-hint">Front, back, or unique marks</p>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleChange}
          style={{ display: 'none' }}
        />
      </label>

      {previews.length > 0 && (
        <div className="photo-previews">
          {previews.map((preview, index) => (
            <div key={index} className="photo-preview">
              <img src={preview.url} alt={`Preview ${index + 1}`} />
              <button
                type="button"
                className="remove-photo"
                onClick={() => removeImage(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .photo-upload { margin-bottom: 16px; }
        .upload-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 32px;
          border: 2px dashed #d1d5db;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          background: #f9fafb;
        }
        .upload-area:hover {
          border-color: #7FFF00;
          background: #f0fdf4;
        }
        .upload-icon { font-size: 48px; margin-bottom: 8px; }
        .upload-text { font-size: 16px; font-weight: 600; color: #1a365d; margin: 0; }
        .upload-hint { font-size: 13px; color: #6b7280; margin: 4px 0 0; }
        .photo-previews {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 12px;
          margin-top: 16px;
        }
        .photo-preview {
          position: relative;
          aspect-ratio: 1;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #eaeef2;
        }
        .photo-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .remove-photo {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 24px;
          height: 24px;
          background: rgba(239, 68, 68, 0.9);
          color: white;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .remove-photo:hover {
          background: #dc2626;
        }
      `}</style>
    </div>
  );
}