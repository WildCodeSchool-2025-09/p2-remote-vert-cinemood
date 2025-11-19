import "./Catalog.css";
import { useEffect, useState } from "react";
import CarouselMovie from "../../components/CarouselMovie/CarouselMovie";
import MovieCover from "../../components/MovieCover/MovieCover";
import {
	fetchMovies,
	movieGenres,
	nowPlaying,
	popular,
	topRated,
	upcoming,
} from "../../data";

function Catalog() {
	const [movies, setMovies] = useState([]);
	const [genre, setGenre] = useState([]);
	const [popularMovies, setPopularMovies] = useState([]);
	const [topRatedMovies, setTopRatedMovies] = useState([]);
	const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
	const [upcomingMovies, setUpcomingMovies] = useState([]);

	useEffect(() => {
		fetchMovies().then(setMovies);
		movieGenres().then(setGenre);
		popular().then(setPopularMovies);
		topRated().then(setTopRatedMovies);
		nowPlaying().then(setNowPlayingMovies);
		upcoming().then(setUpcomingMovies);
	}, []);

	return (
		<>
			<MovieCover movies={movies} />
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
