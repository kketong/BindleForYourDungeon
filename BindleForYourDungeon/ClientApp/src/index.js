import 'bootstrap/dist/css/bootstrap.css';
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Layout from "./Layout";
import ErrorPage from "./components/errorPage";
import Characters from "./components/Characters/Characters";
import CharacterDetails, { loader as characterDetailsLoader } from "./components/Characters/CharacterDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'Characters',
                children: [
                    {
                        index: true,
                        element: <Characters />,
                    },
                    {
                        path: ':characterId',
                        element: <CharacterDetails />,
                        loader: characterDetailsLoader,
                    }
                ]
            },
        ]
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);