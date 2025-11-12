import HowItWorks from "../../components/HowItWorks/HowItWorks";
import "./Home.css";
import { Link } from "react-router";

function Home() {
	// const navigate = useNavigate();

	// function randomMovie() {
	// 	const apiKey = import.meta.env.VITE_TMDB_API_KEY;
	// 	const apiUrl = import.meta.env.VITE_TMDB_API_URL;
	// 	const maxPage = 100;
	// 	const randomPage = Math.floor(Math.random() * maxPage) + 1;
	// 	const urlApi = `${apiUrl}discover/movie?page=${randomPage}`;
	// 	fetch(urlApi, {
	// 		headers: {
	// 			Authorization: `Bearer ${apiKey}`,
	// 			"Content-Type": "application/json;charset=utf-8",
	// 		},
	// 	})
	// 		.then((response) => {
	// 			return response.json();
	// 		})
	// 		.then((data) => {
	// 			const results = data.results;
	// 			const randomIndex = Math.floor(Math.random() * results.length);
	// 			const movie = results[randomIndex];
	// 			navigate(`/film/${movie.id}`);
	// 		});
	// }

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
			<HowItWorks />
		</>
	);
}

export default Home;
