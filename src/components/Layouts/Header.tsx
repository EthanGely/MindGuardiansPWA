import mgLogoBlanc from "../../assets/mg-icon-blanc.svg";

interface HeaderProps {
  userType: string;
  title: string;
  isHome: boolean;
}

export default function Header({ userType, title, isHome }: HeaderProps) {
  return (
    <header className={"header header--" + userType.toLocaleLowerCase()}>
      <div className="header__logo">
        <img src={mgLogoBlanc} alt="Logo MindGuardians" />
        <h1>{title}</h1>
      </div>
      <div className="header__buttons">
        {isHome && (
          <button className="button button--small">Réglages</button>
        )}
        {!isHome && (
          <button className="button button--small" onClick={() => {window.location.href = "/" + userType.toLocaleLowerCase();}}>Accueil</button>
        )}
        <button className="button button--small">Profil</button>
      </div>
    </header>
  );
}
