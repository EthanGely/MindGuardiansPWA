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
import PatientPuzzle from "../pages/Patient/Puzzle/Puzzle";
import PatientPuzzleV2 from "../pages/Patient/Puzzle/Puzzle";

/*------ ROUTES DOCTEUR ------ */
import DoctorLayout from "../components/Layouts/DoctorLayout";
import DoctorDashboard from "../pages/Doctor/Dashboard";
import DoctorPatientSelect from "../pages/Doctor/PatientSelect";
import DoctorAgenda from "../pages/Doctor/Agenda";
import DoctorDetailPatient from "../pages/Doctor/InfosPatient";

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
          <Route path="puzzle" element={<PatientPuzzle isV2={true} />} />
          <Route path="*" element={<Navigate to="/patient" />} />
        </Route>
        <Route path="docteur" element={<DoctorLayout />}>
          <Route index element={<DoctorDashboard />} />
          <Route path="selectionPatient" element={<DoctorPatientSelect />} />
          <Route path="agenda" element={<DoctorAgenda />} />
          <Route path="detailsPatient" element={<DoctorDetailPatient />} />
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
