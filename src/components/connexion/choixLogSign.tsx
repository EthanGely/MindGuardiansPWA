import { useState } from "react";
import Connexion from "./login";
import Inscription from "./signin";
//import { getDataFromAPI } from "../../main";
import LogoMindGaurdians from "../../assets/logo-mind-guardians.png";
import Footer from "../footer";

function ChoixLogSign() {
  const [isLogIn, setIsLogIn] = useState<number>(-1);

  /*getDataFromAPI("/user/getCurrent").then((data) => {
    if (data) {
      window.location.href = "/patient";
    }
  });*/

  if (isLogIn === 0) {
    return <Inscription />;
  } else if (isLogIn === 1) {
    return <Connexion />;
  } else {
    return (
      <>
        <div className="logo u-align-center u-mb-8">
          <img src={LogoMindGaurdians} alt="Logo Mind Guardians" />
        </div>
        <div className="flex flex--row flex--spaceEvenly list-2">
          <div className="card card--shadow item item--small">
            <div className="card__item-info">
              <h3 className="u-text-center">Connexion</h3>
              <p className="u-text-center">Connectez-vous à votre compte</p>
              <button
                className="button button--primary u-align-center"
                onClick={() => {
                  setIsLogIn(1);
                }}
              >
                Se connecter
              </button>
            </div>
          </div>
          <div className="card card--shadow item item--small">
            <div className="card__item-info">
              <h3 className="u-text-center">Inscription</h3>
              <p className="u-text-center">Créez votre nouveau compte</p>
              <button
                className="button button--primary u-align-center"
                onClick={() => {
                  setIsLogIn(0);
                }}
              >
                S'inscrire
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
export default ChoixLogSign;
