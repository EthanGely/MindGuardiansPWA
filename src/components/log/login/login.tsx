import { useState, ChangeEvent, FormEvent } from 'react';

const Login = () => {

    const [usermail, setUserMail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);


    const handleUserMailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserMail(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleLogIn = async (event: FormEvent) => {
        event.preventDefault();


        const responsePromise = fetch('https://ethan-server.com:8443/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usermail, password })
        });

        responsePromise.then((response: Response) => {
            if (response.status === 200) {
                response.json().then((data: { jwt: string }) => {
                    localStorage.setItem('jwtToken', data.jwt);
                    window.location.href = "/patient";
                });
            } else {
                setError(true);
            }
            (error: any) => {
                console.error("Error:", error);
            }
        });
    };

    return (
        <>
            <h2>Connectez-vous</h2>
            <div className='log-container'>
                {error && <p className='error'>Erreur de connexion.<br />L'adresse email ou le mot de passe sont incorrect.</p>}
                <form className='log-form'>
                    <div className="form-group">
                        <label>Adresse Email:</label>
                        <input className={error ? "error" : ""} type="email" value={usermail} name='usermail' onChange={handleUserMailChange} placeholder='Entrez votre adresse email' />
                    </div>
                    <div className="form-group">
                        <label>Mot de passe :</label>
                        <input className={error ? "error" : ""} type="password" value={password} name='password' onChange={handlePasswordChange} placeholder='Entrez votre mot de passe' />
                    </div>
                    <input type="submit" onClick={handleLogIn} className='submit' value="Se connecter" />

                    <a href="/log">Mot de passe oublié ? (TODO)</a>
                </form>
            </div>
        </>
    );
};

export default Login;