import { type ReactNode, createContext, useContext, useState } from "react";
import type { MovieData } from "../types/MovieType";

type TagWatchLaterState = {
	TagWatchLater: MovieData[];
	setTagWatchLater: React.Dispatch<React.SetStateAction<MovieData[]>>;
};

const TagWatchLaterContext = createContext<TagWatchLaterState>({
	TagWatchLater: [],
	setTagWatchLater: () => {},
});

export default function TagWatchLaterProvider({
	children,
}: { children: ReactNode }) {
	const [TagWatchLater, setTagWatchLater] = useState<MovieData[]>([]);

	return (
		<TagWatchLaterContext.Provider value={{ TagWatchLater, setTagWatchLater }}>
			{children}
		</TagWatchLaterContext.Provider>
	);
}

export const useTagWatchLater = () => {
	return useContext(TagWatchLaterContext);
};
