import { FiLogOut, FiMenu, FiX, FiChevronDown, FiCamera } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { API_URL } from '../services/api';

function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingHotelId, setEditingHotelId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Gestion de l'avatar utilisateur avec sauvegarde locale
  const [userAvatar, setUserAvatar] = useState(() => {
    return localStorage.getItem('userAvatar') || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80';
  });

  // Ferme le menu déroulant si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserAvatar(imageUrl);
      localStorage.setItem('userAvatar', imageUrl);
    }
  };

  // State pour le formulaire de création / modification
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    price_per_night: '',
    currency: 'F XOF',
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const fetchHotels = () => {
    axios.get(`${API_URL}/api/hotels/`)
      
      .then((response) => setHotels(response.data))
      .catch((error) => console.log('Erreur:', error));
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCreateClick = () => {
    setEditingHotelId(null);
    setFormData({
      name: '',
      address: '',
      email: '',
      phone: '',
      price_per_night: '',
      currency: 'F XOF',
      image: null,
    });
    setImagePreview(null);
    setShowModal(true);
  };

  const handleEditClick = (hotel) => {
    setEditingHotelId(hotel.id);
    setFormData({
      name: hotel.name || '',
      address: hotel.address || '',
      email: hotel.email || '',
      phone: hotel.phone || '',
      price_per_night: hotel.price_per_night || '',
      currency: hotel.currency || 'F XOF',
      image: null,
    });
    setImagePreview(hotel.image || null);
    setShowModal(true);
  };

    const handleHotelClick = (hotel) => {
    setSelectedHotel(hotel);
    setShowDetailModal(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('address', formData.address);
    if (formData.email) data.append('email', formData.email);
    if (formData.phone) data.append('phone', formData.phone);
    data.append('price_per_night', formData.price_per_night);
    if (formData.currency) data.append('currency', formData.currency);
    if (formData.image) data.append('image', formData.image);

    const request = editingHotelId
    ? axios.patch(`${API_URL}/api/hotels/${editingHotelId}/`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      : axios.post(`${API_URL}/api/hotels/`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

    request
      .then(() => {
        setShowModal(false);
        fetchHotels();
        setFormData({
          name: '',
          address: '',
          email: '',
          phone: '',
          price_per_night: '',
          currency: 'F XOF',
          image: null,
        });
        setImagePreview(null);
        setEditingHotelId(null);
      })
      .catch((err) => console.log('Erreur création/modification hôtel:', err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f4f5f7', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Input fichier masqué pour l'avatar */}
      <input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef}
        onChange={handleAvatarChange} 
        className="d-none" 
      />

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
          <div className="d-flex align-items-center gap-2 mb-4 px-2 pt-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
              <line x1="4" y1="22" x2="4" y2="15" />
            </svg>
            <span className="fw-bold fs-6">RED PRODUCT</span>
          </div>

          <p className="text-uppercase small text-secondary px-2 mb-2" style={{ fontSize: '11px' }}>Principal</p>

          <ul className="nav nav-pills flex-column gap-1">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link text-light fw-medium d-flex align-items-center gap-2" style={{ opacity: 0.8 }}>
                <span>📱</span> Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/hotels" className="nav-link text-dark fw-medium d-flex align-items-center gap-2" style={{ backgroundColor: '#e5e7eb', borderRadius: '4px' }}>
                <span>🏨</span> Liste des hôtels
              </Link>
            </li>
          </ul>
        </div>

        {/* Profil Sidebar */}
        <div className="pt-3 border-top border-secondary d-flex align-items-center gap-2 px-2">
          <img 
            src={userAvatar} 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff";
            }}
            alt="User" 
            className="rounded-circle border" 
            style={{ width: '36px', height: '36px', objectFit: 'cover', flexShrink: 0 }} 
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

      {/* Main Content Area */}
      <div className="flex-grow-1 d-flex flex-column">
        
        {/* Top Header */}
        <header className="bg-white px-4 border-bottom d-flex align-items-center justify-content-between" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-link text-dark p-0 d-md-none"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu size={22} />
            </button>
            <h5 className="fw-bold mb-0">Liste des hôtels</h5>
          </div>

          <div className="d-flex align-items-center gap-3 flex-shrink-0">
            <div className="position-relative d-none d-md-block" style={{ width: '200px' }}>
              <input type="text" placeholder="Recherche" className="form-control form-control-sm rounded-pill bg-light border-0 ps-4" style={{ fontSize: '13px' }} />
              <span className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" style={{ fontSize: '12px' }}>🔍</span>
            </div>
            
            <div className="position-relative me-1" style={{ cursor: 'pointer' }}>
              <span style={{ fontSize: '18px' }}>🔔</span>
              <span 
                className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-warning text-dark p-1" 
                style={{ fontSize: '10px', minWidth: '16px', height: '16px', lineHeight: '10px' }}
              >
                2
              </span>
            </div>
            
            {/* AVATAR + DROPDOWN SANS NOM N'I MAIL */}
            <div className="position-relative" ref={dropdownRef}>
              <div 
                className="d-flex align-items-center gap-1 cursor-pointer" 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{ cursor: 'pointer' }}
              >
                <img 
                  src={userAvatar} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff";
                  }}
                  alt="Avatar" 
                  className="rounded-circle border" 
                  style={{ width: '36px', height: '36px', objectFit: 'cover', flexShrink: 0 }} 
                />
                <FiChevronDown size={16} className="text-secondary" />
              </div>

              {/* Menu Déroulant */}
              {dropdownOpen && (
                <div 
                  className="position-absolute end-0 mt-2 bg-white rounded shadow-sm border py-2" 
                  style={{ width: '180px', zIndex: 1000, fontSize: '13px' }}
                >
                  <button 
                    className="dropdown-item d-flex align-items-center gap-2 px-3 py-2 text-dark bg-transparent border-0 w-100 text-start"
                    onClick={() => {
                      setDropdownOpen(false);
                      fileInputRef.current.click();
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <FiCamera size={16} />
                    Changer la photo
                  </button>
                  <hr className="my-1 border-top" />
                  <button 
                    className="dropdown-item d-flex align-items-center gap-2 px-3 py-2 text-dark bg-transparent border-0 w-100 text-start"
                    onClick={() => {
                      setDropdownOpen(false);
                      handleLogout();
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <FiLogOut size={16} />
                    Se déconnecter
                  </button>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* Action Header */}
        <div className="bg-white px-4 border-bottom d-flex align-items-center justify-content-between" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
          <div className="d-flex align-items-baseline gap-2">
            <h4 className="fw-bold mb-0">Hôtels</h4>
            <span className="text-muted fs-5">{hotels.length}</span>
          </div>
          <button onClick={handleCreateClick} className="btn btn-outline-dark btn-sm d-flex align-items-center gap-2 px-3 py-2" style={{ borderRadius: '8px', fontSize: '13px' }}>
            <span>+</span> Créer un nouveau hôtel
          </button>
        </div>

        {/* Hotels Grid */}
        <main className="p-3 flex-grow-1">
          <div className="row g-3">
            {hotels.map((hotel) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={hotel.id}>
                                <div
                  className="card border-0 shadow-sm h-100 bg-white"
                  style={{ borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }}
                  onClick={() => handleHotelClick(hotel)}
                >
                  
                  <img
                    src={hotel.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop&q=60"}
                    alt={hotel.name}
                    className="card-img-top"
                    style={{ 
                      width: '100%', 
                      height: '200px', 
                      objectFit: 'cover', 
                      objectPosition: 'center' 
                    }}
                  />
                  
                  <div className="card-body p-3 d-flex flex-column justify-content-between">
                    <div>
                      <p
                        className="text-danger small mb-1 text-truncate"
                        style={{ fontSize: '11px', fontWeight: '500' }}
                      >
                        {hotel.address || 'Adresse non renseignée'}
                      </p>
                      <h6
                        className="fw-bold text-dark mb-2"
                        style={{ minHeight: '40px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                      >
                        {hotel.name}
                      </h6>
                    </div>
                    <div>
                      <p className="text-secondary small mb-0" style={{ fontSize: '12px' }}>
                        {hotel.price_per_night} {hotel.currency || 'XOF'} par nuit
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      {/* MODAL DETAILS HOTEL */}
      {showDetailModal && selectedHotel && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 1050 }}
        >
          <div
            className="bg-white p-3 p-md-4 rounded shadow-lg position-relative"
            style={{ width: '95%', maxWidth: '560px', maxHeight: '90vh', overflowY: 'auto' }}
          >
            <div className="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom border-dashed">
              <button
                onClick={() => setShowDetailModal(false)}
                className="btn btn-link text-dark p-0 text-decoration-none fs-5 fw-bold"
              >
                ←
              </button>
              <h6 className="fw-bold mb-0 text-uppercase text-secondary" style={{ fontSize: '13px', letterSpacing: '0.5px' }}>
                Détails de l'hôtel
              </h6>
            </div>

            <img
              src={selectedHotel.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop&q=60"}
              alt={selectedHotel.name}
              style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '8px' }}
              className="mb-3"
            />

            <h5 className="fw-bold mb-1">{selectedHotel.name}</h5>
            <p className="text-danger small mb-3">{selectedHotel.address || 'Adresse non renseignée'}</p>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <span className="text-muted small d-block" style={{ fontSize: '12px' }}>E-mail</span>
                <span className="fw-medium">{selectedHotel.email || 'Non renseigné'}</span>
              </div>
              <div className="col-md-6">
                <span className="text-muted small d-block" style={{ fontSize: '12px' }}>Téléphone</span>
                <span className="fw-medium">{selectedHotel.phone || 'Non renseigné'}</span>
              </div>
              <div className="col-md-6">
                <span className="text-muted small d-block" style={{ fontSize: '12px' }}>Prix par nuit</span>
                <span className="fw-medium">{selectedHotel.price_per_night} {selectedHotel.currency || 'XOF'}</span>
              </div>
            </div>

            {selectedHotel.description && (
              <div className="mb-3">
                <span className="text-muted small d-block mb-1" style={{ fontSize: '12px' }}>Description</span>
                <p className="mb-0">{selectedHotel.description}</p>
              </div>
            )}

            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  handleEditClick(selectedHotel);
                }}
                className="btn btn-outline-dark px-4 py-2"
                style={{ borderRadius: '6px', fontSize: '13px' }}
              >
                Modifier
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* MODAL CREER / MODIFIER UN HOTEL */}
      {showModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 1050 }}
        >
          <div
            className="bg-white p-3 p-md-4 rounded shadow-lg position-relative"
            style={{ width: '95%', maxWidth: '620px', maxHeight: '90vh', overflowY: 'auto' }}
          >
            <div className="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom border-dashed">
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-link text-dark p-0 text-decoration-none fs-5 fw-bold"
              >
                ←
              </button>
              <h6 className="fw-bold mb-0 text-uppercase text-secondary" style={{ fontSize: '13px', letterSpacing: '0.5px' }}>
                {editingHotelId ? 'Modifier l\'hôtel' : 'Créer un nouveau hôtel'}
              </h6>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small text-muted mb-1" style={{ fontSize: '12px' }}>Nom de l'hôtel</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control form-control-sm py-2 px-3"
                    placeholder="CAP Marniane"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label small text-muted mb-1" style={{ fontSize: '12px' }}>Adresse</label>
                  <input
                    type="text"
                    name="address"
                    className="form-control form-control-sm py-2 px-3"
                    placeholder="Les îles du saloum, Mar Lodj"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label small text-muted mb-1" style={{ fontSize: '12px' }}>E-mail</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-sm py-2 px-3"
                    placeholder="information@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label small text-muted mb-1" style={{ fontSize: '12px' }}>Numéro de téléphone</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control form-control-sm py-2 px-3"
                    placeholder="+221 77 777 77 77"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label small text-muted mb-1" style={{ fontSize: '12px' }}>Prix par nuit</label>
                  <input
                    type="number"
                    name="price_per_night"
                    className="form-control form-control-sm py-2 px-3"
                    placeholder="25.000 XOF"
                    value={formData.price_per_night}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label small text-muted mb-1" style={{ fontSize: '12px' }}>Devise</label>
                  <select
                    name="currency"
                    className="form-select form-select-sm py-2 px-3"
                    value={formData.currency}
                    onChange={handleChange}
                  >
                    <option value="F XOF">F XOF</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="USD">USD ($)</option>
                  </select>
                </div>

                <div className="col-12 mt-3">
                  <label className="form-label small text-muted mb-1" style={{ fontSize: '12px' }}>Ajouter une photo</label>
                  <div
                    className="border rounded d-flex flex-column align-items-center justify-content-center p-4 position-relative bg-light"
                    style={{ borderStyle: 'dashed', minHeight: '140px', cursor: 'pointer' }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                      style={{ cursor: 'pointer' }}
                    />
                    {imagePreview ? (
                      <img src={imagePreview} alt="Aperçu" style={{ maxHeight: '120px', objectFit: 'contain' }} />
                    ) : (
                      <>
                        <div className="text-muted mb-2 fs-3">🖼️</div>
                        <span className="text-muted small">Ajouter une photo</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end mt-4">
                <button
                  type="submit"
                  className="btn text-white px-4 py-2"
                  style={{ backgroundColor: '#555859', borderRadius: '6px', fontSize: '13px' }}
                  disabled={loading}
                >
                  {loading ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default HotelList;