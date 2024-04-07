import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Log from './components/log/log';
import './index.css'
import Home from './components/home/home';
import Presentation from './components/fonctionnalites/fonctionnalites';
import ErrorPage from "./components/error";
import './App.css'

export const serveur = "http://82.66.255.189:3002";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />
    },
    {
        path: "/presentation",
        element: <Presentation />,
        errorElement: <ErrorPage />
    },
    {
        path: "/log",
        element: <Log />,
        errorElement: <ErrorPage />
    },
    {
        path: "/home",
        element: <Home />,
        errorElement: <ErrorPage />
    },
]);

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
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

if (! await checkToken()) {
    if (localStorage.getItem('notFirstTime')) {
        router.navigate("/log");
    } else {
        router.navigate("/presentation");
    }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <RouterProvider router={router} />
);
