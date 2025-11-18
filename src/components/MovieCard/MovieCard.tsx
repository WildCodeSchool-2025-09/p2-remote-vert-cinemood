import "./MovieCard.css";

function MovieCard({ movie }) {
	const imageUrl = movie.backdrop_path
		? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
		: "https://via.placeholder.com/500x750?text=No+Image";

	return (
		<>
			<div className="movie-card">
				<img src={imageUrl} alt={movie.title} className="movie-image" />
				<h3>{movie.title}</h3>
			</div>
		</>
	);
}

export default MovieCard;
