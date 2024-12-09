import LogoMindGaurdians from "../../assets/logo-mind-guardians.png";

function choixLogSign() {
  return (
    <>
      <div className="logo u-align-center u-mb-8">
        <img src={LogoMindGaurdians} alt="Logo Mind Guardians" />
      </div>
      <div className="card__list list-2">
        <div className="card card--shadow">
          <div className="card__item-info">
            <h3 className="u-text-center">Connexion</h3>
            <p className="u-text-center">Connectez-vous à votre compte</p>
            <button
              className="button button--primary u-align-center"
              onClick={() => {
                window.location.href = "/connexion";
              }}
            >
              Se connecter
            </button>
          </div>
        </div>
        <div className="card card--shadow">
          <div className="card__item-info">
            <h3 className="u-text-center">Inscription</h3>
            <p className="u-text-center">Créez votre nouveau compte</p>
            <button
              className="button button--primary u-align-center"
              onClick={() => {
                window.location.href = "/inscription";
              }}
            >
              S'inscrire
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default choixLogSign;