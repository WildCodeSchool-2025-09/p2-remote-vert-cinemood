import MovieCard from "../MovieCard/MovieCard";
import "./SearchModal.css";

function SearchModal({ filteredMovies }) {
	return (
		<div className="modal-catalog">
			{filteredMovies.map((movie) => (
				<MovieCard key={movie.id} movie={movie} />
			))}
		</div>
	);
}

export default SearchModal;
