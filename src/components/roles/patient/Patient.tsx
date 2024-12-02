import { useEffect, useState } from "react";
import Chat from "../../utils/chat";
import Agenda from "../../utils/agenda";
import { getDataFromAPI } from "../../../main";
import Header from "./headerPatient";

function Patient() {
  const [location, setLocation] = useState("/");
  const [name, setName] = useState("");

  //post request to route "https://ethan-server.com:8443/user/getCurrent" with the jwt token in the header"
  useEffect(() => {
    getDataFromAPI("/user/getCurrent").then((data) => {
      if (data) {
        const name = document.getElementById("name") as HTMLSelectElement;
        if (name === null) {
          return;
        }
        setName(data.userFirstName + " " + data.userLastName);
      } else {
        window.location.href = "/";
      }
    });
  }, []);

  if (location === "/chat") {
    return (
      <>
        <div>
          <p>Chat avec la famille</p>
          <Chat />
        </div>
        <div className="disconnect">
          <button
            className="button button--primary"
            onClick={() => {
              localStorage.removeItem("jwtToken");
              window.location.href = "/";
            }}
          >
            Disconnect
          </button>
        </div>
      </>
    );
  } else if (location === "/agenda") {
    return <Agenda />;
  } else {
    return (
      <>
        <Header />
        <div>
          <h1>Interface Patient</h1>
          <h2>
            Bonjour <span id="name">{name}</span>
          </h2>
          <button
            className="button button--primary u-align-center"
            onClick={() => {
              setLocation("/chat");
            }}
          >
            Discuter avec ma famille
          </button>
          <br />
          <button
            className="button button--primary u-align-center"
            onClick={() => {
              setLocation("/agenda");
            }}
          >
            Agenda
          </button>
        </div>
        <div className="disconnect">
          <button
            className="button button--secondary u-align-center u-mb-5"
            onClick={() => {
              localStorage.removeItem("jwtToken");
              window.location.href = "/";
            }}
          >
            Déconnexion
          </button>
        </div>
      </>
    );
  }
}

export default Patient;
