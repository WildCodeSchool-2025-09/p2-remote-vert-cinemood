import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import router from "./router";
import "./css/reset.css";
import "./css/variables.css";
import AlreadySeenMovieListProvider from "./Contexts/AlreadySeenMovieListContext";
import FavoriteMoviesListProvider from "./Contexts/FavoriteMovieListContext";
import LaunchProvider from "./context/LaunchQuiz";
import QuizProvider from "./context/QuizContext";

const rootElement = document.getElementById("root");

if (rootElement != null) {
	ReactDOM.createRoot(rootElement).render(
		<AlreadySeenMovieListProvider>
			<FavoriteMoviesListProvider>
				<LaunchProvider>
					<QuizProvider>
						<RouterProvider router={router} />
					</QuizProvider>
				</LaunchProvider>
			</FavoriteMoviesListProvider>
		</AlreadySeenMovieListProvider>,
	);
}
