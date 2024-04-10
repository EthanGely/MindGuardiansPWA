import { useEffect } from "react";
import Patient from "./patient/Patient";
import Medical from "./medical/Medical";
import Famille from "./famille/Famille";


function Role() {
    useEffect(() => {
        // Gets the user details linked to the token
        const responsePromise = fetch('https://ethan-server.com:8443/user/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
            }
        });

        responsePromise.then((response: Response) => {
            if (response.status === 200) {
                response.json().then((data: { userFirstName: string, userLastName: string, libelleRole: string }) => {
                    const name = document.getElementById('name') as HTMLSelectElement;
                    const role = document.getElementById('role') as HTMLSelectElement;
                    role.innerText = data.libelleRole;
                    name.innerText = data.userFirstName + " " + data.userLastName;
                    name.classList.add('loaded');
                    role.classList.add('loaded');
                });
            } else {
                window.location.href = "/";
            }
        });
    }, []);
    return (
        <div>
            <h1>Interface <span id="role"></span></h1>
            <h2>Bonjour <span id="name"></span></h2>
        </div>
    );
}

export default Role;