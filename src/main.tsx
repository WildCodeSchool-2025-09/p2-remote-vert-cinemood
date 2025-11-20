import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import router from "./router";
import "./css/reset.css";
import "./css/variables.css";
import TagAlreadySeenProvider from "./Contexts/TagAlreadySeenContext";

const rootElement = document.getElementById("root");

if (rootElement != null) {
	ReactDOM.createRoot(rootElement).render(
		<TagAlreadySeenProvider>
			<RouterProvider router={router} />
		</TagAlreadySeenProvider>,
	);
}
