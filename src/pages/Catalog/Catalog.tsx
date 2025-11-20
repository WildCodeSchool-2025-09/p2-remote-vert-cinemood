import "./Catalog.css";
import { useEffect, useState } from "react";
import { useContext } from "react";
import {
	getGenresMovies,
	getNowPlayingMovies,
	getPopularMovies,
	getTopRatedMovies,
	getUpcomingMovies,
} from "../../api";
import CarouselMovie from "../../components/CarouselMovie/CarouselMovie";
import { SearchbarContext } from "../../components/Context/SearchBarContexts";
import GenreButton from "../../components/Filters/genres";
import MoviesSearchedModal from "../../components/MoviesSearchedModal/MoviesSearchedModal";

function Catalog() {
	const [genre, setGenre] = useState([]);
	const [popularMovies, setPopularMovies] = useState([]);
	const [topRatedMovies, setTopRatedMovies] = useState([]);
	const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
	const [upcomingMovies, setUpcomingMovies] = useState([]);
	const { allMovies, filteredMovies, setFilteredMovies, isOpen, setIsOpen } =
		useContext(SearchbarContext);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		getGenresMovies().then(setGenre);
		getPopularMovies().then(setPopularMovies);
		getTopRatedMovies().then(setTopRatedMovies);
		getNowPlayingMovies().then(setNowPlayingMovies);
		getUpcomingMovies().then(setUpcomingMovies);
	}, []);

	useEffect(() => {
		if (!allMovies || allMovies.length === 0) return;

		const interval = setInterval(() => {
			const randomIndex = Math.floor(Math.random() * allMovies.length);
			setCurrentIndex(randomIndex);
		}, 10000);

		return () => clearInterval(interval);
	}, [allMovies]);

	if (!allMovies || allMovies.length === 0) return <div>Loading...</div>;

	const coverUrl = allMovies[currentIndex].backdrop_path
		? `https://image.tmdb.org/t/p/original${allMovies[currentIndex].backdrop_path}`
		: "https://via.placeholder.com/500x750?text=No+Image";

	return (
		<>
			{isOpen ? (
				<MoviesSearchedModal filteredMovies={filteredMovies} />
			) : (
				<>
					<div
						className="movie-cover"
						style={{ backgroundImage: `url(${coverUrl})` }}
					>
						<div className="cover-overly" />
					</div>

					<div className="primary-background">
						<div className="filters">
							<GenreButton
								genre={genre}
								movies={allMovies}
								setFilteredMovies={setFilteredMovies}
								setIsOpen={setIsOpen}
							/>
							<button type="button" className="catalog-btn">
								Rating
							</button>
							<button type="button" className="catalog-btn">
								Annee
							</button>
						</div>

						<h2 className="movie-categories">Tendances</h2>
						<CarouselMovie movies={popularMovies} />

						<h2 className="movie-categories">Les mieux notés</h2>
						<CarouselMovie movies={topRatedMovies} />

						<h2 className="movie-categories">
							Actuellement à l'affiche au cinéma
						</h2>
						<CarouselMovie movies={nowPlayingMovies} />

						<h2 className="movie-categories">A venir prochainement</h2>
						<CarouselMovie movies={upcomingMovies} />
					</div>
				</>
			)}
		</>
	);
}

export default Catalog;
