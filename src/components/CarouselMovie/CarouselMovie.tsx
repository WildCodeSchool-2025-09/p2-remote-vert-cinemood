import useEmblaCarousel from "embla-carousel-react";
import { Link } from "react-router";
import "./CarouselMovie.css";
import "./CarouselMovie-mobile.css";
import type { Movie } from "../../types/MovieType";

type CarouselProps = {
	movies: Movie[];
};

function CarouselMovie({ movies }: CarouselProps) {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

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
							<div className="embla__slide" key={movie.id}>
								<Link to={`/film/${movie.id}`}>
									<img
										src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
										alt={movie.title}
									/>
								</Link>
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
