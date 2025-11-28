import { type ReactNode, createContext, useContext, useState } from "react";
import type { Movie } from "../types/MovieType";

type AlreadySeenMovieListState = {
	AlreadySeenMovieList: Movie[];
	setAlreadySeenMovieList: React.Dispatch<React.SetStateAction<Movie[]>>;
};

const AlreadySeenMovieListContext = createContext<AlreadySeenMovieListState>({
	AlreadySeenMovieList: [],
	setAlreadySeenMovieList: () => {},
});

export default function AlreadySeenMovieListProvider({
	children,
}: { children: ReactNode }) {
	const [AlreadySeenMovieList, setAlreadySeenMovieList] = useState<Movie[]>([]);

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
