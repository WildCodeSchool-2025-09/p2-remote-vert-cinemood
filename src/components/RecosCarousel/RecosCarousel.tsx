import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./RecosCarousel.css";
import "./Recos-mobile.css";
import { Link } from "react-router";

export default function RecosCarousel({
	movieRecos,
	randomStartIndex,
}: RecosCarouselProps) {
	const settings = {
		centerMode: true,
		centerPadding: "0px",
		infinite: true,
		initialSlide: 2,
		slidesToScroll: 1,
		slidesToShow: 3,
		speed: 500,
		cssEase: "ease-in-out",
		dots: true,
		arrows: true,
		responsive: [
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					centerMode: false,
				},
			},
		],
	};

	return (
		<>
			{movieRecos && movieRecos.length > 0 ? (
				<div className="recos-slider-container">
					<Slider {...settings}>
						{movieRecos
							.slice(randomStartIndex, randomStartIndex + 6)
							.map((movie) => (
								<div className="recos-img-wrapper" key={movie.id}>
									<Link to={`/film/${movie.id}`} target="_blank">
										<img
											className="recos-movie-poster"
											src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
											alt={movie.title}
										/>
										<div className="primary-button link-movie-details">
											En savoir plus
										</div>
									</Link>
								</div>
							))}
					</Slider>
				</div>
			) : (
				<div className="recos-loading-screen">
					<img
						className="loading-icon"
						src="/logo-transparent.png"
						alt="Chargement…"
					/>
				</div>
			)}
		</>
	);
}

interface RecosCarouselProps {
	movieRecos: Movie[];
	randomStartIndex: number;
}
