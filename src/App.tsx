import { Outlet } from "react-router";
import "./css/App.css";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";

function App() {
	return (
		<>
			<NavBar />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}

export default App;