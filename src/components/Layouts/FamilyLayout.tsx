import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const FamilyLayout: React.FC = () => {
  return (
    <div className="layout">
      <Header userType="Family" title="Famille" />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default FamilyLayout;
