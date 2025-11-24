import { useState } from "react";
import "./genres.css";

function GenreButton({ genre, movies, setFilteredMovies, setIsOpen }) {
	const [open, setOpen] = useState(false);
	const [combainedGenres, setCombainedGenres] = useState([]);

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

	return (
		<div className="dropdown" onMouseLeave={() => setOpen(false)}>
			<button
				type="button"
				className="dropdown-btn"
				onMouseEnter={() => setOpen(true)}
			>
				Genre
			</button>
			<div id="myDropdown" className={`dropdown-content ${open ? "show" : ""}`}>
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
				<button
					className="genre-link"
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
	);
}

export default GenreButton;
