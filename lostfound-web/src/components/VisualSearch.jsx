import { useState } from 'react';

export default function VisualSearch({ onSearch }) {
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    { id: 'ELECTRONICS', icon: '📱', label: 'Electronics', color: '#dbeafe' },
    { id: 'BOOKS', icon: '📚', label: 'Books', color: '#fef3c7' },
    { id: 'ID_CARDS', icon: '🪪', label: 'ID Cards', color: '#fce7f3' },
    { id: 'BAGS', icon: '🎒', label: 'Bags', color: '#e0e7ff' },
    { id: 'CLOTHING', icon: '👕', label: 'Clothing', color: '#d1fae5' },
    { id: 'KEYS', icon: '🔑', label: 'Keys', color: '#fee2e2' },
    { id: 'WALLET', icon: '👛', label: 'Wallet', color: '#fef3c7' },
    { id: 'OTHER', icon: '📦', label: 'Other', color: '#f3f4f6' }
  ];

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    if (onSearch) onSearch(categoryId);
  };

  return (
    <div className="visual-search">
      <div className="visual-header">
        <h3>🔍 Browse by Category</h3>
        <p>Click a category to see items</p>
      </div>

      <div className="category-grid">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-card ${selectedCategory === cat.id ? 'selected' : ''}`}
            style={{ background: cat.color }}
            onClick={() => handleCategoryClick(cat.id)}
          >
            <span className="category-icon">{cat.icon}</span>
            <span className="category-label">{cat.label}</span>
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div className="selected-info">
          <p>Showing: <strong>{categories.find(c => c.id === selectedCategory)?.label}</strong></p>
        </div>
      )}

      <style>{`
        .visual-search {
          background: white;
          padding: 24px;
          border-radius: 12px;
          border: 1px solid #eaeef2;
        }
        .visual-header {
          text-align: center;
          margin-bottom: 20px;
        }
        .visual-header h3 {
          font-size: 18px;
          color: #1a365d;
          margin: 0 0 4px;
        }
        .visual-header p {
          font-size: 13px;
          color: #6b7280;
          margin: 0;
        }
        .category-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .category-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px 12px;
          border: 2px solid transparent;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          background: white;
        }
        .category-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border-color: #7FFF00;
        }
        .category-card.selected {
          border-color: #7FFF00;
          box-shadow: 0 0 0 3px rgba(127, 255, 0, 0.2);
        }
        .category-icon {
          font-size: 32px;
          margin-bottom: 8px;
        }
        .category-label {
          font-size: 13px;
          font-weight: 600;
          color: #1a365d;
        }
        .selected-info {
          margin-top: 16px;
          padding: 12px;
          background: #f0fdf4;
          border-radius: 8px;
          text-align: center;
          color: #166534;
          font-size: 14px;
        }
        @media (max-width: 600px) {
          .category-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}