import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/apiCall";
import LogoMindGaurdians from "../../assets/logo-mind-guardians.png";

const Login: React.FC = () => {
  const [usermail, setUserMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const responseLocation = await login(usermail, password);
      navigate(responseLocation ? responseLocation : "/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
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
            {error && (
              <p className="form__error">
                Erreur de connexion.
                <br />
                L'adresse email ou le mot de passe sont incorrect.
              </p>
            )}
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
          </form>
        </div>
      </div>
  );
};

export default Login;
