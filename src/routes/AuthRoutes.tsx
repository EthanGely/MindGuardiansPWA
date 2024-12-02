import { Route, Routes } from "react-router-dom";
import AuthLayout from "../pages/Auth/AuthLayout";
import LogSignChoice from "../pages/Auth/LogSignChoice";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import OnboardingSlideshow from "../home";
import HomePage from "../pages/Onboarding/OnboardingSlideshow";

const AuthRoutes = () => (
  <Routes>
    <Route path="/" element={<AuthLayout />}>
      <Route index path="/" element={<HomePage />} />
      <Route path="/presentation" element={<OnboardingSlideshow />} />
      <Route path="connexionInscription" element={<LogSignChoice />} />
      <Route path="connexion" element={<Login />} />
      <Route path="inscription" element={<Signup />} />
    </Route>
  </Routes>
);

export default AuthRoutes;
