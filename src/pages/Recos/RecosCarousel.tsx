import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./RecosCarousel.css";
import { Link } from "react-router";

export default function RecosCarousel({ moviesWithPoster, randomStartIndex }) {
	const settings = {
		centerMode: true,
		centerPadding: "0px",
		infinite: true,
		initialSlide: 2,
		slidesToScroll: 1,
		slidesToShow: 3,
		speed: 500,
		dots: true,
		arrows: true,
	};

	return (
		<>
			{moviesWithPoster && moviesWithPoster.length > 0 ? (
				<div className="recos-slider-container">
					<Slider {...settings}>
						{moviesWithPoster
							.slice(randomStartIndex, randomStartIndex + 6)
							.map((movie) => (
								<div className="recos-img-wrapper" key={movie.id}>
									<Link to={`/film/${movie.id}`}>
										<img
											className="recos-movie-poster"
											src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
											alt={movie.title}
										/>
										<div className="primary-button popUp">En savoir plus</div>
									</Link>
								</div>
							))}
					</Slider>
				</div>
			) : (
				<div className="loading-screen">
					<p className="body-text">Loading...</p>
				</div>
			)}
		</>
	);
}
