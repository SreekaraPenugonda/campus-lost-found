import { Link } from 'react-router-dom';

export default function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🔍</span>
          <span className="logo-text">Lost & Found</span>
        </Link>

        <div className="nav-links">
          <Link to="/items">Browse</Link>
          <Link to="/report-lost">Report Lost</Link>
          <Link to="/report-found">Report Found</Link>
          <Link to="/guidelines">Guidelines</Link>
          <Link to="/faq">FAQ</Link>
        </div>

        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="btn-nav">Dashboard</Link>
              <Link to="/profile" className="btn-nav">Profile</Link>
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-nav">Login</Link>
              <Link to="/register" className="btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>

      <style>{`
        .navbar {
          background: white;
          border-bottom: 1px solid #eaeef2;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: #1a365d;
        }
        .logo-icon {
          font-size: 24px;
        }
        .logo-text {
          font-size: 18px;
          font-weight: 700;
        }
        .nav-links {
          display: flex;
          gap: 24px;
        }
        .nav-links a {
          color: #6b7280;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        .nav-links a:hover {
          color: #7FFF00;
        }
        .nav-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .btn-nav {
          padding: 8px 16px;
          color: #1a365d;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          border-radius: 6px;
          transition: all 0.2s ease;
        }
        .btn-nav:hover {
          background: #f0fdf4;
        }
        .btn-primary {
          padding: 8px 16px;
          background: #7FFF00;
          color: #1a365d;
          text-decoration: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
        }
        .btn-primary:hover {
          background: #6de600;
        }
        .btn-logout {
          padding: 8px 16px;
          background: white;
          color: #6b7280;
          border: 1px solid #eaeef2;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
        }
        .btn-logout:hover {
          border-color: #ef4444;
          color: #ef4444;
        }
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
}