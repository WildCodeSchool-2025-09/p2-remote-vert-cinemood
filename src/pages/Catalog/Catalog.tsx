import "./Catalog.css";
import { useEffect, useState } from "react";
import CarouselMovie from "../../components/CarouselMovie/CarouselMovie";
import MovieCover from "../../components/MovieCover/MovieCover";
import SearchModal from "../../components/SearchModal/SearchModal";
import {
	movieGenres,
	nowPlaying,
	popular,
	topRated,
	upcoming,
} from "../../data";
import { useContext } from "react";
import { SearchbarContext } from "../../components/Context/SearchBarContexts";
import GenreButton from "../../components/Filters/genres";

function Catalog() {
	const [genre, setGenre] = useState([]);
	const [popularMovies, setPopularMovies] = useState([]);
	const [topRatedMovies, setTopRatedMovies] = useState([]);
	const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
	const [upcomingMovies, setUpcomingMovies] = useState([]);
	const {
		movies,
		setMovies,
		filteredMovies,
		setFilteredMovies,
		isOpen,
		setIsOpen,
	} = useContext(SearchbarContext);

	console.log(isOpen);
	console.log(filteredMovies);

	useEffect(() => {
		movieGenres().then(setGenre);
		popular().then(setPopularMovies);
		topRated().then(setTopRatedMovies);
		nowPlaying().then(setNowPlayingMovies);
		upcoming().then(setUpcomingMovies);
	}, []);

	return (
		<>
			{isOpen ? (
				<SearchModal filteredMovies={filteredMovies} />
			) : (
				<>
					<MovieCover movies={movies} />

					<div className="primary-background">
						<div className="filters">
							<GenreButton
								genre={genre}
								movies={movies}
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
