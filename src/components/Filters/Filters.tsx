import { useState, useEffect } from "react";
import "./Filters.css";

function Filters({ genre, movies, setFilteredMovies, setIsOpen }) {
	const [open, setOpen] = useState(false);
	const [yearOpen, setYearOpen] = useState(false);
	const [combainedGenres, setCombainedGenres] = useState([]);
	const [minYear, setMinYear] = useState(1950);
	const [maxYear, setMaxYear] = useState(2025);

	const selectGenre = (g) => {
		let update = [];
		if (combainedGenres.includes(g.id)) {
			update = combainedGenres.filter((id) => id !== g.id);
		} else {
			update = [...combainedGenres, g.id];
		}

		setCombainedGenres(update);
	};

	const handleYearChange = (min, max) => {
		setMinYear(min ? Number(min) : null);
		setMaxYear(max ? Number(max) : null);
	};

	useEffect(() => {
		let results = [...movies];

		if (combainedGenres.length > 0) {
			results = results.filter((movie) =>
				combainedGenres.every((id) => movie.genre_ids.includes(id)),
			);
		}

		results = results.filter((movie) => {
			const year = Number(movie.release_date.slice(0, 4));

			if (minYear != null && year < minYear) return false;
			if (maxYear != null && year > maxYear) return false;

			return true;
		});

		setFilteredMovies(results);
		setIsOpen(true);
	}, [combainedGenres, minYear, maxYear]);

	return (
		<>
			<div className="filters">
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
								className={`genre-link ${combainedGenres.includes(g.id) ? "active" : ""}`}
								type="button"
								key={g.name}
								onClick={() => selectGenre(g)}
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
							onChange={(e) => handleYearChange(e.target.value, maxYear)}
						/>
						<input
							type="number"
							value={maxYear}
							min={1950}
							max={2025}
							className="year-input"
							onChange={(e) => handleYearChange(minYear, e.target.value)}
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
				<div>
					<button
						className="dropdown-btn"
						id="refresh-button"
						type="button"
						onClick={() => {
							setCombainedGenres([]);
							setFilteredMovies(movies);
							setIsOpen(true);
							setMinYear(1950);
							setMaxYear(2025);
						}}
					>
						Refresh
					</button>
				</div>
			</div>
			<div className="selected-genres">
				{combainedGenres.map((id) => {
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
		</>
	);
}

export default Filters;
