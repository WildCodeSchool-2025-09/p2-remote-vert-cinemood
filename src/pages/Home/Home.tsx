import "./Home.css";
import { Link, useNavigate } from "react-router";

function Home() {
	const navigate = useNavigate();

	function randomMovie() {
		const apiKey = import.meta.env.VITE_TMDB_API_KEY;
		const apiUrl = import.meta.env.VITE_TMDB_API_URL;
		const maxPage = 100;
		const randomPage = Math.floor(Math.random() * maxPage) + 1;
		const urlApi = `${apiUrl}discover/movie?page=${randomPage}`;
		fetch(urlApi, {
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
		.then(response => {
			return response.json();
		})
		.then(data => {
			const results = data.results;
			const randomIndex = Math.floor(Math.random() * results.length);
			const movie = results[randomIndex];
			navigate(`/film/${movie.id}`);
			});
    }

	return (
		<>
			<div className="blur">
				<header className="home-page">
					<h1 className="h1">Ta prochaine soirée ciné commence ici !</h1>
					<p>
						Réponds à notre petit quiz et reçoit des recommandations de films
						personnalisées qui correspondent à ton humeur du moment.
					</p>
					<Link to="/Quiz">
						<button className="btn">Lance le quizz</button>
					</Link>
					<button className="btn-empty" onClick={randomMovie}>Film au hasard</button>
				</header>
			</div>
			<section id="how-it-works">

			</section>
		</>
	);
}

export default Home;
