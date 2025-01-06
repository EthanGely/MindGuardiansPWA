import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

interface User {
  USER_ID: number;
  USER_FIRSTNAME: string;
  USER_LASTNAME: string;
}

const Doctorlayout: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    const checkPatient = async () => {
      const doctorUnparsed = localStorage.getItem("currentUser");
      const token = localStorage.getItem("jwtToken");

      if (doctorUnparsed) {
        let doctor = null;
        try {
          doctor = await JSON.parse(doctorUnparsed);
        } catch (e) {
          console.log("error parsing :", e);
          return;
        }

        if (doctor && token && doctor.token === token) {
          console.log("doctor from local storage");
          setCurrentUser(doctor);
          return;
        }
      }

      console.log("doctor from server");

      if (token && token !== undefined && token !== "undefined" && token !== "") {
        const response = await fetch("https://ethan-server.com:8443/user/getCurrent", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        let res = null;

        try {
          res = await response.json();
        } catch (e) {
          console.log("error reading response :", e);
          return;
        }

        const currentUserRes = res.user;
        currentUserRes.token = token;
        localStorage.setItem("currentUser", JSON.stringify(currentUserRes));

        setCurrentUser(currentUserRes);
        return;
      }
      return;
    };
    checkPatient();
  }, []);

  const location = useLocation();
  const isHome = location.pathname === "/docteur" || !!!localStorage.getItem("selectedPatient");

  return (
    <div className="layout">
      <Header userType="Docteur" title={currentUser ? currentUser.USER_FIRSTNAME + " " + currentUser.USER_LASTNAME : "Personnel médical"} isHome={isHome} />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Doctorlayout;
