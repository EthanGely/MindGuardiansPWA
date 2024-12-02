import mgLogoBlanc from "../../../assets/mg-icon-blanc.svg";

export default function Header() {
  return (
    <header className="header header--patient">
      <div className="header__logo">
        <img src={mgLogoBlanc} alt="Logo MindGuardians" />
      </div>
      <div className="header__buttons">
        <button className="button button--small">Réglages</button>
        <button className="button button--small">Profil</button>
      </div>
    </header>
  );
}
