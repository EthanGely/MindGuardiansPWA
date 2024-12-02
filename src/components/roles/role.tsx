import { useEffect, useState } from "react";
// @ts-ignore
import Patient from "./patient/Patient";
// @ts-ignore
import Medical from "./medical/Medical";
// @ts-ignore
import Famille from "./famille/Famille";

function Role() {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    // Gets the user details linked to the token
    const responsePromise = fetch("https://ethan-server.com:8443/user/getCurrent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });

    responsePromise.then((response: Response) => {
      if (response.status === 200) {
        response.json().then((data: { userFirstName: string; userLastName: string; libelleRole: string }) => {
          setRole(data.libelleRole);
          setName(data.userFirstName + " " + data.userLastName);
        });
      } else {
        window.location.href = "/";
      }
    });
  }, []);
  return (
    <div>
      <h1>
        Interface <span id="role">{role}</span>
      </h1>
      <h2>
        Bonjour <span id="name">{name}</span>
      </h2>
    </div>
  );
}

export default Role;
