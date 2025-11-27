import { useState, useEffect } from "react";
import "./SearchInput.css";

function SearchInput({ setFilteredMovies, movieData, setIsOpen, isOpen }) {
	const [placeholder, setPlaceholder] = useState("Recherceh...");
	const [inputValue, setInputValue] = useState("");
	const [searchProposition, setSearchProposition] = useState([]);
	const [propOpen, setPropOpen] = useState(false);

	function refreshCatalog(movieData) {
		setFilteredMovies(movieData);
		setInputValue("");
		setPlaceholder("Recherche...");
		setSearchProposition([]);
		setPropOpen(false);
	}

	useEffect(() => {
		if (!inputValue.trim()) {
			setSearchProposition([]);
			setPropOpen(false);
			return;
		}

		const results = movieData
			.filter((movie) => {
				return movie.title.toLowerCase().includes(inputValue.toLowerCase());
			})
			.slice(0, 20);

		setSearchProposition(results);
		results.length > 0 ? setPropOpen(true) : setPropOpen(false);
	}, [inputValue, movieData]);

	return (
		<div>
			<form
				className="search-wraper"
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
			<div className={`movieprop-dropdown ${propOpen ? "show-prop" : ""}`}>
				{searchProposition.map((movie) => (
					<p
						key={movie.title}
						className="prop-text"
						onClick={(e: React.MouseEvent<HTMLParagraphElement>) => {
							setInputValue(movie.title);
							setFilteredMovies([movie]);
							setPropOpen(false);
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								setInputValue(movie.title);
								setFilteredMovies([movie]);
								setPropOpen(false);
							}
						}}
					>
						{movie.title}
					</p>
				))}
			</div>
		</div>
	);
}

export default SearchInput;
