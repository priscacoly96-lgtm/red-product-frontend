import { FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import Header from '../components/Header';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../services/api';

function Dashboard() {
  const [hotelsCount, setHotelsCount] = useState(0);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/hotels/`)
      .then((response) => {
        setHotelsCount(response.data.length);
      })
      .catch((error) => {
        console.log('Erreur:', error);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/');
  };

  const stats = [
    { id: 1, icon: '✉️', color: '#a855f7', count: '125', title: 'Formulaires', sub: 'Je ne sais pas quoi mettre' },
    { id: 2, icon: 'P', color: '#0d9488', count: '40', title: 'Messages', sub: 'Je ne sais pas quoi mettre' },
    { id: 3, icon: '👥', color: '#eab308', count: '600', title: 'Utilisateurs', sub: 'Je ne sais pas quoi mettre' },
    { id: 4, icon: '✉️', color: '#dc2626', count: '25', title: 'E-mails', sub: 'Je ne sais pas quoi mettre' },
    { id: 5, icon: 'P', color: '#9333ea', count: hotelsCount || '40', title: 'Hôtels', sub: 'Je ne sais pas quoi mettre' },
    { id: 6, icon: '👥', color: '#2563eb', count: '02', title: 'Entités', sub: 'Je ne sais pas quoi mettre' },
  ];

  return (
    <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f4f5f7', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Sidebar Sombre */}
      <aside
        className={`app-sidebar d-flex flex-column justify-content-between p-3 text-white ${sidebarOpen ? 'open' : ''}`}
        style={{ width: '250px', backgroundColor: '#454849', flexShrink: 0 }}
      >
        <button
          className="btn btn-link text-white p-0 d-md-none mb-3 align-self-end"
          onClick={() => setSidebarOpen(false)}
        >
          <FiX size={22} />
        </button>
        <div>
          {/* Logo */}
          <div className="d-flex align-items-center gap-2 mb-4 px-2 pt-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
              <line x1="4" y1="22" x2="4" y2="15" />
            </svg>
            <span className="fw-bold fs-6">RED PRODUCT</span>
          </div>

          <p className="text-uppercase small text-secondary px-2 mb-2" style={{ fontSize: '11px' }}>Principal</p>

          {/* Navigation Links */}
          <ul className="nav nav-pills flex-column gap-1">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link text-dark fw-medium d-flex align-items-center gap-2" style={{ backgroundColor: '#e5e7eb', borderRadius: '4px' }}>
                <span>📱</span> Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/hotels" className="nav-link text-light fw-medium d-flex align-items-center gap-2" style={{ opacity: 0.8 }}>
                <span>🏨</span> Liste des hôtels
              </Link>
            </li>
          </ul>
        </div>

        {/* User Profile Footer */}
        <div className="pt-3 border-top border-secondary d-flex align-items-center gap-2 px-2">
          <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            className="rounded-circle"
            style={{ width: '36px', height: '36px', objectFit: 'cover' }}
          />
          <div className="lh-1" style={{ fontSize: '12px' }}>
            <div className="fw-semibold">Mouhamet Badiane</div>
            <div className="text-success small d-flex align-items-center gap-1 mt-1">
              <span style={{ width: '6px', height: '6px', backgroundColor: '#22c55e', borderRadius: '50%', display: 'inline-block' }}></span>
              en ligne
            </div>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="sidebar-overlay d-md-none" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Content Area */}
      <div className="flex-grow-1 d-flex flex-column">
        
        {/* Top Header */}
        <header className="bg-white px-4 py-3 border-bottom d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-link text-dark p-0 d-md-none"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu size={22} />
            </button>
            <h5 className="fw-bold mb-0">Dashboard</h5>
          </div>

          <div className="d-flex align-items-center gap-2 flex-shrink-0">
            {/* Search Input */}
            <div className="position-relative d-none d-md-block" style={{ width: '220px' }}>
              <input
                type="text"
                placeholder="Recherche"
                className="form-control form-control-sm rounded-pill bg-light border-0 ps-4"
                style={{ fontSize: '13px' }}
              />
              <span className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" style={{ fontSize: '12px' }}>🔍</span>
            </div>

            {/* Notification Icon */}
            <div className="position-relative cursor-pointer">
              <span>🔔</span>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark" style={{ fontSize: '9px' }}>
                3
              </span>
            </div>

            {/* Avatar */}
            <img
              src="https://via.placeholder.com/32"
              alt="Avatar"
              className="rounded-circle"
              style={{ width: '32px', height: '32px' }}
            />

            {/* Logout Button */}
            <button onClick={handleLogout} className="btn btn-link text-dark p-0 ms-2" title="Se déconnecter">
              <FiLogOut size={18} />
            </button>
          </div>
        </header>

        {/* Banner Section */}
        <div className="bg-white px-4 py-3 border-bottom">
          <h4 className="fw-bold mb-1">Bienvenue sur RED Product</h4>
          <p className="text-muted small mb-0">Lorem ipsum dolor sit amet consectetur</p>
        </div>

        {/* Dashboard Grid */}
        <main className="p-4 flex-grow-1">
          <div className="row g-3">
            {stats.map((stat) => (
              <div className="col-md-4" key={stat.id}>
                <div className="card border-0 shadow-sm p-3 bg-white" style={{ borderRadius: '8px' }}>
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="d-flex align-items-center justify-content-center text-white rounded-circle fw-bold"
                      style={{ width: '45px', height: '45px', backgroundColor: stat.color, fontSize: '18px', flexShrink: 0 }}
                    >
                      {stat.icon}
                    </div>
                    <div>
                      <div className="d-flex align-items-baseline gap-2">
                        <span className="fs-4 fw-bold">{stat.count}</span>
                        <span className="text-dark fw-medium small">{stat.title}</span>
                      </div>
                      <div className="text-muted" style={{ fontSize: '11px' }}>{stat.sub}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

    </div>
  );
}

export default Dashboard;