import { useState } from "react";
import "./SearchInput.css";

function SearchInput({ setFilteredMovies, movieData, setIsOpen, isOpen }: any) {
	const [placeholder, setPlaceholder] = useState("Recherceh...");
	const [inputValue, setInputValue] = useState("");

	function refreshCatalog(movieData: any) {
		setFilteredMovies(movieData);
		setInputValue("");
		setPlaceholder("Recherche...");
	}

	return (
		<div className={isOpen ? "search-input" : ""}>
			<form
				onSubmit={(p) => {
					p.preventDefault();
					p.stopPropagation();
				}}
			>
				<input
					type="text"
					placeholder={placeholder}
					value={inputValue}
					onChange={(e) => {
						const value = e.target.value;
						setInputValue(value);
						setFilteredMovies(
							movieData.filter((e: any) =>
								e.title.toLowerCase().includes(value.toLowerCase()),
							),
						);
					}}
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						setFilteredMovies(movieData);
						setIsOpen(true);
					}}
				/>
				<button
					type="button"
					onClick={() => {
						refreshCatalog(movieData);
						setIsOpen(false);
					}}
				>
					X
				</button>
			</form>
		</div>
	);
}

export default SearchInput;
