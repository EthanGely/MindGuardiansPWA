import LogoMindGaurdians from "../../assets/logo-mind-guardians.png";

function choixLogSign() {
  return (
    <>
      <div className="logo u-align-center u-mb-8">
        <img src={LogoMindGaurdians} alt="Logo Mind Guardians" />
      </div>
      <div className="card__list list-2">
        <div className="card card--shadow card--rounded">
          <div className="card__item-info">
            <h3 className="card__title">
              <a href="/connexion" className="card__link card__link--cover">
                Connexion
              </a>
            </h3>
          </div>
          <div className="card__body u-p-4">
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
        <div className="card card--shadow card--rounded">
          <div className="card__item-info">
            <h3 className="card__title">
              <a href="/inscription" className="card__link card__link--cover">
                Inscription
              </a>
            </h3>
          </div>
          <div className="card__body u-p-4">
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
