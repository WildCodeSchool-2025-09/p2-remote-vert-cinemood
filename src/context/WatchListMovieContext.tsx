import { type ReactNode, createContext, useContext, useState } from "react";
import type { Movie } from "../types/MovieType";

type WatchListMovietate = {
	WatchListMovie: Movie[];
	setWatchListMovie: React.Dispatch<React.SetStateAction<Movie[]>>;
};

const WatchListMovieContext = createContext<WatchListMovietate>({
	WatchListMovie: [],
	setWatchListMovie: () => {},
});

export default function WatchListMovieProvider({
	children,
}: { children: ReactNode }) {
	const [WatchListMovie, setWatchListMovie] = useState<Movie[]>([]);

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
