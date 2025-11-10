import { createBrowserRouter } from "react-router";
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
				path: "/recommandations",
				element: <Recos />,
			},
		],
	},
]);

export default router;