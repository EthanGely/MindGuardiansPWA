import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import PrivateRoute from "./PrivateRoute";
import PatientRoutes from "./PatientRoutes";
import DoctorRoutes from "./DoctorRoutes";
import FamilyRoutes from "./FamilyRoutes";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/*" element={<AuthRoutes />} />
      <Route path="/patients/*" element={<PrivateRoute />}>
        <Route path="/patients/*" element={<PatientRoutes />} />
      </Route>
      <Route path="/doctor/*" element={<PrivateRoute />}>
        <Route path="/doctor/*" element={<DoctorRoutes />} />
      </Route>
      <Route path="/family/*" element={<PrivateRoute />}>
        <Route path="/family/*" element={<FamilyRoutes />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRouter;
