import { Outlet } from "react-router";
import "./css/App.css";
import "./css/App-mobile.css";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import SearchbarProvider from "./context/SearchBarContext";

function App() {
	return (
		<>
			<SearchbarProvider>
				<NavBar />
				<main>
					<Outlet />
				</main>
			</SearchbarProvider>
			<Footer />
		</>
	);
}

export default App;
