import 'bootstrap/dist/css/bootstrap.css';
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Root from "./components/root";
import ErrorPage from "./components/errorPage";
import Characters from "./components/Characters/Characters";
import CharacterDetails from "./components/Characters/CharacterDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'Characters',
                element: <Characters />,
                children: [
                    {
                        path: 'Characters/details/:characterId',
                        element: <CharacterDetails />,
                    }
                ]
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);