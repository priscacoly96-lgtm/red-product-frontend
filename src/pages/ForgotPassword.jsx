import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    axios.post('http://127.0.0.1:8000/api/password-reset/', {
      email: email,
    })
      .then(() => {
        setMessage('Un email de réinitialisation a été envoyé si ce compte existe.');
      })
      .catch(() => {
        setError('Une erreur est survenue. Réessayez.');
      });
  };

  return (
  <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor:'#f8f9fa'
    <div className="card shadow-lg border-0 p-4 p-md-5" style={{ width: '420px', borderRadius: '16px' }}>
      <div className="text-center mb-4">
        <div className="mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#dc2626' }}>
          <span style={{ color: 'white', fontSize: '24px' }}>🏨</span>
        </div>
        <h2 className="fw-bold mb-1">Mot de passe oublié</h2>
        <p className="text-muted small">Entrez votre email, nous vous enverrons un lien de réinitialisation.</p>
      </div>

      {error && <div className="alert alert-danger py-2">{error}</div>}
      {message && <div className="alert alert-success py-2">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="form-label fw-semibold">Email</label>
          <input
            type="email"
            className="form-control form-control-lg"
            style={{ borderRadius: '10px' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-lg w-100 text-white fw-semibold"
          style={{ backgroundColor: '#dc2626', borderRadius: '10px', border: 'none' }}
        >
          Envoyer le lien
        </button>
      </form>

      <div className="text-center mt-3">
        <Link to="/" className="small fw-semibold text-decoration-none" style={{ color: '#dc2626' }}>
          Retour à la connexion
        </Link>
      </div>
    </div>
  </div>
);
}
export default ForgotPassword;