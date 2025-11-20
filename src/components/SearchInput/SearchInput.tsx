import { useState } from "react";
import "./SearchInput.css";

function SearchInput({ setFilteredMovies, movieData, setIsOpen, isOpen }) {
	const [placeholder, setPlaceholder] = useState("Recherceh...");
	const [inputValue, setInputValue] = useState("");

	function refreshCatalog(movieData) {
		setFilteredMovies(movieData);
		setInputValue("");
		setPlaceholder("Recherche...");
	}

	return (
		<div>
			<form
				className="search-input"
				onSubmit={(p) => {
					p.preventDefault();
					p.stopPropagation();
				}}
			>
				<input
					className="search-text"
					type="text"
					placeholder={placeholder}
					value={inputValue}
					onChange={(e) => {
						const value = e.target.value;

						setInputValue(value);
						setFilteredMovies(
							movieData.filter((e) => {
								return e.title.toLowerCase().includes(value.toLowerCase());
							}),
						);
					}}
					onClick={(e) => {
						setFilteredMovies(movieData);
						setIsOpen(true);
					}}
				/>
				<button
					className="search-btn"
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
