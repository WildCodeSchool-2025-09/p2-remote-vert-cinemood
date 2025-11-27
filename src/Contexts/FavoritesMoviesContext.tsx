import { type ReactNode, createContext, useContext, useState } from "react";
import type { MovieData } from "../types/MovieType";

type FavoritesMoviesState = {
	FavoritesMovies: MovieData[];
	setFavoritesMovies: React.Dispatch<React.SetStateAction<MovieData[]>>;
};

const FavoritesMoviesContext = createContext<FavoritesMoviesState>({
	FavoritesMovies: [],
	setFavoritesMovies: () => {},
});

export default function FavoritesMoviesProvider({
	children,
}: { children: ReactNode }) {
	const [FavoritesMovies, setFavoritesMovies] = useState<MovieData[]>([]);

	return (
		<FavoritesMoviesContext.Provider
			value={{ FavoritesMovies, setFavoritesMovies }}
		>
			{children}
		</FavoritesMoviesContext.Provider>
	);
}

export const useFavoritesMovies = () => {
	return useContext(FavoritesMoviesContext);
};
