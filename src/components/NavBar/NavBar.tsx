import SearchInput from "../SearchInput/SearchInput";
import "./NavBar.css";
import { useContext } from "react";
import { SearchbarContext } from "../Context/SearchBarContexts";

function NavBar() {
	const { allMovies, setMovies, setFilteredMovies, isOpen, setIsOpen } =
		useContext(SearchbarContext);

	return (
		<div className="navbar">
			<SearchInput
				isOpen={isOpen}
				setFilteredMovies={setFilteredMovies}
				movieData={allMovies}
				setIsOpen={setIsOpen}
			/>
		</div>
	);
}

export default NavBar;
