import { type ReactNode, createContext, useContext, useState } from "react";
import type { MovieData } from "../types/MovieType";

type AlreadySeenMoviesListState = {
	AlreadySeenMoviesList: MovieData[];
	setAlreadySeenMoviesList: React.Dispatch<React.SetStateAction<MovieData[]>>;
};

const AlreadySeenMoviesListContext = createContext<AlreadySeenMoviesListState>({
	AlreadySeenMoviesList: [],
	setAlreadySeenMoviesList: () => {},
});

export default function AlreadySeenMoviesListProvider({
	children,
}: { children: ReactNode }) {
	const [AlreadySeenMoviesList, setAlreadySeenMoviesList] = useState<
		MovieData[]
	>([]);

	return (
		<AlreadySeenMoviesListContext.Provider
			value={{ AlreadySeenMoviesList, setAlreadySeenMoviesList }}
		>
			{children}
		</AlreadySeenMoviesListContext.Provider>
	);
}

export const useAlreadySeenMoviesList = () => {
	return useContext(AlreadySeenMoviesListContext);
};
