import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const PatientLayout: React.FC = () => {
  return (
    <div className="layout">
      <Header userType="Patient" />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default PatientLayout;
