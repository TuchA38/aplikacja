import React, { useState } from "react";
import "./App.css"; // Import stylów
import Registration from "./components/Registration"; // Import komponentu rejestracji

const App: React.FC = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Funkcja otwierająca okno rejestracji
  const openRegistration = () => setIsRegisterOpen(true);

  // Funkcja zamykająca okno rejestracji
  const closeRegistration = () => setIsRegisterOpen(false);

  // Funkcja otwierająca okno logowania
  const openLogin = () => setIsLoginOpen(true);

  // Funkcja zamykająca okno logowania
  const closeLogin = () => setIsLoginOpen(false);

  // Funkcja do zamknięcia modal po kliknięciu poza jego obszarem
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeRegistration();
      closeLogin();
    }
  };

  return (
    <div className="container">
      <div className="content">
        <h1>Witaj w aplikacji!</h1>
        <p>Znajdź graczy i poznaj nowych znajomych!</p>

        <div className="buttons">
          <button onClick={openLogin} className="login-btn">
            Logowanie
          </button>
          <button onClick={openRegistration} className="register-btn">
            Rejestracja
          </button>
        </div>

        {/* Wyskakujące okno rejestracji */}
        {isRegisterOpen && (
          <div className="register-modal" onClick={handleBackdropClick}>
            <div className="register-modal-content">
              <span className="close" onClick={closeRegistration}>
                &times;
              </span>
              <Registration /> {/* Komponent rejestracji */}
            </div>
          </div>
        )}

        {/* Wyskakujące okno logowania */}
        {isLoginOpen && (
          <div className="login-modal" onClick={handleBackdropClick}>
            <div className="login-modal-content">
              <span className="close" onClick={closeLogin}>
                &times;
              </span>
              <h2>Logowanie</h2>
              <form>
                <div className="form-group">
                  <label htmlFor="login">Login</label>
                  <input type="text" id="login" name="login" required />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Hasło</label>
                  <input type="password" id="password" name="password" required />
                </div>
                <button type="submit" className="login-submit-btn">
                  Zaloguj się
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
