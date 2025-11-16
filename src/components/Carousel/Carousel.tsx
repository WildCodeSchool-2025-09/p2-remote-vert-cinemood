import { useState, useEffect } from "react";
import { Link } from "react-router";
import useEmblaCarousel from "embla-carousel-react";
import "./Carousel.css";

type movies = {
	id: number;
	poster_path: string;
	title: string;
};

type CarouselProps = {
	movies: movies[];
};

function Carousel({ movies }: CarouselProps) {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
	const [selectedIndex, setSelectedIndex] = useState(0);

	useEffect(() => {
		if (!emblaApi) return;
		const onSelect = () => {
			setSelectedIndex(emblaApi.selectedScrollSnap());
		};
		emblaApi.on("select", onSelect);
		onSelect();
		return () => emblaApi.off("select", onSelect);
	}, [emblaApi, movies.length]);

	const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
	const scrollNext = () => emblaApi && emblaApi.scrollNext();

	if (!movies?.length) return <p>Aucun film à afficher</p>;

	return (
		<div className="carousel-wrapper">
			<button
				type="button"
				className="carousel-arrow left"
				onClick={scrollPrev}
			>
			</button>
			<div className="embla" ref={emblaRef}>
				<div className="embla__container">
					{movies
						.filter((movie) => movie.poster_path)
						.map((movie) => (
							<div className="embla__slide" key={movie.id}>
								<Link to={`/film/${movie.id}`}>
									<img
										src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
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
				onClick={scrollNext}
			>
			</button>
			<div className="embla__dots">
				{movies
					.filter((movie) => movie.poster_path)
					.map((_, index) => (
						<button
							type="button"
							key={index}
							className={index === selectedIndex ? "dot active" : "dot"}
							onClick={() => emblaApi && emblaApi.scrollTo(index)}
						/>
					))}
			</div>
		</div>
	);
}

export default Carousel;
