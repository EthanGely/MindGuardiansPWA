import LogoMindGaurdians from "./assets/logo-mind-guardians.png";
import Footer from "./components/footer";

function Home() {
  return (
    <>
      <div id="homepage">
        <h1>
          Bienvenue dans
          <div className="logo u-align-center u-mb-8">
            <img src={LogoMindGaurdians} alt="Logo Mind Guardians" />
          </div>
        </h1>
        <p>Un outil de suivi de l'état de santé des patients atteints d'Alzheimer.</p>
        <div className="flex-col u-g-6 u-mt-5">
          <button
            className="button button--secondary u-wfc u-align-center"
            onClick={() => {
              window.location.href = "/presentation";
            }}
          >
            Cliquez ici pour découvrir l'application
          </button>
          <button
            className="button button--secondary u-wfc u-align-center"
            onClick={() => {
              window.location.href = "/connexion";
            }}
          >
            Ou connectez-vous directement
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
