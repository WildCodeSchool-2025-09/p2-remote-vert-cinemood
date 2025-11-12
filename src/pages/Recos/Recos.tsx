import { useEffect, useState } from "react";

function Recos() {
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
			<section style={{ backgroundColor: "#de8fe9ff" }}>
				<h1 className="h1">
					Découvre ta sélection ciné <span>personnalisée</span> !
				</h1>
				<p className="text">
					En fonction de ton humeur du moment, voici 6 films sélectionnés
					<span>spécialement pour toi</span>
				</p>

				{moviesWithPoster && moviesWithPoster.length > 0 ? (
					moviesWithPoster
						.slice(randomStartIndex, randomStartIndex + 6)
						.map((movie) => (
							<img
								style={{ width: "200px", height: "auto" }}
								key={movie.id}
								src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
								alt={movie.title}
							/>
						))
				) : (
					<p>Loading...</p>
				)}
			</section>
		</>
	);
}

export default Recos;
