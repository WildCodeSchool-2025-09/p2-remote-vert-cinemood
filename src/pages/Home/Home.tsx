import "./Home.css";
import "./Home-mobile.css";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import CarouselMovie from "../../components/CarouselMovie/CarouselMovie";
import { OrbitProgress } from "react-loading-indicators";

function Home() {
	const [popularMovies, setPopularMovies] = useState([]);

	useEffect(() => {
		fetch(`${import.meta.env.VITE_TMDB_API_URL}movie/popular?page=1`, {
			headers: {
				Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((res) => res.json())
			.then((popularMovies) => {
				setPopularMovies(popularMovies.results);
			});
	}, []);

	return (
		<>
			<header className="header-section-center header-section-home">
				<h1 className="primary-title width-title-section">
					Ta prochaine soirée ciné commence ici !
				</h1>
				<p className="body-text width-title-section">
					Réponds à notre petit quiz et reçoit des recommandations de films
					personnalisées qui correspondent à ton humeur du moment.
				</p>
				<div className="buttons-container">
					<Link to="/quiz" className="primary-button">
						En savoir plus
					</Link>
					<Link to="/recommandations" className="primary-button btn-empty">
						Film au hasard
					</Link>
				</div>
			</header>

			<div className="primary-background">
				<section id="selection-de-la-semaine">
					<h2 className="secondary-title home-secondary-title">
						Notre <span className="body-text-blue">sélection</span> de la
						semaine
					</h2>
					{popularMovies && popularMovies.length > 0 ? (
						<CarouselMovie movies={popularMovies} />
					) : (
						<div className="loading-movies">
							<OrbitProgress
								variant="track-disc"
								color="#05a6d6"
								dense
								size="medium"
							/>
						</div>
					)}
				</section>
			</div>
		</>
	);
}

export default Home;
