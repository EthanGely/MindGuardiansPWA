import { useState, ChangeEvent, FormEvent } from 'react';
import { serveur, router } from "../../../main";

const Signin = () => {

    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [usermail, setUserMail] = useState('');
    const [password, setPassword] = useState('');

    const handleUserFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserFirstName(event.target.value);
    };

    const handleUserLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserLastName(event.target.value);
    };

    const handleUserMailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserMail(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSignIn = async (event: FormEvent) => {
        event.preventDefault();

        const responsePromise = fetch(serveur + '/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userFirstName, userLastName, usermail, password })
        });

        responsePromise.then((response: Response) => {
            if (response.status === 200) {
                response.json().then((data: { jwt: string }) => {
                    localStorage.setItem('jwtToken', data.jwt);
                    router.navigate("/home");
                });
            } else {
                alert("Invalid credentials");
            }
            (error: any) => {
                console.error("Error:", error);
            }
        });
    };

    return (
        <>
            <h2>Créez votre compte</h2>
            <div className='log-container'>
                <form className='log-form'>
                    <div className="form-group">
                        <label>Prénom :</label>
                        <input type="text" value={userFirstName} name='userFirstName' onChange={handleUserFirstNameChange} placeholder='Entrez votre prénom' />
                    </div>
                    <div className="form-group">
                        <label>Nom :</label>
                        <input type="text" value={userLastName} name='userLastName' onChange={handleUserLastNameChange} placeholder='Entrez votre nom de famille' />
                    </div>
                    <div className="form-group">
                        <label>Adresse Email :</label>
                        <input type="email" value={usermail} name='usermail' onChange={handleUserMailChange} placeholder='Entrez votre adresse email' />
                    </div>
                    <div className="form-group">
                        <label>Mot de passe :</label>
                        <input type="password" value={password} name='password' onChange={handlePasswordChange} placeholder='Entrez votre mot de passe' />
                        <p>Votre mot de passe doit contenir au moins 8 caractères, dont au moins :</p>
                        <ul>
                            <li>une lettre majuscule</li>
                            <li>un chiffre</li>
                            <li>un caractère spécial (&, !, @, ...)</li>
                        </ul>
                    </div>
                    <input type="submit" onClick={handleSignIn} className='submit' value="S'inscrire" />
                </form>
            </div>
        </>
    );
};

export default Signin;