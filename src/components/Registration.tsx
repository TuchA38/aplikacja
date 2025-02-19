import React, { useState } from "react";
import axios from "axios";

interface CheckUsernameEmailResponse {
  exists: boolean;
}

const Registration: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!username || !email || !password || !confirmPassword) {
      setError("Wszystkie pola muszą być wypełnione.");
      return;
    }
  
    if (password !== confirmPassword) {
      setError("Hasła nie są takie same.");
      return;
    }
  
    if (password.length < 8) {
      setError("Hasło musi mieć co najmniej 8 znaków.");
      return;
    }
  
    try {
      const API_URL = "https://aplikacja-production.up.railway.app";
      const response = await axios.post<CheckUsernameEmailResponse>(`${API_URL}/api/register`, {
        username, email, password,
      });
  
      if (response.data.exists) {
        setError("Login lub email już istnieje.");
        return;
      }
  
      alert("Rejestracja zakończona sukcesem!");
    } catch (error) {
      console.error("Błąd rejestracji:", error);
      setError("Wystąpił błąd przy rejestracji.");
    }
  };  

  return (
    <div className="register-modal">
      <div className="register-modal-content">
        <h2>Rejestracja</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} method="POST">
          <div className="form-group">
            <label htmlFor="username">Login</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Hasło</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Powtórz hasło</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="register-submit-btn">
            Zarejestruj się
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
