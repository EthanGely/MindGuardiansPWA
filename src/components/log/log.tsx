import { useState } from 'react';
import Login from './login/login';
import Signin from './signin/signin';
import './log.scss';

function Log() {
    const [isLogIn, setIsLogIn] = useState(false);
    const [isSignIn, setIsSignIn] = useState(false);
    console.log("GOT HERE")

    return (
        <div>
            {!isLogIn && !isSignIn ? (
                <>
                    <h2>Connexion</h2>
                    <div>
                        <h3>Vous avez déjà un compte ?</h3>
                        <button onClick={() => { setIsLogIn(true) }}>Connectez-vous</button>
                    </div>
                    <div>
                        <h3>Vous n'avez pas encore de compte</h3>
                        <button onClick={() => { setIsSignIn(true) }}>Inscrivez-vous</button>
                    </div>
                </>
            ) : null}

            {isLogIn ? (
                <>
                    <Login />
                    <button onClick={() => {setIsLogIn(false)}}>Retour</button>
                </>
            ) : null}

            {isSignIn ? (
                <>
                    <Signin />
                    <button onClick={() => {setIsSignIn(false)}}>Retour</button>
                </>
            ) : null}
        </div>
    );
}

export default Log;