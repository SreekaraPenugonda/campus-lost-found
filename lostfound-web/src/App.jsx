import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import ItemsList from './pages/ItemsList';
import ItemDetail from './pages/ItemDetail';
import ReportLost from './pages/ReportLost';
import ReportFound from './pages/ReportFound';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Guidelines from './pages/Guidelines';
import CampusMap from './components/CampusMap';
import Chat from './components/Chat';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser && parsedUser.id) {
          setIsAuthenticated(true);
          setUser(parsedUser);
        }
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-content">
          <span className="loading-logo">🏫</span>
          <h1>Vignan University</h1>
          <p>Loading...</p>
        </div>
        <style>{`
          .app-loading {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f8f9fa;
          }
          .loading-content {
            text-align: center;
          }
          .loading-logo {
            font-size: 48px;
            display: block;
            margin-bottom: 12px;
          }
          .loading-content h1 {
            font-size: 24px;
            font-weight: 600;
            color: #1a365d;
            margin: 0 0 4px 0;
          }
          .loading-content p {
            color: #6b7280;
            margin: 0;
          }
        `}</style>
      </div>
    );
  }

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="app-wrapper">
        <Navbar isAuthenticated={isAuthenticated} user={user} />
        <main className="app-main">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/items" element={<ItemsList />} />
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/guidelines" element={<Guidelines />} />
            <Route path="/campus-map" element={<CampusMap />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/privacy" element={<StaticPage title="Privacy Policy" />} />
            <Route path="/terms" element={<StaticPage title="Terms of Service" />} />
            <Route path="/change-password" element={<StaticPage title="Change Password" />} />

            {/* Auth Routes */}
            <Route 
              path="/login" 
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <LoginPage setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
                )
              } 
            />
            <Route 
              path="/register" 
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <RegisterPage />
                )
              } 
            />

            {/* Protected Routes */}
            <Route 
              path="/report-lost" 
              element={
                isAuthenticated ? (
                  <ReportLost />
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
            <Route 
              path="/report-found" 
              element={
                isAuthenticated ? (
                  <ReportFound />
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                isAuthenticated ? (
                  <Dashboard user={user} />
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
            <Route 
              path="/profile" 
              element={
                isAuthenticated ? (
                  <Profile user={user} setUser={setUser} />
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
            <Route 
              path="/settings" 
              element={
                isAuthenticated ? (
                  <Settings />
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>

      <style>{`
        .app-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #f8f9fa;
        }

        .app-main {
          flex: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px 16px;
          width: 100%;
          box-sizing: border-box;
        }

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: #c1c7cd;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #a0a7ae;
        }

        :focus-visible {
          outline: 2px solid #7FFF00;
          outline-offset: 2px;
        }

        ::selection {
          background: #7FFF00;
          color: #1a365d;
        }
      `}</style>
    </BrowserRouter>
  );
}

// Static page for missing routes
function StaticPage({ title }) {
  return (
    <div className="static-page">
      <h1>{title}</h1>
      <p>This page is under construction. Please check back later.</p>
      <a href="/" className="btn-primary">Return Home</a>
      <style>{`
        .static-page {
          text-align: center;
          padding: 60px 20px;
          background: white;
          border-radius: 8px;
          border: 1px solid #eaeef2;
        }
        .static-page h1 {
          font-size: 24px;
          color: #1a365d;
          margin: 0 0 12px 0;
        }
        .static-page p {
          color: #6b7280;
          margin: 0 0 24px 0;
        }
      `}</style>
    </div>
  );
}

// 404 Component
function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <a href="/" className="btn-primary">Return Home</a>
      </div>
      <style>{`
        .not-found-page {
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
        }
        .not-found-container {
          text-align: center;
          max-width: 400px;
        }
        .not-found-container h1 {
          font-size: 72px;
          font-weight: 700;
          color: #1a365d;
          margin: 0 0 8px 0;
          line-height: 1;
        }
        .not-found-container h2 {
          font-size: 24px;
          font-weight: 600;
          color: #1a365d;
          margin: 0 0 8px 0;
        }
        .not-found-container p {
          color: #6b7280;
          margin: 0 0 20px 0;
        }
      `}</style>
    </div>
  );
}

export default App;