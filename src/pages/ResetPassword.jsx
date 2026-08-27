import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from '../services/api';

function ResetPassword() {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${API_URL}/api/password-reset-confirm/`, {
        uid: uid,
        token: token,
        new_password: newPassword,
      });

      setMessage("Mot de passe réinitialisé avec succès ! Redirection...");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(
        err.response?.data?.detail || "Erreur : le lien est invalide ou expiré."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <div
        className="card shadow-lg border-0 p-4 p-md-5"
        style={{ width: "420px", borderRadius: "16px" }}
      >
        <div className="text-center mb-4">
          <div
            className="mx-auto mb-3 d-flex align-items-center justify-content-center"
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              backgroundColor: "#dc2626",
            }}
          >
            <span style={{ color: "white", fontSize: "24px" }}>🏨</span>
          </div>
          <h2 className="fw-bold mb-1">Réinitialiser le mot de passe</h2>
          <p className="text-muted small">Choisissez votre nouveau mot de passe</p>
        </div>

        {message && <div className="alert alert-success py-2">{message}</div>}
        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Nouveau mot de passe</label>
            <input
              type="password"
              className="form-control form-control-lg"
              style={{ borderRadius: "10px" }}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              className="form-control form-control-lg"
              style={{ borderRadius: "10px" }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-lg w-100 text-white fw-semibold"
            style={{
              backgroundColor: "#dc2626",
              borderRadius: "10px",
              border: "none",
            }}
            disabled={loading}
          >
            {loading ? "Réinitialisation..." : "Réinitialiser"}
          </button>
        </form>

        <div className="text-center mt-3">
          <Link to="/login" className="text-decoration-none small text-muted">
            Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;