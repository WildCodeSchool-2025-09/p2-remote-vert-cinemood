import { useEffect, useState } from "react";
import Carousel from "./RecosCarousel";
import "./Recos.css";

function Recos() {
	const quizTaken = false;

	const [moviesWithPoster, setMoviesWithPoster] = useState([]);
	const randomStartIndex = Math.floor(Math.random() * 14);

	useEffect(() => {
		const apiKey = import.meta.env.VITE_TMDB_API_KEY;
		const apiUrl = import.meta.env.VITE_TMDB_API_URL;

		const randomPage = Math.floor(Math.random() * 500) + 1;

		const url = `${apiUrl}discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=fr-FR&vote_average.gte=5&primary_release_date.gte=1960-01-01&vote_count.gte=100&page=${randomPage}`;

		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
			},
		};

		fetch(url, options)
			.then((response) => response.json())
			.then((data) => {
				const originalMovieData = data.results;
				const moviesWithPoster = originalMovieData.filter(
					(movie) => movie.poster_path !== null,
				);
				setMoviesWithPoster(moviesWithPoster);
			})
			.catch((err) => console.error(err));
	}, []);

	return (
		<>
			<div className="recos-bg">
				{quizTaken ? (
					<section className="header-section-center">
						<h1 className="secondary-title max-characters-30">
							Découvre ta sélection ciné
							<span className="body-text-blue"> personnalisée</span> !
						</h1>
						<p className="body-text">
							En fonction de ton humeur du moment, <br /> voici 6 films
							sélectionnés
							<span className="body-text-bold"> spécialement pour toi</span>
						</p>
					</section>
				) : (
					<section className="header-section-center">
						<h1 className="secondary-title ">
							Six films<span className="body-text-blue"> au hasard</span>,{" "}
							<br />
							rien que pour toi !
						</h1>
						<p className="body-text">
							Laisse-toi surprendre par notre sélection du moment. <br />
							Prêt à découvrir
							<span className="body-text-bold"> de nouvelles pépites </span>?
						</p>
					</section>
				)}
				<Carousel
					moviesWithPoster={moviesWithPoster}
					randomStartIndex={randomStartIndex}
				/>
				{quizTaken && (
					<button type="button" className="primary-button restart-quiz">
						Redémarrer le quiz
					</button>
				)}
				<div className="body-text ex-footer" />
			</div>
		</>
	);
}

export default Recos;
