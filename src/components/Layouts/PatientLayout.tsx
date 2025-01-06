import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

const pageTitles: { [key: string]: string } = {
  "/patient": "Accueil",
  "/patient/agenda": "Agenda",
  "/patient/chat": "Chat with Doctor",
  "/patient/puzzle": "Puzzle",
};

const PatientLayout: React.FC = () => {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "Accueil";
  const isHome = title === "Accueil";

  return (
    <div className="layout">
      <Header userType="Patient" title={title} isHome={isHome} />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default PatientLayout;
