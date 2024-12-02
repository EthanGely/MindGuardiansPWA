import { useState, ChangeEvent, FormEvent } from "react";
import LogoMindGaurdians from "../../assets/logo-mind-guardians.png";
import Footer from "../footer";

const Login = () => {
  const [usermail, setUserMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleUserMailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserMail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogIn = async (event: FormEvent) => {
    event.preventDefault();

    const responsePromise = fetch("https://ethan-server.com:8443/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usermail, password }),
    });

    responsePromise.then((response: Response) => {
      if (response.status === 200) {
        response.json().then((data: { jwt: string; location: string }) => {
          localStorage.setItem("jwtToken", data.jwt);
          window.location.href = data.location;
        });
      } else {
        setError(true);
      }
      (error: any) => {
        console.error("Error:", error);
      };
    });
  };

  return (
    <>
      <div>
        <h2>
          Connexion à
          <div className="logo u-align-center u-mb-8">
            <img src={LogoMindGaurdians} alt="Logo Mind Guardians" />
          </div>
        </h2>
        <div className="log-container">
          <form id="log-form" className="form">
            {error && (
              <p className="form__error">
                Erreur de connexion.
                <br />
                L'adresse email ou le mot de passe sont incorrect.
              </p>
            )}
            <div className="form__group">
              <label>Adresse Email:</label>
              <input className={error ? "error" : ""} type="email" value={usermail} name="usermail" onChange={handleUserMailChange} placeholder="Entrez votre adresse email" />
            </div>
            <div className="form__group">
              <label>Mot de passe :</label>
              <input className={error ? "error" : ""} type="password" value={password} name="password" onChange={handlePasswordChange} placeholder="Entrez votre mot de passe" />
            </div>
            <input type="submit" onClick={handleLogIn} className="submit button button--primary" value="Se connecter" />

            <a href="/log">Mot de passe oublié ? (TODO)</a>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
