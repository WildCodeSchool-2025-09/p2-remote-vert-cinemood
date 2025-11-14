import "./MovieCard.css";

function MovieCard({ movie }: any) {
	const imageUrl = movie.poster_path
		? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
		: "https://via.placeholder.com/500x750?text=No+Image";

	return (
		<div className="movie-card">
			<img src={imageUrl} alt={movie.title} className="movie-image" />
		</div>
	);
}

export default MovieCard;
