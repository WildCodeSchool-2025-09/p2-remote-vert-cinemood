import { type ReactNode, createContext, useContext, useState } from "react";
import type { MovieData } from "../types/MovieType";

type WatchListMoviesState = {
	WatchListMovies: MovieData[];
	setWatchListMovies: React.Dispatch<React.SetStateAction<MovieData[]>>;
};

const WatchListMoviesContext = createContext<WatchListMoviesState>({
	WatchListMovies: [],
	setWatchListMovies: () => {},
});

export default function WatchListMoviesProvider({
	children,
}: { children: ReactNode }) {
	const [WatchListMovies, setWatchListMovies] = useState<MovieData[]>([]);

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
