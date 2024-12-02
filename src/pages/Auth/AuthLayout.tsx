import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Layouts/Footer";

const AuthLayout: React.FC = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default AuthLayout;
