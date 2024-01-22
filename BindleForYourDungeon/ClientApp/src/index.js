import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom';
import Layout from './Layout';
import Home from './components/Home';
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
						element: <Characters />,
						loader: charactersLoader
					},
					{
						path: ':characterId',
						element: <CharacterSheet />,
						loader: characterSheetLoader,
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