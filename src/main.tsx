import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import router from "./router";
import "./css/reset.css";
import "./css/variables.css";
import AlreadySeenMoviesListProvider from "./Contexts/AlreadySeenMoviesListContext";
import FavoriteMoviesListProvider from "./Contexts/FavoriteMovieListContext";
import LaunchProvider from "./context/LaunchQuiz";
import QuizProvider from "./context/QuizContext";

const rootElement = document.getElementById("root");

if (rootElement != null) {
	ReactDOM.createRoot(rootElement).render(
		<AlreadySeenMoviesListProvider>
			<FavoriteMoviesListProvider>
				<LaunchProvider>
					<QuizProvider>
						<RouterProvider router={router} />
					</QuizProvider>
				</LaunchProvider>
				,
			</FavoriteMoviesListProvider>
			,
		</AlreadySeenMoviesListProvider>,
	);
}
