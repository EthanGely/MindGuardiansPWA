import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/NewAuthProvider";

const PrivateRoute = () => {
  const user = useAuth();
  if (!user || !user.token) return <Navigate to="/connexionInscription" />;
  return <Outlet />;
};

export default PrivateRoute;