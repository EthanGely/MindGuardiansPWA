import React, { useState } from "react";

interface patientData {
  USER_MAIL: string;
  USER_PASSWORD: string;
  USER_LANG: string;
  USER_FIRSTNAME: string;
  USER_LASTNAME: string;
  USER_FONTSIZE: number;
  USER_VOLUME: number;
  USER_BIRTH: number;
  USER_SEXE: boolean;
  USER_HEUREREVEIL: string;
  USER_HEURECOUCHER: string;
}

const defaultData: patientData = {
  USER_MAIL: "",
  USER_PASSWORD: "",
  USER_LANG: "FR",
  USER_FIRSTNAME: "",
  USER_LASTNAME: "",
  USER_FONTSIZE: 20,
  USER_VOLUME: 100,
  USER_BIRTH: 0,
  USER_SEXE: false,
  USER_HEUREREVEIL: "08:00",
  USER_HEURECOUCHER: "22:00",
};

interface SignupPatientProps {
  step: number;
}

const SignupPatient: React.FC<SignupPatientProps> = ({ step }) => {
  const [formData, setFormData] = useState<patientData>(defaultData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add form submission logic here
    console.log(formData);
  };

  if (step === 1) {
    return (
      <>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="inputGroup">
            <p className="libelle">Votre nom complet</p>
            <div className="inputs">
              <label htmlFor="USER_FIRSTNAME" className="hidden">
                Prénom
              </label>
              <input type="text" name="USER_FIRSTNAME" id="USER_FIRSTNAME" value={formData.USER_FIRSTNAME} />
              <label htmlFor="USER_LASTNAME" className="hidden">
                Nom de famille
              </label>
              <input type="text" name="USER_LASTNAME" id="USER_LASTNAME" value={formData.USER_LASTNAME} />
            </div>
          </div>
        </form>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required autoComplete="off" aria-autocomplete="none" />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required autoComplete="off" aria-autocomplete="none" />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required autoComplete="off" aria-autocomplete="none" />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required autoComplete="off" aria-autocomplete="none" />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupPatient;
