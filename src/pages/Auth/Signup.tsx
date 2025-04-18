import React, { useState } from "react";
import LogoMindGaurdians from "../../assets/logo-mind-guardians.png";
import SignupPatient from "./Patient/signupPatient";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState<string | null>(null);

  const [userType, setUserType] = useState(-1);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    /*try {
      //const responseLocation = await signUp(email, password);
      //navigate(responseLocation ? responseLocation : "/dashboard");
    } catch (err: Error) {
      setError(err.message || "Signup failed");
    }*/
  };

  if (userType === -1) {
    return (
      <div>
        <h2>
          <div className="logo u-align-center u-mb-8">
            <img src={LogoMindGaurdians} alt="Logo Mind Guardians" />
          </div>
        </h2>
        <div className="log-container">
          <div className="card__list list-3">
            <div className="card card--shadow card--rounded">
              <div className="card__item-info">
                <h3 className="card__title">
                  <button
                    className="card__link card__link--cover"
                    onClick={() => setUserType(0)}
                  >
                    Patient
                  </button>
                </h3>
              </div>
              <div className="card__body u-p-4">
                <p className="u-text-center">
                  Crééez un compte en tant que patient
                </p>
                <button
                  className="button button--primary u-align-center"
                  onClick={() => setUserType(0)}
                >
                  Patient
                </button>
              </div>
            </div>
            <div className="card card--shadow card--rounded">
              <div className="card__item-info">
                <h3 className="card__title">
                  <button
                    className="card__link card__link--cover"
                    onClick={() => setUserType(1)}
                  >
                    Professionnel
                  </button>
                </h3>
              </div>
              <div className="card__body u-p-4">
                <p className="u-text-center">
                  Crééez un compte en tant que professionnel de santé
                </p>
                <button
                  className="button button--primary u-align-center"
                  onClick={() => setUserType(1)}
                >
                  Professionnel
                </button>
              </div>
            </div>
            <div className="card card--shadow card--rounded">
              <div className="card__item-info">
                <h3 className="card__title">
                  <button
                    className="card__link card__link--cover"
                    onClick={() => setUserType(2)}
                  >
                    Famille
                  </button>
                </h3>
              </div>
              <div className="card__body u-p-4">
                <p className="u-text-center">
                  Crééez un compte en tant que famille d'un patient
                </p>
                <button
                  className="button button--primary u-align-center"
                  onClick={() => setUserType(2)}
                >
                  Famille
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (userType === 0) {
    return (
      <div>
        <h2>
          <div className="logo u-align-center u-mb-8">
            <img src={LogoMindGaurdians} alt="Logo Mind Guardians" />
          </div>
        </h2>
        <div className="log-container">
          <SignupPatient />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSignUp}>
        {error && <p className="error">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default SignUp;
