import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Doctorlayout: React.FC = () => {
  return (
    <div className="layout">
      <Header userType="Doctor" title="Docteur" isHome={true} />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Doctorlayout;
