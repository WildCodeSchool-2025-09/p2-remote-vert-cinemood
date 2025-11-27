import { type ReactNode, createContext, useContext, useState } from "react";
import type { MovieData } from "../types/MovieType";

type FavoriteMoviesState = {
	FavoriteMovies: MovieData[];
	setFavoriteMovies: React.Dispatch<React.SetStateAction<MovieData[]>>;
};

const FavoriteMoviesContext = createContext<FavoriteMoviesState>({
	FavoriteMovies: [],
	setFavoriteMovies: () => {},
});

export default function FavoriteMoviesProvider({
	children,
}: { children: ReactNode }) {
	const [FavoriteMovies, setFavoriteMovies] = useState<MovieData[]>([]);

	return (
		<FavoriteMoviesContext.Provider
			value={{ FavoriteMovies, setFavoriteMovies }}
		>
			{children}
		</FavoriteMoviesContext.Provider>
	);
}

export const useFavoriteMovies = () => {
	return useContext(FavoriteMoviesContext);
};
