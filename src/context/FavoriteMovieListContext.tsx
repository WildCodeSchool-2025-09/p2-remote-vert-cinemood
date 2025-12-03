import { type ReactNode, createContext, useContext, useState } from "react";
import type { Movie } from "../types/MovieType";

type FavoriteMovieListState = {
	FavoriteMovieList: Movie[];
	setFavoriteMovieList: React.Dispatch<React.SetStateAction<Movie[]>>;
};

const FavoriteMovieListContext = createContext<FavoriteMovieListState>({
	FavoriteMovieList: [],
	setFavoriteMovieList: () => {},
});

export default function FavoriteMovieListProvider({
	children,
}: { children: ReactNode }) {
	const [FavoriteMovieList, setFavoriteMovieList] = useState<Movie[]>([]);

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
