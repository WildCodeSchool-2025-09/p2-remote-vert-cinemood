import "./MovieCover.css";
import { useEffect, useState } from "react";

function MovieCover({ movies }) {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		if (!movies || movies.length === 0) return;

		const interval = setInterval(() => {
			const randomIndex = Math.floor(Math.random() * movies.length);
			setCurrentIndex(randomIndex);
		}, 10000);

		return () => clearInterval(interval);
	}, [movies]);

	if (!movies || movies.length === 0) return <div>Loading...</div>;

	const coverUrl = movies[currentIndex].backdrop_path
		? `https://image.tmdb.org/t/p/original${movies[currentIndex].backdrop_path}`
		: "https://via.placeholder.com/500x750?text=No+Image";

	return (
		<div
			className="movie-cover"
			style={{ backgroundImage: `url(${coverUrl})` }}
		>
			<div className="cover-overly">
				<h1>{movies[currentIndex].title}</h1>
			</div>
		</div>
	);
}

export default MovieCover;
