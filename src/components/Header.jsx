import { FiSearch, FiBell, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function Header({ title }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/');
  };

  return (
    <div className="d-flex justify-content-between align-items-center bg-white px-4 py-3 border-bottom">
      <h5 className="mb-0 fw-bold">{title}</h5>

      <div className="d-flex align-items-center gap-3">
        <div className="position-relative">
          <FiSearch
            className="position-absolute"
            style={{ left: '12px', top: '10px', color: '#999' }}
          />
          <input
            type="text"
            placeholder="Recherche"
            className="form-control ps-5"
            style={{ borderRadius: '20px', width: '220px' }}
          />
        </div>

        <FiBell size={20} style={{ color: '#555', cursor: 'pointer' }} />

        <img
          src="https://via.placeholder.com/36"
          alt="avatar"
          className="rounded-circle"
          style={{ width: '36px', height: '36px', objectFit: 'cover' }}
        />

        <FiLogOut
          size={20}
          style={{ color: '#dc2626', cursor: 'pointer' }}
          onClick={handleLogout}
          title="Se déconnecter"
        />
      </div>
    </div>
  );
}

export default Header;