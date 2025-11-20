import { createContext, useEffect, useState } from "react";
import { getAllMovies } from "../../api";

export const SearchbarContext = createContext(null);

function SearchbarProvider({ children }: { children }): JSX.Element {
	const [movies, setMovies] = useState([]);
	const [filteredMovies, setFilteredMovies] = useState([]);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		getAllMovies().then(setMovies);
		getAllMovies().then(setFilteredMovies);
	}, []);

	return (
		<SearchbarContext.Provider
			value={{
				movies,
				setMovies,
				isOpen,
				setIsOpen,
				filteredMovies,
				setFilteredMovies,
			}}
		>
			{children}
		</SearchbarContext.Provider>
	);
}

export default SearchbarProvider;
