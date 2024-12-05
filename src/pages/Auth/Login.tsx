import React, { useState } from "react";
import { useApi } from "../../utils/apiCall";
import { useAuth } from "../../context/AuthProvider";
import LogoMindGaurdians from "../../assets/logo-mind-guardians.png";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { callApi, error } = useApi();
  const [usermail, setUserMail] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useAuth();
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { isAuthenticated, login } = authContext;
  //const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await callApi("/auth/login", { usermail, password });

      if (response) {
        localStorage.setItem("jwtToken", response.jwt);
        login(response.jwt);
        if (isAuthenticated) {
          navigate(response.location ? response.location : "/dashboard");
          return;
        }
      }
      console.log("Login error");
    } catch (err: any) {
      console.error(err);
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
