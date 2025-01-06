import mgLogoBlanc from "../../assets/mg-icon-blanc.svg";
import { useAuth } from "../../context/NewAuthProvider";

interface HeaderProps {
  userType: string;
  title: string;
  isHome: boolean;
}

export default function Header({ userType, title, isHome }: HeaderProps) {
  const authContext = useAuth();
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  let docHasPatient = false;

  if (userType.toLocaleLowerCase() === "docteur") {
    docHasPatient = !!localStorage.getItem("selectedPatient");
  }

  return (
    <header className={"header header--" + userType.toLocaleLowerCase()}>
      <div className="header__logo">
        <img src={mgLogoBlanc} alt="Logo MindGuardians" />
        <h1>{title}</h1>
      </div>
      <div className="header__buttons">
        {isHome && <button className="button button--small">Réglages</button>}
        {!isHome && (
          <button
            className="button button--small"
            onClick={() => {
              window.location.href = "/" + userType.toLocaleLowerCase();
            }}
          >
            Accueil
          </button>
        )}
        {docHasPatient && (
          <button className="button button--small" onClick={() => {localStorage.removeItem("selectedPatient"); window.location.href = "/docteur/selectionPatient"}}>
          Changer de patient
        </button>
        )}
        <button className="button button--small" onClick={authContext.logOut}>
          Déconnexion
        </button>
      </div>
    </header>
  );
}
