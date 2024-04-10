import { useEffect } from "react";

function Patient() {
    //post request to route "https://ethan-server.com:8443/user/get" with the jwt token in the header"
    useEffect(() => {
        const responsePromise = fetch('https://ethan-server.com:8443/user/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
            }
        });

        responsePromise.then((response: Response) => {
            if (response.status === 200) {
                response.json().then((data: { userFirstName: string, userLastName: string }) => {
                    const name = document.getElementById('name') as HTMLSelectElement;
                    name.innerText = data.userFirstName + " " + data.userLastName;
                    name.classList.add('loaded');
                });
            } else {
                window.location.href = "/";
            }
        });
    }, []);
    return (
        <div>
            <h1>Interface Patient</h1>
            <h2>Bonjour <span id="name"></span></h2>
        </div>
    );
}

export default Patient;