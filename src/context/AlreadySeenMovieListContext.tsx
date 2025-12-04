import { type ReactNode, createContext, useContext, useState } from "react";
import type { MovieData } from "../types/MovieType";

type AlreadySeenMovieListState = {
	AlreadySeenMovieList: MovieData[];
	setAlreadySeenMovieList: React.Dispatch<React.SetStateAction<MovieData[]>>;
};

const AlreadySeenMovieListContext = createContext<AlreadySeenMovieListState>({
	AlreadySeenMovieList: [],
	setAlreadySeenMovieList: () => {},
});

export default function AlreadySeenMovieListProvider({
	children,
}: { children: ReactNode }) {
	const [AlreadySeenMovieList, setAlreadySeenMovieList] = useState<MovieData[]>(
		[],
	);

	return (
		<AlreadySeenMovieListContext.Provider
			value={{ AlreadySeenMovieList, setAlreadySeenMovieList }}
		>
			{children}
		</AlreadySeenMovieListContext.Provider>
	);
}

export const useAlreadySeenMovieList = () => {
	return useContext(AlreadySeenMovieListContext);
};
