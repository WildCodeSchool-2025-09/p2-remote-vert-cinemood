import { type ReactNode, createContext, useContext, useState } from "react";
import type { MovieData } from "../types/MovieType";

type WatchListMovietate = {
	WatchListMovie: MovieData[];
	setWatchListMovie: React.Dispatch<React.SetStateAction<MovieData[]>>;
};

const WatchListMovieContext = createContext<WatchListMovietate>({
	WatchListMovie: [],
	setWatchListMovie: () => {},
});

export default function WatchListMovieProvider({
	children,
}: { children: ReactNode }) {
	const [WatchListMovie, setWatchListMovie] = useState<MovieData[]>([]);

	return (
		<WatchListMovieContext.Provider
			value={{ WatchListMovie, setWatchListMovie }}
		>
			{children}
		</WatchListMovieContext.Provider>
	);
}

export const useWatchListMovie = () => {
	return useContext(WatchListMovieContext);
};
