import React, { useState } from "react";
import { useAuth } from "../../context/NewAuthProvider";
import { useNavigate } from "react-router-dom";
import LogoMindGaurdians from "../../assets/logo-mind-guardians.png";

const Login: React.FC = () => {
  const [usermail, setUserMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const authContext = useAuth();
  const navigate = useNavigate();
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (usermail !== "" && password !== "") {
      const locPromise = authContext.loginAction(usermail, password);
      locPromise.then((location) => {
        if (location && typeof location === "string") {
          navigate(location);
          setError(false);
          return
        }
        setError(false);
      }
      );
    }
    setError(true)
  };

  return (
    <div>
      <h2>
        Connexion à
        <div className="logo u-align-center u-mb-8">
          <img src={LogoMindGaurdians} alt="Logo Mind Guardians" />
        </div>
      </h2>
      <div className="log-container">
        <form id="log-form" className="form" onSubmit={handleLogin}>
          <div className="form__group">
            <label>Adresse Email:</label>
            <input className={error ? "error" : ""} type="email" value={usermail} name="usermail" onChange={(e) => setUserMail(e.target.value)} placeholder="Entrez votre adresse email" />
          </div>
          <div className="form__group">
            <label>Mot de passe :</label>
            <input className={error ? "error" : ""} type="password" value={password} name="password" onChange={(e) => setPassword(e.target.value)} placeholder="Entrez votre mot de passe" />
          </div>
          <input type="submit" className="submit button button--primary" value="Se connecter" />

          <a href="/log">Mot de passe oublié ? (TODO)</a>
          {error && (
            <p className="form__error">
              Erreur de connexion.
              <br />
              L'adresse email ou le mot de passe sont incorrect.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
