import { createContext, useEffect, useState } from "react";
import { fetchMovies } from "../../data";

export const SearchbarContext = createContext(null);

function SearchbarProvider({ children }: { children: any }): JSX.Element {
	const [movies, setMovies] = useState([]);
	const [filteredMovies, setFilteredMovies] = useState([]);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		fetchMovies().then(setMovies);
		fetchMovies().then(setFilteredMovies);
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
