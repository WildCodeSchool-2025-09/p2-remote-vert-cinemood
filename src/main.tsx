import ReactDOM from "react-dom/client";
import router from "./router";
import { RouterProvider } from "react-router";
import "./css/reset.css";
import "./css/variables.css";
const rootElement = document.getElementById("root");

if (rootElement != null) {
	ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
