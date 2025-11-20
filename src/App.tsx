import { Outlet } from "react-router";
import "./css/App.css";
import SearchbarProvider from "./components/Context/SearchBarContexts";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";

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
