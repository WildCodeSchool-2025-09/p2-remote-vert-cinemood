import MovieCard from "../MovieCard/MovieCard";
import "./SearchModal.css";

function SearchModal({ filteredMovies }) {
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

export default SearchModal;
