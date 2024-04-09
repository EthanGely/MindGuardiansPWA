function Home() {
    return (
        <>
            <div>
                <h1>Bienvenue dans Mind Guardians</h1>
                <p>Un outil de suivi de l'état de santé des patients atteints d'Alzheimer.</p>
                <div>
                    <button onClick={() => { window.location.href = "/presentation" }}>Cliquez ici pour découvrir l'application</button>
                </div>
                <br />
                <div>
                    <button onClick={() => { window.location.href = "/connexion" }}>Ou connectez-vous directement</button>
                </div>
            </div>
        </>
    );
}

export default Home;