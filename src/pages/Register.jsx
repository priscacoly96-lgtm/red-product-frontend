import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../services/api';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

   axios.post(`${API_URL}/api/register/`, {
      username: username,
      email: email,
      password: password,
    })
      .then(() => {
        setSuccess('Compte créé avec succès ! Redirection...');
        setTimeout(() => {
          navigate('/');
        }, 1500);
      })
      .catch((err) => {
        setError(err.response?.data?.detail || 'Erreur lors de la création du compte.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#494c4d',
        color: '#ffffff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        margin: 0,
        padding: 0
      }}
    >
      {/* Header Logo */}
      <div className="d-flex align-items-center gap-2 mb-4">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <line x1="4" y1="22" x2="4" y2="15" />
        </svg>
        <span className="fw-bold fs-5 tracking-wide">RED PRODUCT</span>
      </div>

      {/* Card */}
      <div
        className="card border-0 p-4 p-md-5 text-dark"
        style={{
          width: '90%',
          maxWidth: '380px',
          borderRadius: '4px',
          backgroundColor: '#ffffff'
        }}
      >
        <p className="mb-4 text-secondary small fw-medium">
          Inscrivez-vous sur RED Product
        </p>

        {error && <div className="alert alert-danger py-2 small">{error}</div>}
        {success && <div className="alert alert-success py-2 small">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className="form-control border-0 border-bottom rounded-0 px-0 shadow-none"
              placeholder="Nom d'utilisateur"
              style={{ fontSize: '14px', borderColor: '#e5e7eb' }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              className="form-control border-0 border-bottom rounded-0 px-0 shadow-none"
              placeholder="E-mail"
              style={{ fontSize: '14px', borderColor: '#e5e7eb' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              className="form-control border-0 border-bottom rounded-0 px-0 shadow-none"
              placeholder="Mot de passe"
              style={{ fontSize: '14px', borderColor: '#e5e7eb' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-100 text-white py-2"
            style={{
              backgroundColor: '#454849',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: '500'
            }}
            disabled={loading}
          >
            {loading ? "S'inscrire..." : "S'inscrire"}
          </button>
        </form>
      </div>

      {/* Bottom Link */}
      <div className="text-center mt-4">
        <span className="small text-light">Vous avez déjà un compte ? </span>
        <Link
          to="/"
          className="small fw-semibold text-decoration-none"
          style={{ color: '#eab308' }}
        >
          Se connecter
        </Link>
      </div>
    </div>
  );
}

export default Register;