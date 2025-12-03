import { useEffect, useState } from "react";
import "./Filters.css";
import "./Filters-mobile.css";
import { useSearchbar } from "../../context/SearchBarContext";

function Filters({
	genre,
	movies,
	filteredMovies,
	setFilteredMovies,
	isOpen,
	setIsOpen,
}) {
	const [open, setOpen] = useState(false);
	const [yearOpen, setYearOpen] = useState(false);
	const [combinedGenres, setCombinedGenres] = useState([]);
	const [minYear, setMinYear] = useState(1950);
	const [maxYear, setMaxYear] = useState(2025);
	const [ratingOpen, setRatingOpen] = useState(false);
	const [rating, setRating] = useState("");
	const { searchValue, setSearchValue, setSearchPropOpen } = useSearchbar();

	const selectGenre = (g) => {
		let update = [];
		if (combinedGenres.includes(g.id)) {
			update = combinedGenres.filter((id) => id !== g.id);
		} else {
			update = [...combinedGenres, g.id];
		}

		setCombinedGenres(update);
	};

	const selectYear = (min, max) => {
		setMinYear(min ? Number(min) : null);
		setMaxYear(max ? Number(max) : null);
		setIsOpen(true);
	};

	useEffect(() => {
		let results = [...movies];

		results = results.filter((movie) =>
			movie.title.toLowerCase().includes(searchValue.toLowerCase()),
		);

		if (combinedGenres.length > 0) {
			results = results.filter((movie) =>
				combinedGenres.every((id) => movie.genre_ids.includes(id)),
			);
		}

		results = results.filter((movie) => {
			const movieRating = Number(movie.vote_average);
			if (movieRating != null && rating >= movieRating) return false;
			return true;
		});

		results = results.filter((movie) => {
			const year = Number(movie.release_date.slice(0, 4));
			if (minYear != null && year < minYear) return false;
			if (maxYear != null && year > maxYear) return false;
			return true;
		});

		setFilteredMovies(results);
	}, [
		movies,
		combinedGenres,
		minYear,
		maxYear,
		rating,
		searchValue,
		setFilteredMovies,
	]);

	useEffect(() => {
		const isInputEmpty = searchValue.trim().length > 0;
		setIsOpen(isInputEmpty);
		setSearchPropOpen(isInputEmpty);
	}, [searchValue, setIsOpen, setSearchPropOpen]);

	return (
		<>
			<div className="filters">
				{!isOpen && (
					<button
						type="button"
						className="primary-button"
						onClick={() => setIsOpen(true)}
					>
						Afficher les filtres
					</button>
				)}

				{isOpen && (
					<>
						<div onMouseLeave={() => setOpen(false)}>
							<button
								type="button"
								className="dropdown-btn"
								onMouseEnter={() => setOpen(true)}
							>
								Genre
							</button>
							<div className={`dropdown-content ${open ? "show" : ""}`}>
								{genre?.genres?.map((g) => (
									<button
										className={`genre-link ${combinedGenres.includes(g.id) ? "active" : ""}`}
										type="button"
										key={g.name}
										onClick={() => {
											setIsOpen(true);
											selectGenre(g);
										}}
									>
										{g.name}
									</button>
								))}
							</div>
						</div>
						<div className="dropdown" onMouseLeave={() => setYearOpen(false)}>
							<button
								type="button"
								className="dropdown-btn"
								onMouseEnter={() => setYearOpen(true)}
							>
								Annee
							</button>
							<div className={`year-content ${yearOpen ? "show-year" : ""}`}>
								<input
									type="number"
									value={minYear}
									min={1950}
									max={2025}
									className="year-input"
									onChange={(e) => selectYear(e.target.value, maxYear)}
								/>
								<input
									type="number"
									value={maxYear}
									min={1950}
									max={2025}
									className="year-input"
									onChange={(e) => selectYear(minYear, e.target.value)}
								/>
								<button
									className="year-input"
									type="button"
									onClick={() => {
										setMinYear(1950);
										setMaxYear(2025);
									}}
								>
									Rafraîchir
								</button>
							</div>
						</div>

						<div className="dropdown" onMouseLeave={() => setRatingOpen(false)}>
							<button
								className="dropdown-btn"
								type="button"
								onMouseEnter={() => setRatingOpen(true)}
							>
								Rating
							</button>
							<div
								className={`rating-content ${ratingOpen ? "show-rating" : ""}`}
							>
								<input
									type="number"
									value={rating}
									min={1}
									max={10}
									className="rating-input"
									onChange={(e) => {
										setRating(Number(e.target.value));
										setIsOpen(true);
									}}
								/>
							</div>
						</div>
						<button
							type="button"
							className="close-btn"
							onClick={() => {
								setIsOpen(false);
								setCombinedGenres([]);
								setFilteredMovies(movies);
								setMinYear(1950);
								setMaxYear(2025);
								setRating(null);
								setSearchValue("");
							}}
						>
							<img
								src="../../../public/filterimages/close_btn_icon.png"
								alt="X"
								style={{ width: "18px" }}
							/>
						</button>
					</>
				)}
			</div>

			{isOpen && (
				<div className="selected-genres">
					{combinedGenres.map((id) => {
						const g = genre?.genres?.find((item) => item.id === id);
						if (!g) return null;

						return (
							<button
								type="button"
								className="selected-genre-btn"
								key={id}
								onClick={() => selectGenre(g)}
							>
								{g.name}
							</button>
						);
					})}
				</div>
			)}
		</>
	);
}

export default Filters;
