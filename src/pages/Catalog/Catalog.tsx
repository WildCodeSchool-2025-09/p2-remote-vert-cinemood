import "./Catalog.css";
import { useEffect, useState } from "react";
import Filters from "../../components/Filters/Filters";
import MovieCard from "../../components/MovieCard/MovieCard";
import MovieCover from "../../components/MovieCover/MovieCover";
import SearchInput from "../../components/SearchInput/SearchInput";
import SearchModal from "../../components/SearchModal/SearchModal";
import { fetchMovies, movieGenres } from "../../data";

function Catalog() {
	const [movies, setMovies] = useState([]);
	const [genre, setGenre] = useState([]);
	const [filteredMovies, setFilteredMovies] = useState(movies);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		fetchMovies().then(setMovies);
		movieGenres().then(setGenre);
	}, []);

	return (
		<div className="catalog">
			<MovieCover movies={movies} />
			<section className="filter-section">
				<Filters movies={movies} genre={genre} />
			</section>
			<SearchInput
				isOpen={isOpen}
				setFilteredMovies={setFilteredMovies}
				movieData={movies}
				setIsOpen={setIsOpen}
			/>
			{isOpen ? (
				<SearchModal filteredMovies={filteredMovies} setIsOpen={setIsOpen} />
			) : (
				<>
					<article className="section-colmn">
						<h2 className="movie-categories">Drama</h2>
						<div className="catalog-row">
							{movies.map((movie) => (
								<MovieCard key={movie.id} movie={movie} genre={genre} />
							))}
						</div>
						<h2 className="movie-categories">Comedy</h2>
						<div className="catalog-row">
							{movies.map((movie) => (
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
