import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/hotels/')
      .then((response) => {
        setHotels(response.data);
      })
      .catch((error) => {
        console.log('Erreur:', error);
      });
  }, []);
const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
  navigate('/');
};
  return (
  <div style={{ minHeight: '100vh', background: '#fef2f2' }}>
    <nav className="d-flex justify-content-between align-items-center px-4 py-3" style={{ backgroundColor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <div className="d-flex align-items-center gap-2">
        <div className="d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#dc2626' }}>
          <span style={{ color: 'white', fontSize: '18px' }}>🏨</span>
        </div>
        <span className="fw-bold fs-5">RED Product</span>
      </div>
      <button
        onClick={handleLogout}
        className="btn fw-semibold"
        style={{ backgroundColor: '#dc2626', color: 'white', borderRadius: '10px', border: 'none', padding: '8px 20px' }}
      >
        Se déconnecter
      </button>
    </nav>

    <div className="container py-5">
      <h2 className="fw-bold mb-4">Liste des hôtels</h2>
      <div className="row g-4">
        {hotels.map((hotel) => (
          <div className="col-md-4" key={hotel.id}>
            <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: '14px', overflow: 'hidden' }}>
              <div className="card-body p-4">
                <h5 className="card-title fw-bold">{hotel.name}</h5>
                <p className="card-text text-muted">{hotel.address}</p>
                <p className="card-text">
                  <strong style={{ color: '#dc2626' }}>{hotel.price_per_night} € / nuit</strong>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}

export default Dashboard;