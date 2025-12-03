import useEmblaCarousel from "embla-carousel-react";
import { Link } from "react-router";
import "./CarouselMovie.css";
import "./CarouselMovie-mobile.css";
import { useAlreadySeenMovieList } from "../../context/AlreadySeenMovieListContext";
import { useFavoriteMoviesList } from "../../context/FavoriteMovieListContext";
import { useWatchListMovies } from "../../context/WatchListMoviesContext";
import type { MovieData } from "../../types/MovieType";
import Tag from "../Tag/Tag";

type CarouselProps = {
	movies: MovieData[];
};

function CarouselMovie({ movies }: CarouselProps) {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
	const { AlreadySeenMovieList, setAlreadySeenMovieList } =
		useAlreadySeenMovieList();
	const { FavoriteMoviesList, setFavoriteMoviesList } = useFavoriteMoviesList();
	const { WatchListMovies, setWatchListMovies } = useWatchListMovies();

	return (
		<div className="carousel-wrapper">
			<button
				type="button"
				className="carousel-arrow left"
				onClick={() => emblaApi?.scrollPrev()}
			/>

			<div className="embla" ref={emblaRef}>
				<div className="embla__container">
					{movies
						.filter((movie) => movie.poster_path)
						.map((movie) => (
							<div className="embla__slide movie-poster" key={movie.id}>
								<div className="movie-poster-wrapper">
									<Link
										to={`/film/${movie.id}`}
										onClick={() => {
											window.scrollTo({ top: 0, left: 0 });
										}}
									>
										<img
											src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
											alt={movie.title}
										/>
									</Link>
									<div className="show-mini-details">
										<p className="title-small-carousel">{movie.title}</p>
										<div className="tag-list-carousel">
											<Tag
												className="icon-small-carousel"
												list={FavoriteMoviesList}
												setter={setFavoriteMoviesList}
												icon="bi bi-suit-heart"
												movie={movie}
											/>
											<Tag
												className="icon-small-carousel"
												list={WatchListMovies}
												setter={setWatchListMovies}
												icon="bi bi-plus-circle"
												movie={movie}
											/>
											<Tag
												className="icon-small-carousel"
												list={AlreadySeenMovieList}
												setter={setAlreadySeenMovieList}
												icon="bi bi-eye"
												movie={movie}
											/>
										</div>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>

			<button
				type="button"
				className="carousel-arrow right"
				onClick={() => emblaApi?.scrollNext()}
			/>
		</div>
	);
}

export default CarouselMovie;
