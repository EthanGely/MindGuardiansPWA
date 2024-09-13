import { useState } from "react";
import Connexion from "./login";
import Inscription from "./signin";
import ConnexionLogo from "../../assets/connexion.svg";
import InscriptionLogo from "../../assets/inscription.svg";
import { getDataFromRoute } from "../../main";

function choixLogSign() {

    const [isLogIn, setIsLogIn] = useState<Number>(-1);

    getDataFromRoute('/user/getCurrent').then(data => {
        if (data) {
            window.location.href = "/patient";
        }
    });

    if (isLogIn === 0) {
        return (<Inscription/>)
    } else if (isLogIn === 1) {
        return (<Connexion/>)
    } else {
        return (
            <>
                <div className="flex flex--row flex--spaceEvenly list-2">
                    <div className="card item item--small">
                        <div className="card__visuel">
                            <img src={ConnexionLogo} alt="Connexion" />
                        </div>
                        <div className="card__item-info">
                            <h3>Connexion</h3>
                            <p>Connectez-vous à votre compte</p>
                            <a className="button" href="" onClick={(e) => { e.preventDefault(); setIsLogIn(1) }}>Se connecter</a>
                        </div>
                    </div>
                    <div className="card item item--small">
                        <div className="card__visuel">
                            <img src={InscriptionLogo} alt="Inscription" />
                        </div>
                        <div className="card__item-info">
                            <h3>Inscription</h3>
                            <p>Créez votre nouveau compte</p>
                            <a className="button" href="" onClick={(e) => { e.preventDefault(); setIsLogIn(0) }}>S'inscrire</a>
                        </div>
                    </div>
                </div>
            </>
        );
    }

};
export default choixLogSign;