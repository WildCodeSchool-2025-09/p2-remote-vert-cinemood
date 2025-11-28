import { createContext, useState } from "react";
import { getAllMovies } from "../api";

export const SearchbarContext = createContext(null);

function SearchbarProvider({ children }: { children }): JSX.Element {
	const [searchValue, setSearchValue] = useState("");

	return (
		<SearchbarContext.Provider
			value={{
				getAllMovies,
				searchValue,
				setSearchValue,
			}}
		>
			{children}
		</SearchbarContext.Provider>
	);
}

export default SearchbarProvider;
