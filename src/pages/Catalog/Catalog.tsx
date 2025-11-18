import "./Catalog.css";
import { useEffect, useState } from "react";
import Filters from "../../components/Filters/Filters";
import MovieCard from "../../components/MovieCard/MovieCard";
import MovieCover from "../../components/MovieCover/MovieCover";
import SearchInput from "../../components/SearchInput/SearchInput";
import SearchModal from "../../components/SearchModal/SearchModal";
import { fetchMovies, movieGenres, popular, topRated } from "../../data";

function Catalog() {
	const [movies, setMovies] = useState([]);
	const [genre, setGenre] = useState([]);
	const [popularMovies, setPopularMovies] = useState([]);
	const [topRatedMovies, setTopRatedMovies] = useState([]);
	const [filteredMovies, setFilteredMovies] = useState(movies);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		fetchMovies().then(setMovies);
		movieGenres().then(setGenre);
		popular().then(setPopularMovies);
		topRated().then(setTopRatedMovies);
	}, []);

	return (
		<div className="primary-background catalog body-text">
			<MovieCover movies={movies} isOpen={isOpen} />
			<SearchInput
				isOpen={isOpen}
				setFilteredMovies={setFilteredMovies}
				movieData={movies}
				setIsOpen={setIsOpen}
			/>
			<section className="filter-section">
				<Filters movies={movies} genre={genre} />
			</section>
			{isOpen ? (
				<SearchModal filteredMovies={filteredMovies} setIsOpen={setIsOpen} />
			) : (
				<>
					<article className="section-colmn">
						<h2 className="movie-categories">Trending</h2>
						<div className="catalog-row">
							{popularMovies.map((movie) => (
								<MovieCard key={movie.id} movie={movie} />
							))}
						</div>
						<h2 className="movie-categories">Top Rated</h2>
						<div className="catalog-row">
							{topRatedMovies.map((movie) => (
								<MovieCard key={movie.id} movie={movie} />
							))}
						</div>
					</article>
				</>
			)}
		</div>
	);
}

export default Catalog;
