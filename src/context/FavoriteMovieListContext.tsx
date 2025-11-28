import { type ReactNode, createContext, useContext, useState } from "react";
import type { Movie } from "../types/MovieType";

type FavoriteMoviesListState = {
	FavoriteMoviesList: Movie[];
	setFavoriteMoviesList: React.Dispatch<React.SetStateAction<Movie[]>>;
};

const FavoriteMoviesListContext = createContext<FavoriteMoviesListState>({
	FavoriteMoviesList: [],
	setFavoriteMoviesList: () => {},
});

export default function FavoriteMoviesListProvider({
	children,
}: { children: ReactNode }) {
	const [FavoriteMoviesList, setFavoriteMoviesList] = useState<Movie[]>([]);

	return (
		<FavoriteMoviesListContext.Provider
			value={{ FavoriteMoviesList, setFavoriteMoviesList }}
		>
			{children}
		</FavoriteMoviesListContext.Provider>
	);
}

export const useFavoriteMoviesList = () => {
	return useContext(FavoriteMoviesListContext);
};
