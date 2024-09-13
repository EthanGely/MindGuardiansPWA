import { useEffect, useState } from "react";
import Chat from "../../utils/chat";
import { getDataFromRoute } from "../../../main";

function Patient() {
    const [location, setLocation] = useState("/");

    //post request to route "https://ethan-server.com:8443/user/getCurrent" with the jwt token in the header"
    useEffect(() => {
        getDataFromRoute('/user/getCurrent').then(data => {
            if (data) {
                const name = document.getElementById('name') as HTMLSelectElement;
                if (name === null) {
                    return;
                }
                name.innerText = data.userFirstName + " " + data.userLastName;
                name.classList.add('loaded');
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
                    <button onClick={() => { localStorage.removeItem('jwtToken'); window.location.href = "/"; }}>Disconnect</button>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div>
                    <h1>Interface Patient</h1>
                    <h2>Bonjour <span id="name"></span></h2>
                    <button onClick={() => { setLocation("/chat") }}>Discuter avec ma famille</button>
                </div>
                <div className="disconnect">
                    <button onClick={() => { localStorage.removeItem('jwtToken'); window.location.href = "/"; }}>Disconnect</button>
                </div>
            </>
        );
    }
}

export default Patient;