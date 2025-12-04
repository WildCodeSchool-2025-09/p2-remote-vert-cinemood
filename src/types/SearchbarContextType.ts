import type { movieData } from "./MovieType";

export type SearchbarContextType = {
	getAllMovies: movieData[];
	searchValue: string;
	setSearchValue: (value: string) => void;
	searchPropOpen: boolean;
	setSearchPropOpen: (value: boolean) => void;
	filteredMovies: movieData[];
	setFilteredMovies: (movies: movieData[]) => void;
};
