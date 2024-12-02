import { Route, Routes } from "react-router-dom";
import PatientLayout from "../components/Layouts/PatientLayout";
import Dashboard from "../pages/Patient/Dashboard";
import Agenda from "../pages/Patient/Agenda";

const PatientRoutes = () => (
  <Routes>
    <Route path="/" element={<PatientLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="agenda" element={<Agenda />} />
    </Route>
  </Routes>
);

export default PatientRoutes;
