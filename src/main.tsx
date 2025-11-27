import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import router from "./router";
import "./css/reset.css";
import "./css/variables.css";
import FavoritesMoviesProvider from "./Contexts/FavoritesMoviesContext";
import WatchListMoviesProvider from "./Contexts/WatchListMoviesContext";
import QuizProvider from "./context/QuizContext";

const rootElement = document.getElementById("root");

if (rootElement != null) {
	ReactDOM.createRoot(rootElement).render(
		<WatchListMoviesProvider>
			<FavoritesMoviesProvider>
				<QuizProvider>
					<RouterProvider router={router} />
				</QuizProvider>
				,
			</FavoritesMoviesProvider>
			,
		</WatchListMoviesProvider>,
	);
}
