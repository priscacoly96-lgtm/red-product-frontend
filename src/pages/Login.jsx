import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../services/api';
import { FiEye, FiEyeOff } from 'react-icons/fi';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    axios
      .post(`${API_URL}/api/token/`, {
        username: email,
        password: password,
      })
      .then((response) => {
        localStorage.setItem('access', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);
        navigate('/dashboard');
      })
      .catch(() => {
        setError('Email ou mot de passe incorrect.');
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

      {/* Login Card */}
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
          Connectez-vous en tant que Admin
        </p>

        {error && <div className="alert alert-danger py-2 small">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <input
              type="text"
              className="form-control border-0 border-bottom rounded-0 px-0 shadow-none"
              placeholder="E-mail ou nom d'utilisateur"
              style={{ fontSize: '14px', borderColor: '#e5e7eb' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <div className="position-relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control border-0 border-bottom rounded-0 px-0 shadow-none"
                placeholder="Mot de passe"
                style={{ fontSize: '14px', borderColor: '#e5e7eb', paddingRight: '28px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  color: '#6b7280',
                  fontSize: '18px',
                }}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="form-check mb-4 d-flex align-items-center gap-2">
            <input
              type="checkbox"
              className="form-check-input rounded-0 mt-0"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{ width: '16px', height: '16px' }}
            />
            <label
              className="form-check-label text-secondary small"
              htmlFor="rememberMe"
            >
              Gardez-moi connecté
            </label>
          </div>

          {/* Submit Button */}
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
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>

      {/* Bottom Links */}
      <div className="text-center mt-4">
        <div className="mb-2">
          <Link
            to="/forgot-password"
            className="small text-decoration-none fw-medium"
            style={{ color: '#eab308' }}
          >
            Mot de passe oublié ?
          </Link>
        </div>
        <div>
          <span className="small text-light">Vous n'avez pas de compte? </span>
          <Link
            to="/register"
            className="small fw-semibold text-decoration-none"
            style={{ color: '#eab308' }}
          >
            S'inscrire
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;