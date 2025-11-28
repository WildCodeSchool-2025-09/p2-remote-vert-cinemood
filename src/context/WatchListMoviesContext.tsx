import { type ReactNode, createContext, useContext, useState } from "react";
import type { Movie } from "../types/MovieType";

type WatchListMoviesState = {
	WatchListMovies: Movie[];
	setWatchListMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
};

const WatchListMoviesContext = createContext<WatchListMoviesState>({
	WatchListMovies: [],
	setWatchListMovies: () => {},
});

export default function WatchListMoviesProvider({
	children,
}: { children: ReactNode }) {
	const [WatchListMovies, setWatchListMovies] = useState<Movie[]>([]);

	return (
		<WatchListMoviesContext.Provider
			value={{ WatchListMovies, setWatchListMovies }}
		>
			{children}
		</WatchListMoviesContext.Provider>
	);
}

export const useWatchListMovies = () => {
	return useContext(WatchListMoviesContext);
};
