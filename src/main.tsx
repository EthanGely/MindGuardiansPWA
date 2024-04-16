import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './home';
import Presentation from './components/fonctionnalites/fonctionnalites';
import Connexion from './components/connexion/signin';
import Famille from './components/roles/famille/Famille';
import Medical from './components/roles/medical/Medical';
import Patient from './components/roles/patient/Patient';
import ErrorPage from "./components/error";
import './App.scss'
import './index.css'
/*
const serveur = "https://ethan-server.com:8443";


async function checkToken() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        const response = await fetch(serveur + '/auth/checkToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            }
        });
        if (response.status === 200) {
            response.json().then((data: { jwt: string, user: any }) => {
                localStorage.setItem('jwtToken', data.jwt);
                setUser({ user: data.user });
            });
            return true;
        }
    }
    return false;
}
*/


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
        //errorElement: <ErrorPage />,
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
