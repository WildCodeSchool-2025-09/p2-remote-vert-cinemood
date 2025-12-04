import { createContext, useContext, useState } from "react";
import { getAllMovies } from "../api";
import type { Movie } from "../types/MovieType";
import type { SearchbarContextType } from "../types/SearchbarContextType";

export const SearchbarContext = createContext<SearchbarContextType | null>(
	null,
);

export function useSearchbar() {
	const context = useContext(SearchbarContext);

	if (!context) {
		throw new Error("useSearchbar is outside its provider");
	}
	return context;
}

function SearchbarProvider({ children }: { children }): JSX.Element {
	const [searchValue, setSearchValue] = useState("");
	const [searchPropOpen, setSearchPropOpen] = useState(false);
	const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

	return (
		<SearchbarContext.Provider
			value={{
				getAllMovies,
				searchValue,
				setSearchValue,
				searchPropOpen,
				setSearchPropOpen,
				filteredMovies,
				setFilteredMovies,
			}}
		>
			{children}
		</SearchbarContext.Provider>
	);
}

export default SearchbarProvider;
