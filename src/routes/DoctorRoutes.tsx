import { Route, Routes } from "react-router-dom";
import DoctorLayout from "../components/Layouts/DoctorLayout";
import Dashboard from "../pages/Doctor/Dashboard";

const DoctorRoutes = () => (
  <Routes>
    <Route path="/" element={<DoctorLayout />}>
      <Route index element={<Dashboard />} />
    </Route>
  </Routes>
);

export default DoctorRoutes;
