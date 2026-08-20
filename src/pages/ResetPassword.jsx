import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const { uid, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/password-reset-confirm/", {
        uid: uid,
        token: token,
        new_password: newPassword,
      });
      setMessage("Mot de passe réinitialisé avec succès !");
    } catch (err) {
      setError("Erreur : le lien est peut-être invalide ou expiré.");
    }
  };

  return (
  <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor:'#f8f9fa'
      <div className="text-center mb-4">
        <div className="mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#dc2626' }}>
          <span style={{ color: 'white', fontSize: '24px' }}>🏨</span>
        </div>
        <h2 className="fw-bold mb-1">Réinitialiser le mot de passe</h2>
        <p className="text-muted small">Choisissez votre nouveau mot de passe</p>
      </div>

      {message && <div className="alert alert-success py-2">{message}</div>}
      {error && <div className="alert alert-danger py-2">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="form-label fw-semibold">Nouveau mot de passe</label>
          <input
            type="password"
            className="form-control form-control-lg"
            style={{ borderRadius: '10px' }}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-lg w-100 text-white fw-semibold"
          style={{ backgroundColor: '#dc2626', borderRadius: '10px', border: 'none' }}
        >
          Réinitialiser
        </button>
      </form>
    </div>
  </div>
);
}

export default ResetPassword;