import "./Catalog.css";
import { useEffect, useState } from "react";
import {
	getAllMovies,
	getNowPlayingMovies,
	getPopularMovies,
	getTopRatedMovies,
	getUpcomingMovies,
} from "../../api";
import CarouselMovie from "../../components/CarouselMovie/CarouselMovie";

function Catalog() {
	const [movies, setMovies] = useState([]);
	const [popularMovies, setPopularMovies] = useState([]);
	const [topRatedMovies, setTopRatedMovies] = useState([]);
	const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
	const [upcomingMovies, setUpcomingMovies] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		getAllMovies().then(setMovies);
		getPopularMovies().then(setPopularMovies);
		getTopRatedMovies().then(setTopRatedMovies);
		getNowPlayingMovies().then(setNowPlayingMovies);
		getUpcomingMovies().then(setUpcomingMovies);
	}, []);

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
		<>
			<div
				className="movie-cover"
				style={{ backgroundImage: `url(${coverUrl})` }}
			>
				<div className="cover-overly" />
			</div>
			<div className="primary-background">
				<div className="filters">
					<button type="button" className="catalog-btn">
						Genres
					</button>
					<button type="button" className="catalog-btn">
						Rating
					</button>
					<button type="button" className="catalog-btn">
						Annee
					</button>
					<form action="input" className="search-input">
						<input
							type="text"
							placeholder="Recherche..."
							className="search-text"
						/>
						<button type="button" className="search-btn">
							X
						</button>
					</form>
				</div>
				<h2 className="movie-categories">Tendances</h2>
				<CarouselMovie movies={popularMovies} />

				<h2 className="movie-categories">Les mieux notés</h2>
				<CarouselMovie movies={topRatedMovies} />

				<h2 className="movie-categories">Actuellement à l'affiche au cinéma</h2>
				<CarouselMovie movies={nowPlayingMovies} />

				<h2 className="movie-categories">A venir prochainement</h2>
				<CarouselMovie movies={upcomingMovies} />
			</div>
		</>
	);
}

export default Catalog;
