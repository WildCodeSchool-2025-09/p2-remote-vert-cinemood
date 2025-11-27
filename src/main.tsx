import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import router from "./router";
import "./css/reset.css";
import "./css/variables.css";
import TagFavoriteProvider from "./Contexts/TagFavoriteContext";
import TagWatchLaterProvider from "./Contexts/TagWatchLaterContext";
import QuizProvider from "./context/QuizContext";

const rootElement = document.getElementById("root");

if (rootElement != null) {
	ReactDOM.createRoot(rootElement).render(
		<TagWatchLaterProvider>
			<TagFavoriteProvider>
				<QuizProvider>
					<RouterProvider router={router} />
				</QuizProvider>
				,
			</TagFavoriteProvider>
			,
		</TagWatchLaterProvider>,
	);
}
