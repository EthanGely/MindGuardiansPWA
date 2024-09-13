import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './home';
import Presentation from './components/fonctionnalites/fonctionnalites';
import Connexion from './components/connexion/choixLogSign';
import Famille from './components/roles/famille/Famille';
import Medical from './components/roles/medical/Medical';
import Patient from './components/roles/patient/Patient';
import ErrorPage from "./components/error";
import './App.scss'
import './index.css'

const serveur = "https://ethan-server.com:8443";

/**
 * 
 * @param route The route to send the token to and get data from (without the server address)
 * @returns data from the route
 */
export async function getDataFromRoute(route: string, body?: any) {
    const token = localStorage.getItem('jwtToken');
    if (token && token != undefined) {
        try {
            const response = await fetch(serveur + route, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer: ' + token
                },
                body: JSON.stringify(body ? body : {})
            });

            if (response.ok) {
                console.log('Response status is 200');
                const data = await response.json();
                if (data.jwt && data.jwt != undefined) {
                    console.log('Data from API :', data);
                    localStorage.setItem('jwtToken', data.jwt);
                    return data;
                } else {
                    console.error('No jwt in data:', data);
                    return false;
                }
            } else {
                console.error('Response status is not 200');
                throw new Error('Response status is not 200');
            }
        } catch (error) {
            console.error('Error in getDataWithToken:', error);
            return false;
        }
    } else {
        console.error('No token in localStorage');
        return false;
    }
}


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
    },
    {
        // Page de connexion / inscription
        path: "/connexion",
        element: <Connexion />,
        //errorElement: <ErrorPage />,
    },
    {
        // Page de présentation de l'application
        path: "/presentation",
        element: <Presentation />,
        errorElement: <ErrorPage />,
    },
    {
        // Page d'accueil de la famille
        path: "/famille",
        element: <Famille />,
        errorElement: <ErrorPage />,
    },
    {
        // Page d'accueil du personnel médical
        path: "/medical",
        element: <Medical />,
        errorElement: <ErrorPage />,
    },
    {
        // Page d'accueil du patient
        path: "/patient",
        element: <Patient />,
        errorElement: <ErrorPage />,
    }
]);
/*
if (! await checkToken()) {
    if (localStorage.getItem('notFirstTime')) {
        router.navigate("/log");
    } else {
        router.navigate("/presentation");
    }
}
*/


ReactDOM.createRoot(document.getElementById("root")!).render(
    <RouterProvider router={router} />
);
