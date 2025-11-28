import { type ReactNode, createContext, useContext, useState } from "react";
import type { MovieData } from "../types/MovieType";

type FavoriteMoviesListState = {
	FavoriteMoviesList: MovieData[];
	setFavoriteMoviesList: React.Dispatch<React.SetStateAction<MovieData[]>>;
};

const FavoriteMoviesListContext = createContext<FavoriteMoviesListState>({
	FavoriteMoviesList: [],
	setFavoriteMoviesList: () => {},
});

export default function FavoriteMoviesListProvider({
	children,
}: { children: ReactNode }) {
	const [FavoriteMoviesList, setFavoriteMoviesList] = useState<MovieData[]>([]);

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
