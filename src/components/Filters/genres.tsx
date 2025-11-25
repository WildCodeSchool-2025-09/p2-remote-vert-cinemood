import { useState } from "react";
import "./genres.css";

function GenreButton({ genre, movies, setFilteredMovies, setIsOpen }) {
	const [open, setOpen] = useState(false);
	const [yearOpen, setYearOpen] = useState(false);
	const [combainedGenres, setCombainedGenres] = useState([]);
	const [minYear, setMinYear] = useState(null);
	const [maxYear, setMaxYear] = useState(null);

	const selectGenre = (g) => {
		let update = [];
		if (combainedGenres.includes(g.id)) {
			update = combainedGenres.filter((id) => id !== g.id);
		} else {
			update = [...combainedGenres, g.id];
		}

		setCombainedGenres(update);

		const filtered =
			update.length === 0
				? movies
				: movies.filter((movie) =>
						update.every((id) => movie.genre_ids.includes(id)),
					);

		setFilteredMovies(filtered);
		setIsOpen(true);
	};

	const handleYearChange = (min, max) => {
		setMinYear(min);
		setMaxYear(max);
		setIsOpen(true);

		const filtered = movies.filter((movie) => {
			const year = Number(movie.release_date.slice(0, 4));

			if (min < year) return false;
			if (year > max) return false;

			return true;
		});

		setFilteredMovies(filtered);
	};

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
							placeholder="Min"
							min={1950}
							max={2025}
							className="year-input"
							onChange={(e) => handleYearChange(e.target.value, maxYear)}
						/>
						<input
							type="number"
							placeholder="Max"
							min={1950}
							max={2025}
							className="year-input"
							onChange={(e) => handleYearChange(minYear, e.target.value)}
						/>
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

export default GenreButton;
