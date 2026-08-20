import { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link} from 'react-router-dom';
 
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    axios.post('http://127.0.0.1:8000/api/token/', {
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
      });
  };

  return (
  <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
    <div className="card shadow-lg border-0 p-4 p-md-5" style={{ width: '420px', borderRadius: '16px' }}>
      <div className="text-center mb-4">
        <div className="mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#dc2626' }}>
          <span style={{ color: 'white', fontSize: '24px' }}>🏨</span>
        </div>
        <h2 className="fw-bold mb-1">Connexion</h2>
        <p className="text-muted small">Accédez à votre espace RED Product</p>
      </div>

      {error && <div className="alert alert-danger py-2">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-semibold">Email</label>
          <input
            type="text"
            className="form-control form-control-lg"
            style={{ borderRadius: '10px' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="form-label fw-semibold">Mot de passe</label>
          <input
            type="password"
            className="form-control form-control-lg"
            style={{ borderRadius: '10px' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-lg w-100 text-white fw-semibold"
          style={{ backgroundColor: '#dc2626', borderRadius: '10px', border: 'none' }}
        >
          Se connecter
        </button>
      </form>

      <div className="text-center mt-3">
        <Link to="/forgot-password" className="small text-decoration-none" style={{ color: '#dc2626' }}>
          Mot de passe oublié ?
        </Link>
      </div>
      <div className="text-center mt-2">
        <span className="small text-muted">Pas de compte ? </span>
        <Link to="/register" className="small fw-semibold text-decoration-none" style={{ color: '#dc2626' }}>
          S'inscrire
        </Link>
      </div>
    </div>
  </div>
);
}

export default Login;