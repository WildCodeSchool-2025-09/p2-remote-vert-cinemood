import type { Movie } from "./MovieType";

export type SearchbarContextType = {
	getAllMovies: Movie[];
	searchValue: string;
	setSearchValue: (value: string) => void;
	searchPropOpen: boolean;
	setSearchPropOpen: (value: boolean) => void;
	filteredMovies: Movie[];
	setFilteredMovies: (movies: Movie[]) => void;
};
