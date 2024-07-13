import App from "../App";
import Login from "../components/Login";
import Register from "../components/Register";
import Home from '../components/Home'
import Protect from "./protect";
import { createBrowserRouter } from "react-router-dom";


const appRouter = createBrowserRouter([
    {
        path: "/",
        element: (
            <Protect>
                <App />
            </Protect>
        ),
        children: [
            {
                path: "/",
                element: <Home />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Register />,
    },
]);

export default appRouter;