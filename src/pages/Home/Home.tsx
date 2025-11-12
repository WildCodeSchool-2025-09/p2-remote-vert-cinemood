import HowItWorks from "../../components/HowItWorks/HowItWorks";
import MovieList from "../../components/MovieList/MovieList";
import "./Home.css";
import { Link } from "react-router";

function Home() {
	return (
		<>
			<header className="home-page">
				<h1 className="h1">Ta prochaine soirée ciné commence ici !</h1>
				<p className="header">
					Réponds à notre petit quiz et reçoit des recommandations de films
					personnalisées qui correspondent à ton humeur du moment.
				</p>
				<p className="buttons">
					<Link to="/quiz" className="btn">
						Lance le quizz
					</Link>
					<Link to="/recommandations" className="btn-empty">
						Film au hasard
					</Link>
				</p>
			</header>
			<div className="fondu">
				<HowItWorks />

				<section id="selection-de-la-semaine">
					<h2 className="h2">
						Notre <span>sélection</span> de la semaine
					</h2>
				<MovieList />
				</section>
			</div>
		</>
	);
}

export default Home;
