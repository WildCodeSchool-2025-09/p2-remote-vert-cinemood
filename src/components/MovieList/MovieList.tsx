import { useState, useEffect } from "react";
import { Link } from "react-router";
import "./MovieList.css";

function MovieList() {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const apiKey = import.meta.env.VITE_TMDB_API_KEY;
		const apiUrl = import.meta.env.VITE_TMDB_API_URL;
		const urlApi = `${apiUrl}movie/popular?page=1`;

		fetch(urlApi, {
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setMovies(data.results.slice(0, 5));
				setLoading(false);
			});
	}, []);

	return (
		<>
			{loading ? (
				<p>Chargement...</p>
			) : (
				<div className="movie-carousel">
					{movies.map((film, i) =>
						film ? (
							<div className="movie-card" key={film.id}>
								{film.poster_path && (
									<Link to={`/film/${film.id}`}>
										<img
											src={`https://image.tmdb.org/t/p/w200${film.poster_path}`}
											alt={film.title}
										/>
									</Link>
								)}
							</div>
						) : (
							<p key={i}>Aucun film trouvé</p>
						),
					)}
				</div>
			)}
		</>
	);
}

export default MovieList;
