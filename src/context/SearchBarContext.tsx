import { createContext, useEffect, useState } from "react";
import {
	getMoviesPage1,
	getMoviesPage2,
	getMoviesPage3,
	getMoviesPage4,
	getMoviesPage5,
} from "../api";

export const SearchbarContext = createContext(null);

function SearchbarProvider({ children }: { children }): JSX.Element {
	const [moviesPage1, setMoviesPage1] = useState([]);
	const [moviesPage2, setMoviesPage2] = useState([]);
	const [moviesPage3, setMoviesPage3] = useState([]);
	const [moviesPage4, setMoviesPage4] = useState([]);
	const [moviesPage5, setMoviesPage5] = useState([]);
	const [filteredMovies, setFilteredMovies] = useState([]);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		getMoviesPage1().then(setMoviesPage1);
		getMoviesPage2().then(setMoviesPage2);
		getMoviesPage3().then(setMoviesPage3);
		getMoviesPage4().then(setMoviesPage4);
		getMoviesPage5().then(setMoviesPage5);
	}, []);

	const moviesWithoutDuplicats = [];

	moviesWithoutDuplicats.push(
		...moviesPage1,
		...moviesPage2,
		...moviesPage3,
		...moviesPage4,
		...moviesPage5,
	);

	const allMovies = moviesWithoutDuplicats.filter(
		(movie, index, self) => index === self.findIndex((m) => m.id === movie.id),
	);

	return (
		<SearchbarContext.Provider
			value={{
				allMovies,
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
