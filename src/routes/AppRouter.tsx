import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import PrivateRoute from "./PrivateRoute";

/*------ ROUTES PATIENT ------ */
import PatientLayout from "../components/Layouts/PatientLayout";
import PatientDashboard from "../pages/Patient/Dashboard";
import PatientAgenda from "../pages/Patient/Agenda";

/*------ ROUTES DOCTEUR ------ */
import DoctorLayout from "../components/Layouts/DoctorLayout";
import DoctorDashboard from "../pages/Doctor/Dashboard";

/*------ ROUTES FAMILLE ------ */
import FamilyLayout from "../components/Layouts/FamilyLayout";
import FamilyDashboard from "../pages/Family/Dashboard";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/*" element={<AuthRoutes />} />
      <Route element={<PrivateRoute />}>
        <Route path="patient" element={<PatientLayout />}>
          <Route index element={<PatientDashboard />} />
          <Route path="agenda" element={<PatientAgenda />} />
          <Route path="*" element={<Navigate to="/patient" />} />
        </Route>
        <Route path="docteur" element={<DoctorLayout />}>
          <Route index element={<DoctorDashboard />} />
          <Route path="*" element={<Navigate to="/docteur" />} />
        </Route>
        <Route path="famille" element={<FamilyLayout />}>
          <Route index element={<FamilyDashboard />} />
          <Route path="*" element={<Navigate to="/famille" />} />
        </Route>
      </Route>
    </Routes>
  </Router>
);

export default AppRouter;
