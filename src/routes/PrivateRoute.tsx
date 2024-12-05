import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const PrivateRoute: React.FC = () => {
  const authContext = useAuth();
  const isAuthenticated = authContext ? authContext.isAuthenticated : false;
  console.log("isAuthenticated priavte route", isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/connexionInscription" />;
};

export default PrivateRoute;
