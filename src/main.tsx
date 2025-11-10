import ReactDOM from "react-dom/client";
import "./css/reset.css";
import "./css/variables.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";

import Home from './components/Home/Home'
import Catalog from "./components/Catalog/Catalog.tsx";
import Movie from "./components/Movie/Movie.tsx";
import Quiz from "./components/Quiz/Quiz.tsx";
import Recos from "./components/Recos/Recos.tsx";


const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/catalogue",
				element: <Catalog />,
			},
			{
				path: "/film/:id",
				element: <Movie />,
			},
			{
				path: "/quiz",
				element: <Quiz />,
			},
			{
				path: "/recommendations",
				element: <Recos />,
			},
		],
	},
]);

const rootElement = document.getElementById("root");

if (rootElement != null) {
	ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}