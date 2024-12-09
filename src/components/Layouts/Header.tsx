import mgLogoBlanc from "../../assets/mg-icon-blanc.svg";

interface HeaderProps {
  userType: string;
  title: string;
}

export default function Header({ userType, title }: HeaderProps) {
  return (
    <header className={"header header--" + userType.toLocaleLowerCase()}>
      <div className="header__logo">
        <img src={mgLogoBlanc} alt="Logo MindGuardians" />
        <h1>{title}</h1>
      </div>
      <div className="header__buttons">
        <button className="button button--small">Réglages</button>
        <button className="button button--small">Profil</button>
      </div>
    </header>
  );
}
