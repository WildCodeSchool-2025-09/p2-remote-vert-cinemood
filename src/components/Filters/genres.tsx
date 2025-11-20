import { useState } from "react";
import "./genres.css";

function GenreButton({ genre, movies, setFilteredMovies, setIsOpen }) {
	const [open, setOpen] = useState(false);

	const selectGenre = (e) => {
		const filtered = movies.filter((movie) => movie.genre_ids.includes(e.id));
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
				{genre?.genres?.map((e) => (
					<button
						className="genre-link"
						type="button"
						key={e.name}
						onClick={() => selectGenre(e)}
					>
						{e.name}
					</button>
				))}
			</div>
		</div>
	);
}

export default GenreButton;
