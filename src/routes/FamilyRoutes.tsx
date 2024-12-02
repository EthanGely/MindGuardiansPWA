import { Route, Routes } from "react-router-dom";
import FamilyLayout from "../components/Layouts/FamilyLayout";
import Dashboard from "../pages/Family/Dashboard";

const FamilyRoutes = () => (
  <Routes>
    <Route path="/" element={<FamilyLayout />}>
      <Route index element={<Dashboard />} />
    </Route>
  </Routes>
);

export default FamilyRoutes;
