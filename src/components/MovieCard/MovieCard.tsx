import "./MovieCard.css";
import "./MovieCard-mobile.css";
import { Link } from "react-router";

function MovieCard({ movie }) {
	const imageUrl = movie.poster_path
		? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
		: "https://via.placeholder.com/500x750?text=No+Image";

	return (
		<>
			<div className="movie-card-wraper">
				<div className="movie-card">
					<img src={imageUrl} alt={movie.title} className="movie-image" />

					<div className="card-content">
						<h3>{movie.title}</h3>
						<Link to={`/film/${movie.id}`} className="plus-dinfo-btn">
							Plus d'info
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}

export default MovieCard;
