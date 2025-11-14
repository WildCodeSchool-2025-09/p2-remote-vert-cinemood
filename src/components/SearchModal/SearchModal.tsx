import MovieCard from "../MovieCard/MovieCard";
import "./SearchModal.css";

function SearchModal({ filteredMovies }: any) {
	return (
		<div className="modal-catalog">
			{filteredMovies.map((movie: any) => (
				<MovieCard key={movie.id} movie={movie} />
			))}
		</div>
	);
}

export default SearchModal;
