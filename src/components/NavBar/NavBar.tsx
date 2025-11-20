import SearchInput from "../SearchInput/SearchInput";
import "./NavBar.css";
import { useContext } from "react";
import { SearchbarContext } from "../Context/SearchBarContexts";

function NavBar() {
	const {
		movies,
		setMovies,
		filteredMovies,
		setFilteredMovies,
		isOpen,
		setIsOpen,
	} = useContext(SearchbarContext);

	return (
		<div className="navbar">
			<SearchInput
				isOpen={isOpen}
				setFilteredMovies={setFilteredMovies}
				movieData={movies}
				setIsOpen={setIsOpen}
			/>
		</div>
	);
}

export default NavBar;
