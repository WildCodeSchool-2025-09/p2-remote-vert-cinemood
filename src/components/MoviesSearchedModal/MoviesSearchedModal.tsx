import MovieCard from "../MovieCard/MovieCard";
import "./MoviesSearchedModal.css";

function MoviesSearchedModal({ filteredMovies }) {
	return (
		<div className="modal-catalog primary-background">
			{filteredMovies.length > 0 ? (
				filteredMovies.map((movie) => (
					<MovieCard key={movie.id} movie={movie} />
				))
			) : (
				<h1>Empty</h1>
			)}
		</div>
	);
}

export default MoviesSearchedModal;
