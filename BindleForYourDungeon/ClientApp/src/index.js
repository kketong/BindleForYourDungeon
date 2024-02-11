import 'bootstrap/dist/css/bootstrap.css';
import './custom.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider
} from 'react-router-dom';

import Layout from './Layout';
import Home from './components/Home';
import AdminPage from './components/admin/AdminPage';
import ErrorPage from './components/ErrorPage';
import Characters, { loader as charactersLoader } from './components/characters/Characters';
import CharacterSheet, { loader as characterSheetLoader } from './components/characters/CharacterSheet';

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: 'Home',
				element: <Home />
			},
			{
				path: 'Characters',
				children: [
					{
						index: true,
						loader: charactersLoader,
						element: <Characters />,
					},
					{
						path: ':characterId',
						loader: characterSheetLoader,
						element: <CharacterSheet />						
					}
				]
			},
			{
				path: 'Admin',
				element: <AdminPage />
			}
		]
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
			<RouterProvider router={router} />
	</React.StrictMode>
);