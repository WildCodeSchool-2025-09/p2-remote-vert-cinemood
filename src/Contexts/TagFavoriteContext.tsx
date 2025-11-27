import { type ReactNode, createContext, useContext, useState } from "react";
import type { MovieData } from "../types/MovieType";

type TagFavoriteState = {
	TagFavorite: MovieData[];
	setTagFavorite: React.Dispatch<React.SetStateAction<MovieData[]>>;
};

const FavoritesMoviesContext = createContext<TagFavoriteState>({
	TagFavorite: [],
	setTagFavorite: () => {},
});

export default function TagFavoriteProvider({
	children,
}: { children: ReactNode }) {
	const [TagFavorite, setTagFavorite] = useState<MovieData[]>([]);

	return (
		<FavoritesMoviesContext.Provider value={{ TagFavorite, setTagFavorite }}>
			{children}
		</FavoritesMoviesContext.Provider>
	);
}

export const useFavoritesMovies = () => {
	return useContext(FavoritesMoviesContext);
};
