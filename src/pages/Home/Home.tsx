import HowItWorks from "../../components/HowItWorks/HowItWorks";
import "./Home.css";
import { Link } from "react-router";
import Carousel from "../../components/Carousel/Carousel";
import { useEffect, useState } from "react";

function Home() {
		const [popular, setPopular] = useState([]);
		const [loadingPopular, setLoadingPopular] = useState(true);

		useEffect(() => {
			fetch(`${import.meta.env.VITE_TMDB_API_URL}movie/popular?page=1`, {
				headers: {
					Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
					"Content-Type": "application/json;charset=utf-8",
				},
			})
				.then((res) => res.json())
				.then((data) => {
					setPopular(data.results?.slice(0, 8) || []);
					setLoadingPopular(false);
				});
		}, []);

		return (
			<>
				<header className="header-section-center header-section-home">
					<h1 className="primary-title premier-titre">
						Ta prochaine soirée ciné commence ici !
					</h1>
					<p className="body-text width-30">
						Réponds à notre petit quiz et reçoit des recommandations de films
						personnalisées qui correspondent à ton humeur du moment.
					</p>
					<div className="buttons-container">
						<Link to="/quiz" className="primary-button primary-button-home">
							Lance le quiz
						</Link>
						<Link to="/recommandations" className="primary-button btn-empty">
							Film au hasard
						</Link>
					</div>
				</header>
				<div className="primary-background">
					<HowItWorks />

					<section id="selection-de-la-semaine">
						<h2 className="secondary-title padding-20">
							Notre <span className="body-text-blue">sélection</span> de la semaine
						</h2>
						{loadingPopular ? (
							<p>Chargement...</p>
						) : (
							<Carousel movies={popular} />
						)}
					</section>
				</div>
			</>
		);
}

export default Home;
