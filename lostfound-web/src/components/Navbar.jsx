import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import api from '../services/api';

export default function Navbar({ isAuthenticated, user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch notifications
  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
      const interval = setInterval(fetchUnreadCount, 30000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const fetchNotifications = async () => {
    try {
      const response = await api.get('/notifications/');
      setNotifications(response.data?.results || response.data || []);
    } catch (e) { /* silent */ }
  };

  const fetchUnreadCount = async () => {
    try {
      const response = await api.get('/notifications/unread_count/');
      setUnreadCount(response.data?.unread_count || 0);
    } catch (e) { /* silent */ }
  };

  const markAsRead = async (id) => {
    try {
      await api.post(`/notifications/${id}/mark_read/`);
      fetchNotifications();
      fetchUnreadCount();
    } catch (e) { /* silent */ }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setIsDropdownOpen(false);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/items', label: 'Browse', icon: '🔍' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🏫</span>
          <div className="logo-text">
            <span className="logo-name">Vignan University</span>
            <span className="logo-sub">Lost & Found</span>
          </div>
        </Link>

        <div className="navbar-links">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className={`nav-link ${isActive(link.path) ? 'active' : ''}`}>
              <span className="nav-icon">{link.icon}</span>
              {link.label}
            </Link>
          ))}

          {isAuthenticated ? (
            <>
              <Link to="/report-lost" className={`nav-link nav-link-lost ${isActive('/report-lost') ? 'active' : ''}`}>
                <span className="nav-icon">❌</span> Report Lost
              </Link>
              <Link to="/report-found" className={`nav-link nav-link-found ${isActive('/report-found') ? 'active' : ''}`}>
                <span className="nav-icon">✅</span> Report Found
              </Link>

              {/* Notification Bell */}
              <div className="notification-bell" ref={notifRef}>
                <button className="notif-btn" onClick={() => { setIsNotifOpen(!isNotifOpen); fetchNotifications(); }}>
                  <span>🔔</span>
                  {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
                </button>
                {isNotifOpen && (
                  <div className="notif-dropdown">
                    <div className="notif-header">
                      <strong>Notifications</strong>
                      <button className="notif-mark-all" onClick={async () => {
                        await api.post('/notifications/mark_all_read/');
                        setUnreadCount(0);
                        fetchNotifications();
                      }}>Mark all read</button>
                    </div>
                    {notifications.length === 0 ? (
                      <div className="notif-empty">No notifications</div>
                    ) : (
                      notifications.slice(0, 10).map(n => (
                        <div key={n.id} className={`notif-item ${!n.is_read ? 'unread' : ''}`} onClick={() => { if (!n.is_read) markAsRead(n.id); }}>
                          <div className="notif-title">{n.title}</div>
                          <div className="notif-msg">{n.message}</div>
                          <div className="notif-time">{new Date(n.created_at).toLocaleDateString()}</div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* User Dropdown */}
              <div className="user-dropdown" ref={dropdownRef}>
                <button className="user-dropdown-btn" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <span className="user-avatar">👤</span>
                  <span className="user-name">{user?.first_name || user?.username}</span>
                  <span className="dropdown-arrow">▾</span>
                </button>
                {isDropdownOpen && (
                  <div className="user-dropdown-menu">
                    <div className="dropdown-header">
                      <span className="dropdown-avatar">👤</span>
                      <div>
                        <strong>{user?.first_name} {user?.last_name}</strong>
                        <span>{user?.email}</span>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <Link to="/dashboard" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}><span>📊</span> Dashboard</Link>
                    <Link to="/profile" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}><span>👤</span> Profile</Link>
                    <Link to="/settings" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}><span>⚙️</span> Settings</Link>
                    <div className="dropdown-divider"></div>
                    <Link to="/about" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}><span>ℹ️</span> About</Link>
                    <Link to="/faq" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}><span>❓</span> FAQ</Link>
                    <Link to="/contact" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}><span>📧</span> Contact</Link>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item dropdown-logout" onClick={handleLogout}><span>🚪</span> Logout</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/login" className="nav-link nav-link-login">Login</Link>
              <Link to="/register" className="nav-link nav-link-register">Register</Link>
            </>
          )}
        </div>

        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
            <span></span><span></span><span></span>
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-link" onClick={() => setIsMenuOpen(false)}>🏠 Home</Link>
          <Link to="/items" className="mobile-link" onClick={() => setIsMenuOpen(false)}>🔍 Browse</Link>
          {isAuthenticated ? (
            <>
              <Link to="/report-lost" className="mobile-link mobile-link-lost" onClick={() => setIsMenuOpen(false)}>❌ Report Lost</Link>
              <Link to="/report-found" className="mobile-link mobile-link-found" onClick={() => setIsMenuOpen(false)}>✅ Report Found</Link>
              <div className="mobile-divider"></div>
              <Link to="/dashboard" className="mobile-link" onClick={() => setIsMenuOpen(false)}>📊 Dashboard</Link>
              <Link to="/profile" className="mobile-link" onClick={() => setIsMenuOpen(false)}>👤 Profile</Link>
              <Link to="/settings" className="mobile-link" onClick={() => setIsMenuOpen(false)}>⚙️ Settings</Link>
              <div className="mobile-divider"></div>
              <Link to="/about" className="mobile-link" onClick={() => setIsMenuOpen(false)}>ℹ️ About</Link>
              <Link to="/faq" className="mobile-link" onClick={() => setIsMenuOpen(false)}>❓ FAQ</Link>
              <Link to="/contact" className="mobile-link" onClick={() => setIsMenuOpen(false)}>📧 Contact</Link>
              <button className="mobile-link mobile-logout" onClick={handleLogout}>🚪 Logout</button>
            </>
          ) : (
            <>
              <Link to="/about" className="mobile-link" onClick={() => setIsMenuOpen(false)}>ℹ️ About</Link>
              <Link to="/login" className="mobile-link mobile-login" onClick={() => setIsMenuOpen(false)}>🔐 Login</Link>
              <Link to="/register" className="mobile-link mobile-register" onClick={() => setIsMenuOpen(false)}>✍️ Register</Link>
            </>
          )}
        </div>
      )}

      <style>{`
        .navbar {
          background: #1a365d;
          border-bottom: 3px solid #7FFF00;
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 64px;
        }
        .navbar-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0; }
        .logo-icon { font-size: 28px; }
        .logo-text { display: flex; flex-direction: column; line-height: 1.2; }
        .logo-name { font-size: 18px; font-weight: 600; color: white; letter-spacing: -0.01em; }
        .logo-sub { font-size: 10px; color: #7FFF00; font-weight: 500; letter-spacing: 0.02em; }
        .navbar-links { display: flex; align-items: center; gap: 4px; flex: 1; justify-content: flex-end; }
        .nav-link { display: flex; align-items: center; gap: 6px; padding: 8px 14px; color: rgba(255,255,255,0.7); text-decoration: none; font-size: 14px; font-weight: 500; border-radius: 6px; transition: all 0.15s ease; white-space: nowrap; }
        .nav-link:hover { color: white; background: rgba(255,255,255,0.08); }
        .nav-link.active { color: white; background: rgba(127,255,0,0.15); }
        .nav-icon { font-size: 16px; }
        .nav-link-lost { color: #fca5a5; }
        .nav-link-lost:hover { color: #fca5a5; background: rgba(252,165,165,0.1); }
        .nav-link-found { color: #86efac; }
        .nav-link-found:hover { color: #86efac; background: rgba(134,239,172,0.1); }
        .nav-link-login { color: rgba(255,255,255,0.8); }
        .nav-link-login:hover { color: white; background: rgba(255,255,255,0.08); }
        .nav-link-register { background: #7FFF00; color: #1a365d; padding: 8px 18px; }
        .nav-link-register:hover { background: #6ee600; color: #1a365d; }

        /* Notification Bell */
        .notification-bell { position: relative; }
        .notif-btn { position: relative; background: none; border: none; padding: 8px; cursor: pointer; font-size: 18px; color: rgba(255,255,255,0.7); border-radius: 6px; transition: all 0.15s ease; }
        .notif-btn:hover { color: white; background: rgba(255,255,255,0.08); }
        .notif-badge { position: absolute; top: 2px; right: 2px; background: #dc2626; color: white; font-size: 10px; font-weight: 600; min-width: 16px; height: 16px; border-radius: 8px; display: flex; align-items: center; justify-content: center; padding: 0 4px; }
        .notif-dropdown { position: absolute; top: calc(100% + 8px); right: 0; min-width: 320px; max-height: 400px; overflow-y: auto; background: white; border-radius: 8px; box-shadow: 0 8px 24px rgba(0,0,0,0.12); border: 1px solid #eaeef2; z-index: 1001; }
        .notif-header { padding: 12px 16px; border-bottom: 1px solid #eaeef2; display: flex; justify-content: space-between; align-items: center; }
        .notif-header strong { font-size: 14px; color: #1a365d; }
        .notif-mark-all { font-size: 12px; color: #2563eb; background: none; border: none; cursor: pointer; }
        .notif-empty { padding: 24px; text-align: center; color: #9ca3af; font-size: 14px; }
        .notif-item { padding: 12px 16px; border-bottom: 1px solid #f3f4f6; cursor: pointer; transition: background 0.1s ease; }
        .notif-item:hover { background: #f8f9fa; }
        .notif-item.unread { background: #f0fdf4; }
        .notif-title { font-size: 14px; font-weight: 500; color: #1a365d; }
        .notif-msg { font-size: 13px; color: #6b7280; margin-top: 2px; }
        .notif-time { font-size: 11px; color: #9ca3af; margin-top: 4px; }

        .user-dropdown { position: relative; }
        .user-dropdown-btn { display: flex; align-items: center; gap: 8px; padding: 6px 12px 6px 8px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; color: white; cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.15s ease; }
        .user-dropdown-btn:hover { background: rgba(255,255,255,0.1); }
        .user-avatar { font-size: 20px; }
        .user-name { max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .dropdown-arrow { font-size: 10px; opacity: 0.6; }
        .user-dropdown-menu { position: absolute; top: calc(100% + 8px); right: 0; min-width: 240px; background: white; border-radius: 8px; box-shadow: 0 8px 24px rgba(0,0,0,0.12); border: 1px solid #eaeef2; overflow: hidden; animation: dropdownSlide 0.15s ease; }
        @keyframes dropdownSlide { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        .dropdown-header { display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: #f8f9fa; }
        .dropdown-avatar { font-size: 32px; }
        .dropdown-header strong { display: block; font-size: 14px; color: #1a365d; }
        .dropdown-header span { display: block; font-size: 12px; color: #6b7280; }
        .dropdown-divider { height: 1px; background: #eaeef2; margin: 4px 0; }
        .dropdown-item { display: flex; align-items: center; gap: 10px; padding: 10px 16px; color: #374151; text-decoration: none; font-size: 14px; background: none; border: none; cursor: pointer; width: 100%; text-align: left; transition: background 0.1s ease; }
        .dropdown-item:hover { background: #f3f4f6; }
        .dropdown-item span:first-child { font-size: 16px; width: 24px; text-align: center; }
        .dropdown-logout { color: #dc2626; }
        .dropdown-logout:hover { background: #fef2f2; }

        .mobile-menu-btn { display: none; background: none; border: none; padding: 8px; cursor: pointer; }
        .hamburger { display: flex; flex-direction: column; gap: 4px; width: 24px; }
        .hamburger span { display: block; height: 2px; background: white; border-radius: 2px; transition: all 0.25s ease; }
        .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(4px, 4px); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(4px, -4px); }

        .mobile-menu { display: none; background: #142b4a; padding: 8px 16px 16px; border-top: 1px solid rgba(255,255,255,0.06); }
        .mobile-link { display: block; padding: 10px 12px; color: rgba(255,255,255,0.7); text-decoration: none; font-size: 15px; border-radius: 6px; transition: all 0.15s ease; }
        .mobile-link:hover { color: white; background: rgba(255,255,255,0.06); }
        .mobile-link-lost { color: #fca5a5; }
        .mobile-link-found { color: #86efac; }
        .mobile-link-login { color: rgba(255,255,255,0.8); }
        .mobile-link-register { color: #7FFF00; font-weight: 500; }
        .mobile-logout { color: #fca5a5; background: none; border: none; width: 100%; text-align: left; font-size: 15px; cursor: pointer; margin-top: 4px; }
        .mobile-logout:hover { background: rgba(252,165,165,0.08); }
        .mobile-divider { height: 1px; background: rgba(255,255,255,0.06); margin: 6px 0; }

        @media (max-width: 992px) {
          .navbar-links { display: none; }
          .mobile-menu-btn { display: block; }
          .mobile-menu { display: block; }
        }
        @media (max-width: 480px) {
          .logo-name { font-size: 16px; }
          .logo-sub { font-size: 9px; }
          .navbar-container { height: 56px; }
        }
      `}</style>
    </nav>
  );
}