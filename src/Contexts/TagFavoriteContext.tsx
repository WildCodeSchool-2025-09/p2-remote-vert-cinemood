import { type ReactNode, createContext, useContext, useState } from "react";
import type { MovieData } from "../types";

type TagFavoriteState = {
	TagFavorite: MovieData[];
	setTagFavorite: React.Dispatch<React.SetStateAction<MovieData[]>>;
};

const TagFavoriteContext = createContext<TagFavoriteState>({
	TagFavorite: [],
	setTagFavorite: () => {},
});

export default function TagFavoriteProvider({
	children,
}: { children: ReactNode }) {
	const [TagFavorite, setTagFavorite] = useState<MovieData[]>([]);

	return (
		<TagFavoriteContext.Provider value={{ TagFavorite, setTagFavorite }}>
			{children}
		</TagFavoriteContext.Provider>
	);
}

export const useTagFavorite = () => {
	return useContext(TagFavoriteContext);
};
