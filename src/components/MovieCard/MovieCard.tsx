import "./MovieCard.css";

function MovieCard({ movie }) {
	const imageUrl = movie.backdrop_path
		? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
		: "https://via.placeholder.com/500x750?text=No+Image";

	return (
		<>
			<div className="movie-card-wraper">
				<div className="movie-card">
					<img src={imageUrl} alt={movie.title} className="movie-image" />

					<div className="card-content">
						<h3>{movie.title}</h3>
						<button type="button">Plus d'info</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default MovieCard;
