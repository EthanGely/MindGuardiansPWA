import React, { useState } from "react";
import { useAuth } from "../../context/NewAuthProvider";
import { useNavigate } from "react-router-dom";

interface userData {
  USER_MAIL: string;
  USER_LANG: string;
  USER_FIRSTNAME: string;
  USER_LASTNAME: string;
  USER_FONTSIZE: number;
  USER_VOLUME: number;
  USER_BIRTH: number;
  USER_SEXE: number;
  USER_PASSWORD: string;
  USER_PASSWORDCONFIRM: string;
  USER_ROLEID: number;
}

const defaultData: userData = {
  USER_MAIL: "",
  USER_LANG: "FR",
  USER_FIRSTNAME: "",
  USER_LASTNAME: "",
  USER_FONTSIZE: 20,
  USER_VOLUME: 50,
  USER_BIRTH: 0,
  USER_SEXE: -1,
  USER_PASSWORD: "",
  USER_PASSWORDCONFIRM: "",
  USER_ROLEID: 2,
};

const choseLangue = false;

const SignupCommon: React.FC = () => {
  const [formData, setFormData] = useState<userData>(defaultData);
  const [step, setStep] = useState(1);
  const [error, setError] = useState<boolean>(true);

  const navigate = useNavigate();
  const authContext = useAuth();
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === "radio" ? Number(e.target.value) : e.target.value;
    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [e.target.name]: value,
      };
      setError(!checkFormInputs(updatedFormData));
      return updatedFormData;
    });
  };

  const checkFormInputs = (updatedFormData: userData) => {
    if (step === 1) {
      if (updatedFormData.USER_FIRSTNAME === "" || updatedFormData.USER_LASTNAME === "" || updatedFormData.USER_BIRTH === 0 || updatedFormData.USER_SEXE === -1) {
        return false;
      }
    } else if (step === 2) {
    } else if (step === 3) {
      if (updatedFormData.USER_PASSWORD === "" || updatedFormData.USER_PASSWORDCONFIRM === "" || updatedFormData.USER_PASSWORD !== updatedFormData.USER_PASSWORDCONFIRM) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (step < 3) {
      setStep(step + 1);
    } else if (step === 3) {
      if (formData.USER_FIRSTNAME === "" || formData.USER_LASTNAME === "" || formData.USER_BIRTH === 0 || formData.USER_SEXE === -1) {
        setStep(1);
        setError(true);
        return;
      }

      if (formData.USER_MAIL === "" || formData.USER_PASSWORD === "" || formData.USER_PASSWORDCONFIRM === "" || formData.USER_PASSWORD !== formData.USER_PASSWORDCONFIRM) {
        setStep(3);
        setError(true);
        return;
      }

      let newFormData = { ...formData };
      newFormData.USER_BIRTH = Math.floor(new Date(newFormData.USER_BIRTH).getTime() / 1000);
      newFormData.USER_ROLEID = 1;

      const response = await authContext.signIn(newFormData);
      
      if(response && typeof response === "string") {
        
        navigate(response);
        return;
      }
      setStep(1);
      setError(true);
      return;
    }
  };

  if (step === 1) {
    return (
      <>
        <form onSubmit={handleSubmit} autoComplete="off" className="form form--padding">
          <fieldset className="form__fieldset">
            <legend className="form__legend">Informations personelles</legend>
            <div className="form__inputGroup">
              <p className="form__libelle">Votre nom complet</p>
              <div className="form__inputs">
                <label htmlFor="USER_FIRSTNAME" className="hidden">
                  Prénom
                </label>
                <input type="text" name="USER_FIRSTNAME" id="USER_FIRSTNAME" value={formData.USER_FIRSTNAME} placeholder="Prénom" onChange={handleChange} />
                <label htmlFor="USER_LASTNAME" className="hidden">
                  Nom de famille
                </label>
                <input type="text" name="USER_LASTNAME" id="USER_LASTNAME" value={formData.USER_LASTNAME} placeholder="Nom de famille" onChange={handleChange} />
              </div>
            </div>
            <div className="form__inputGroup">
              <p className="form__libelle">Date de naissance</p>
              <div className="form__inputs">
                <label htmlFor="USER_BIRTH" className="hidden">
                  Date de naissance
                </label>
                <input type="date" name="USER_BIRTH" id="USER_BIRTH" value={formData.USER_BIRTH} placeholder="Date de naissance" onChange={handleChange} />
              </div>
            </div>
            <div className="form__inputGroup">
              <p className="form__libelle">Votre sexe</p>
              <div className="form__inputs">
                <label htmlFor="USER_SEXE" className="hidden">
                  Sexe
                </label>
                <div className="form__radio-button-wrapper">
                  <div className="form__radio-button-item">
                    <input type="radio" name="USER_SEXE" id="USER_SEXE0" value="0" checked={formData.USER_SEXE === 0} onChange={handleChange} />
                    <label htmlFor="USER_SEXE0">Femme</label>
                  </div>
                  <div className="form__radio-button-item">
                    <input type="radio" name="USER_SEXE" id="USER_SEXE1" value="1" checked={formData.USER_SEXE === 1} onChange={handleChange} />
                    <label htmlFor="USER_SEXE1">Homme</label>
                  </div>
                  <div className="form__radio-button-item">
                    <input type="radio" name="USER_SEXE" id="USER_SEXE2" value="2" checked={formData.USER_SEXE === 2} onChange={handleChange} />
                    <label htmlFor="USER_SEXE2">Autre</label>
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" disabled={error} className="button button--primary button--small u-mt-4 u-align-center">
              Suivant
            </button>
          </fieldset>
        </form>
      </>
    );
  } else if (step === 2) {
    return (
      <>
        <form onSubmit={handleSubmit} autoComplete="off" className="form form--padding">
          <fieldset className="form__fieldset">
            <legend className="form__legend">Informations complémentaires</legend>
            {choseLangue && (
              <div className="form__inputGroup">
                <p className="form__libelle">Langue préférée</p>
                <div className="form__inputs">
                  <label htmlFor="USER_LANG" className="hidden">
                    Langue
                  </label>
                  <select name="USER_LANG" id="USER_LANG" value={formData.USER_LANG} onChange={handleChange}>
                    <option value="FR">Français</option>
                    <option value="EN">English</option>
                  </select>
                </div>
              </div>
            )}
            <div className="form__inputGroup">
              <p className="form__libelle">
                Volume sonore :{" "}
                <strong>
                  {Number(formData.USER_VOLUME) <= 33 ? "bas" : Number(formData.USER_VOLUME) <= 77 ? "moyen" : "élevé"} ({formData.USER_VOLUME}%)
                </strong>
              </p>
              <div className="form__inputs">
                <label htmlFor="USER_VOLUME" className="hidden">
                  Volume sonore
                </label>
                <input type="range" name="USER_VOLUME" id="USER_VOLUME" min="0" max="100" step="1" value={formData.USER_VOLUME} onChange={handleChange} />
              </div>
            </div>
            <div className="form__inputGroup">
              <p className="form__libelle">
                Taille du texte :{" "}
                <strong>
                  {Number(formData.USER_FONTSIZE) <= 18 ? "bas" : Number(formData.USER_FONTSIZE) <= 25 ? "moyen" : "élevé"} ({formData.USER_FONTSIZE})
                </strong>
              </p>
              <div className="form__inputs">
                <label htmlFor="USER_FONTSIZE" className="hidden">
                  Taille du texte
                </label>
                <input type="range" name="USER_FONTSIZE" id="USER_FONTSIZE" min="10" max="30" step="1" value={formData.USER_FONTSIZE} onChange={handleChange} />
              </div>
            </div>
            <button type="submit" disabled={error} className="button button--primary button--small u-mt-4 u-align-center">
              Prochaine étape
            </button>
          </fieldset>
        </form>
      </>
    );
  } else if (step === 3) {
    return (
      <>
        <form onSubmit={handleSubmit} autoComplete="off" className="form form--padding">
          <fieldset className="form__fieldset">
            <legend className="form__legend">Informations de connexion</legend>
            <div className="form__inputGroup">
              <p className="form__libelle">Votre Adresse E-mail</p>
              <div className="form__inputs">
                <label htmlFor="USER_MAIL" className="hidden">
                  Adresse E-mail
                </label>
                <input type="email" name="USER_MAIL" id="USER_MAIL" value={formData.USER_MAIL} placeholder="exemple@email.fr" onChange={handleChange} />
              </div>
            </div>
            <div className="form__inputGroup">
              <p className="form__libelle">Votre mot de passe</p>
              <div className="form__inputs">
                <label htmlFor="USER_PASSWORD" className="hidden">
                  Mot de passe
                </label>
                <input type="password" name="USER_PASSWORD" id="USER_PASSWORD" value={formData.USER_PASSWORD} placeholder="Mot de passe" onChange={handleChange} />
              </div>
            </div>
            <div className="form__inputGroup">
              <p className="form__libelle">Confirmation du mot de passe</p>
              <div className="form__inputs">
                <label htmlFor="USER_PASSWORD" className="hidden">
                  Confirmation du mot de passe
                </label>
                <input type="password" name="USER_PASSWORDCONFIRM" id="USER_PASSWORDCONFIRM" value={formData.USER_PASSWORDCONFIRM} placeholder="Confirmation du mot de passe" onChange={handleChange} />
              </div>
            </div>
            <button type="submit" disabled={error} className="button button--primary button--small u-mt-4 u-align-center">
              Suivant
            </button>
          </fieldset>
        </form>
      </>
    );
  }
};

export default SignupCommon;
