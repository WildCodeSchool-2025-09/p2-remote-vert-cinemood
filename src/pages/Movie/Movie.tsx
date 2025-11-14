import "./Movie.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Carousel from "../../components/Carousel/Carousel";

interface MovieData {
	title: string;
	release_date: string;
	vote_average: number;
	runtime: number;
	overview: string;
	poster_path: string;
	backdrop_path: string;
	production_countries: { name: string }[];
	production_companies: { name: string }[];
}

interface CreditData {
	crew: { job: string; name: string }[];
	cast: { name: string }[];
}

interface VideoData {
	results: { key: string; type: string; site: string }[];
}

interface ProvidersData {
	results: {
		[country: string]: {
			flatrate?: { provider_name: string; logo_path: string | null }[];
		};
	};
}

function Movie() {
	/*const Movie: React.FC = () => {*/
	const [messages, setMessages] = useState<{ pseudo: string; text: string }[]>(
		[],
	);
	const [newMessage, setNewMessage] = useState<string>("");
	const [pseudo, setPseudo] = useState<string>("");
	const { id } = useParams<{ id: string }>();
	const [movie, setMovie] = useState<MovieData | null>(null);
	const [credits, setCredits] = useState<CreditData | null>(null);
	const [videos, setVideos] = useState<VideoData | null>(null);
	const [providers, setProviders] = useState<ProvidersData | null>(null);
	const [showTrailer, setShowTrailer] = useState(false);
	const [similarMovies, setSimilarMovies] = useState([]);
	const [loadingSimilar, setLoadingSimilar] = useState(true);

	const apiKey = import.meta.env.VITE_TMDB_API_KEY;
	const apiUrl = import.meta.env.VITE_TMDB_API_URL;

	const handleTrailerClick = () => setShowTrailer((prev) => !prev);

	useEffect(() => {
		if (!id) return;

		const headers = {
			Authorization: `Bearer ${apiKey}`,
			"Content-Type": "application/json",
		};

		fetch(`${apiUrl}movie/${id}?language=fr-FR`, { headers })
			.then((res) => res.json())
			.then((data) => setMovie(data))
			.catch((err) => console.error(err));

		fetch(`${apiUrl}movie/${id}/credits?language=fr-FR`, { headers })
			.then((res) => res.json())
			.then((data) => setCredits(data))
			.catch((err) => console.error(err));

		fetch(`${apiUrl}movie/${id}/videos?language=fr-FR`, { headers })
			.then((res) => res.json())
			.then((data) => setVideos(data))
			.catch((err) => console.error(err));

		fetch(`${apiUrl}movie/${id}/watch/providers`, { headers })
			.then((res) => res.json())
			.then((data) => setProviders(data))
			.catch((err) => console.error(err));
	}, [id]);

	useEffect(() => {
		if (movie) {
			const header = document.querySelector(".header-details") as HTMLElement;
			if (header && movie.backdrop_path) {
				const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
				header.style.backgroundImage = `linear-gradient(to bottom, transparent 50%, var(--dark-purple) 100%), url(${backdropUrl})`;
			}
		}
	}, [movie]);

	useEffect(() => {
		if (!id) return;

		setLoadingSimilar(true);

		fetch(`${apiUrl}movie/${id}/similar?language=fr-FR&page=1`, {
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((res) => res.json())
			.then((movieSimilar) => {
				setSimilarMovies(movieSimilar.results?.slice(0, 8) || []);
				setLoadingSimilar(false);
			})
			.catch(() => setLoadingSimilar(false));
	}, [id]);

	if (!movie) return <p>Chargement du film...</p>;

	const posterUrl = movie.poster_path
		? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
		: "/default-poster.jpg";

	const releaseDate = movie.release_date ?? "N/A";
	const originCountry =
		movie.production_countries?.map((c) => c.name).join(", ") || "N/A";
	const productionCompanies =
		movie.production_companies?.map((c) => c.name).join(", ") || "N/A";

	const director =
		credits?.crew?.find((c) => c.job === "Director")?.name || "N/A";
	const producers =
		credits?.crew
			?.filter((c) => c.job === "Producer")
			.map((c) => c.name)
			.join(", ") || "N/A";
	const actors =
		credits?.cast
			?.slice(0, 5)
			.map((a) => a.name)
			.join(", ") || "N/A";

	const rating = movie.vote_average ?? "N/A";
	const runtime = movie.runtime ?? "N/A";

	const trailer = videos?.results?.find(
		(v) => v.type === "Trailer" && v.site === "YouTube",
	)?.key;
	const trailerUrl = trailer
		? `https://www.youtube.com/watch?v=${trailer}`
		: null;

	const PROVIDER_URLS: Record<string, string> = {
		Netflix: "https://www.netflix.com",
		"Amazon Prime Video": "https://www.primevideo.com",
		"Disney Plus": "https://www.disneyplus.com",
		"Apple TV Plus": "https://tv.apple.com",
		"Canal+": "https://www.canalplus.com",
		"Paramount Plus": "https://www.paramountplus.com",
		Crunchyroll: "https://www.crunchyroll.com",
		"Google Play Movies": "https://play.google.com/store/movies",
		"YouTube Premium": "https://www.youtube.com/premium",
		"Rakuten TV": "https://rakuten.tv",
	};

	const streamingProvidersLogos =
		providers?.results?.FR?.flatrate?.map((p) => ({
			name: p.provider_name,
			logo: `https://image.tmdb.org/t/p/w92${p.logo_path}`,
			url: PROVIDER_URLS[p.provider_name] || null,
		})) || [];

	const renderStars = (rating: number | "N/A") => {
		if (rating === "N/A") return "N/A";
		const stars = Math.round((rating / 2) * 2) / 2;
		const fullStars = Math.floor(stars);
		const halfStar = stars % 1 !== 0;
		const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
		let starIcons = "★".repeat(fullStars);
		if (halfStar) starIcons += "⯨";
		starIcons += "☆".repeat(emptyStars);
		return <span className="stars">{starIcons}</span>;
	};

	function typeNewMessage(event: React.ChangeEvent<HTMLInputElement>) {
		setNewMessage(event.target.value);
	}

	function getPseudo(event: React.ChangeEvent<HTMLInputElement>) {
		setPseudo(event.target.value);
	}
	function sendMessage() {
		setMessages([...messages, { pseudo, text: newMessage }]);
		setNewMessage("");
		setPseudo(pseudo);
		setPseudo("");
	}

	return (
		<>
			<header className="header-details">
				<img className="affiche-details" src={posterUrl} alt={movie.title} />
				<article className="info-details">
					<h1 className="h1">{movie.title}</h1>
					<p>Date de sortie : {releaseDate}</p>
					<p>Durée : {runtime} min</p>
					<p>
						Note : {rating}/10 {renderStars(rating)}
					</p>
					<button
						type="button"
						className="btn"
						id="bouton-trailer-details"
						onClick={handleTrailerClick}
					>
						Bande annonce
					</button>
				</article>
				<p className="disponibilité-details">
					Disponible sur :
					{streamingProvidersLogos.length > 0 ? (
						streamingProvidersLogos.map((p) => (
							<a
								href={p.url ?? "#"}
								key={p.name}
								target="_blank"
								rel="noopener noreferrer"
							>
								<img
									src={p.logo}
									alt={p.name}
									title={p.name}
									className="provider-logo"
								/>
							</a>
						))
					) : (
						<p>Aucune plateforme actuellement</p>
					)}
				</p>
			</header>
			<div className="fondu">
				<section className="details">
					{showTrailer && trailerUrl && (
						<article className="trailer-article">
							<iframe
								width="560"
								height="315"
								src={trailerUrl.replace("watch?v=", "embed/")}
								title="Bande annonce"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							/>
						</article>
					)}
					<article className="description-details">
						<p className="overview-details"> {movie.overview} </p>
						<article className="information-details">
							<p className="p-information-details">
								<span>Réalisé par</span> : {director}
							</p>
							<p className="p-information-details">
								<span>Produit par</span> : {producers}
							</p>
							<p className="p-information-details">
								<span>Casting</span> : {actors}
							</p>
							<p className="p-information-details">
								<span>Origine</span> : {originCountry}
							</p>
							<p className="p-information-details">
								<span>Societé de production</span> : {productionCompanies}
							</p>
						</article>
					</article>
				</section>
				<section className="films-similaire">
					<h2 className="titre-secondaire">Films similaire</h2>
					{loadingSimilar ? (
						<p>Chargement...</p>
					) : (
						<Carousel movies={similarMovies} />
					)}
				</section>
				<section className="commentaires">
					<h2 className="titre-secondaire">Commentaires</h2>
					<article className="commentaire-box">
						<label htmlFor="pseudo">Pseudo : </label>
						<input
							className="pseudo"
							type="text"
							id="pseudo"
							value={pseudo}
							onChange={getPseudo}
						/>
						<label htmlFor="comment">Commentaire : </label>
						<input
							className="comment"
							type="text"
							id="comment"
							value={newMessage}
							onChange={typeNewMessage}
						/>
						<br />
						<button
							type="button"
							className="btn"
							id="bouton-commentaire-details"
							onClick={sendMessage}
						>
							Envoyer
						</button>
						{messages.map((msg) => {
							return (
								<article
									className="text"
									id="nouveau-commentaire"
									key={msg.pseudo}
								>
									<strong>{msg.pseudo}</strong> a écrit : {msg.text}
								</article>
							);
						})}
					</article>
				</section>
			</div>
		</>
	);
}

export default Movie;
