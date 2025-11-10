import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import "./css/reset.css";
import "./css/variables.css";
import App from "./App.tsx";
import Catalog from "./pages/Catalog/Catalog.tsx";
import Home from "./pages/Home/Home.tsx";
import Movie from "./pages/Movie/Movie.tsx";
import Quiz from "./pages/Quiz/Quiz.tsx";
import Recos from "./pages/Recos/Recos.tsx";

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
