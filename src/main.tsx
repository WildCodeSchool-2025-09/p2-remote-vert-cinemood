import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import router from "./router";
import "./css/reset.css";
import "./css/variables.css";
import FavoriteMoviesProvider from "./Contexts/FavoriteMovieContext";
import QuizProvider from "./context/QuizContext";

const rootElement = document.getElementById("root");

if (rootElement != null) {
	ReactDOM.createRoot(rootElement).render(
		<FavoriteMoviesProvider>
			<QuizProvider>
				<RouterProvider router={router} />
			</QuizProvider>
			,
		</FavoriteMoviesProvider>,
	);
}
