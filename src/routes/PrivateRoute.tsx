import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const PrivateRoute: React.FC = () => {
  const authContext = useAuth();
  const isAuthenticated = authContext ? authContext.isAuthenticated : false;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
