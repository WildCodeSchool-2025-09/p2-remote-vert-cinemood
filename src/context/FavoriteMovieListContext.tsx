import { type ReactNode, createContext, useContext, useState } from "react";
import type { MovieData } from "../types/MovieType";

type FavoriteMovieListState = {
	FavoriteMovieList: MovieData[];
	setFavoriteMovieList: React.Dispatch<React.SetStateAction<MovieData[]>>;
};

const FavoriteMovieListContext = createContext<FavoriteMovieListState>({
	FavoriteMovieList: [],
	setFavoriteMovieList: () => {},
});

export default function FavoriteMovieListProvider({
	children,
}: { children: ReactNode }) {
	const [FavoriteMovieList, setFavoriteMovieList] = useState<MovieData[]>([]);

	return (
		<FavoriteMovieListContext.Provider
			value={{ FavoriteMovieList, setFavoriteMovieList }}
		>
			{children}
		</FavoriteMovieListContext.Provider>
	);
}

export const useFavoriteMovieList = () => {
	return useContext(FavoriteMovieListContext);
};
