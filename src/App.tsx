import { Outlet } from "react-router";
import "./css/App.css";
import "./css/App-mobile.css";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";

function App() {
	return (
		<>
			<NavBar />
			<main className="navbar-margin">
				<Outlet />
			</main>
			<Footer />
		</>
	);
}

export default App;
