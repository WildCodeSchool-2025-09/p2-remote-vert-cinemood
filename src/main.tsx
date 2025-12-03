import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import router from "./router";
import "./css/reset.css";
import "./css/variables.css";
import AlreadySeenMovieListProvider from "./context/AlreadySeenMovieListContext";
import FavoriteMoviesListProvider from "./context/FavoriteMovieListContext";
import LaunchProvider from "./context/LaunchQuiz";
import QuizProvider from "./context/QuizContext";
import WatchListMoviesProvider from "./context/WatchListMoviesContext";

const rootElement = document.getElementById("root");

if (rootElement != null) {
	ReactDOM.createRoot(rootElement).render(
		<WatchListMoviesProvider>
			<AlreadySeenMovieListProvider>
				<FavoriteMoviesListProvider>
					<LaunchProvider>
						<QuizProvider>
							<RouterProvider router={router} />
						</QuizProvider>
					</LaunchProvider>
				</FavoriteMoviesListProvider>
			</AlreadySeenMovieListProvider>
		</WatchListMoviesProvider>,
	);
}
