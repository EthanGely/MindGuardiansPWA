import React, { useState } from "react";
import { useAuth } from "../../context/NewAuthProvider";
import { useNavigate } from "react-router-dom";
import LogoMindGaurdians from "../../assets/logo-mind-guardians.png";

const Login: React.FC = () => {
  const [usermail, setUserMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const authContext = useAuth();
  const navigate = useNavigate();
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (usermail !== "" && password !== "") {
      authContext.loginAction(usermail, password)
      .then((location) => {
          if (location && typeof location === "string") {
            navigate(location);
            setError('');
            return;
          } else {
            console.log(location)
            
            setError("Erreur de connexion.<br>L'adresse email ou le mot de passe sont incorrect.");
          }
        })
        .catch((error) => {
          console.log("catching error");
          
          if (error.message.includes("NetworkError")) {
            setError("L'application semble indisponible.<br>Le service informatique à été prévenu de cette erreur.<br>Merci de rééssayer plus tard.");
          } else {
            setError("Erreur de connexion.<br>L'adresse email ou le mot de passe sont incorrect.");
          }
        });
    } else {
      setError("Veuillez remplir tous les champs.");
    }
  };

  return (
    <div>
      <h2>
        <div className="logo u-align-center u-mb-8">
          <img src={LogoMindGaurdians} alt="Logo Mind Guardians" />
        </div>
      </h2>
      <div className="log-container">
        <form id="log-form" className="form" onSubmit={handleLogin}>
          <div className="form__group">
            <label>Adresse Email:</label>
            <input
              className={ error && (usermail.length === 0 || password.length !== 0) ? "error" : ""}
              type="email"
              value={usermail}
              name="usermail"
              onChange={(e) => setUserMail(e.target.value)}
              placeholder="Entrez votre adresse email"
            />
          </div>
          <div className="form__group">
            <label>Mot de passe :</label>
            <input
              className={ error && (password.length === 0 || usermail.length !== 0) ? "error" : ""}
              type="password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe"
            />
          </div>
          <input
            type="submit"
            className="submit button button--primary"
            value="Se connecter"
          />

          <a href="/log">Mot de passe oublié ? (TODO)</a>
          {error && (
            <p className="form__error" dangerouslySetInnerHTML={{ __html: error }}></p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
