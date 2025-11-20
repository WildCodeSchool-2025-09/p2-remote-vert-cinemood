import "./Movie.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useTagWatchLater } from "../../Contexts/TagWatchLaterContext";
import CarouselMovie from "../../components/CarouselMovie/CarouselMovie";
import StarRating from "../../components/StarRating/StarRating";
import avatar from "./../../assets/images/avatar-utilisateur.jpg";

export interface MovieData {
	id: number;
	title: string;
	release_date: string;
	vote_average: number;
	runtime: number;
	overview: string;
	poster_path: string;
	backdrop_path: string;
	production_countries: { name: string }[];
	production_companies: { name: string }[];
	genres: { name: string }[];
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
	const [messages, setMessages] = useState<
		{ pseudo: string; text: string; note: number }[]
	>([]);
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
	const [note, setNote] = useState(0);
	const { setTagWatchLater } = useTagWatchLater();
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
			.then((movieDetails) => setMovie(movieDetails))
			.catch((err) => console.error(err));

		fetch(`${apiUrl}movie/${id}/credits?language=fr-FR`, { headers })
			.then((res) => res.json())
			.then((movieCredits) => setCredits(movieCredits))
			.catch((err) => console.error(err));

		fetch(`${apiUrl}movie/${id}/videos?language=fr-FR`, { headers })
			.then((res) => res.json())
			.then((movieTrailer) => setVideos(movieTrailer))
			.catch((err) => console.error(err));

		fetch(`${apiUrl}movie/${id}/watch/providers`, { headers })
			.then((res) => res.json())
			.then((movieProviders) => setProviders(movieProviders))
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
		: "../../assets/images/no-poster.jpg";

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

	const ratingfloat = movie.vote_average ?? "N/A";
	const rating = Math.floor(ratingfloat);
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

	const renderStars = (ratingfloat: number | "N/A") => {
		if (ratingfloat === "N/A") return "N/A";
		const stars = Math.round((rating / 2) * 2) / 2;
		const fullStars = Math.floor(stars);
		const halfStar = stars % 1 !== 0;
		const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
		let starIcons = "★".repeat(fullStars);
		if (halfStar) starIcons += "⯨";
		starIcons += "☆".repeat(emptyStars);
		return <span className="stars">{starIcons}</span>;
	};

	const renderGenres = (movie: MovieData) => {
		return (
			<>
				{movie.genres.map((g) => (
					<p className="genre-movie" key={g.name}>
						{g.name}
					</p>
				))}
			</>
		);
	};

	function renderCommentStars(note?: number) {
		if (!note || note < 1 || note > 5) return null;

		return (
			<span className="stars stars-comment">
				{"★".repeat(note) + "☆".repeat(5 - note)}
			</span>
		);
	}

	function typeNewMessage(event: React.ChangeEvent<HTMLTextAreaElement>) {
		setNewMessage(event.target.value);
	}

	function getPseudo(event: React.ChangeEvent<HTMLInputElement>) {
		setPseudo(event.target.value);
	}
	function sendMessage() {
		if (!newMessage.trim()) return;
		if (!pseudo.trim()) return;
		if (note === 0) return;

		setMessages([{ pseudo, text: newMessage, note }, ...messages]);
		setNote(0);
		setNewMessage("");
		setPseudo("");
	}

	function OnOffTagWatchLater() {
		if (!movie) return;

		setTagWatchLater((prev) => {
			const exists = prev.some((fav) => fav.id === movie.id);

			if (exists) {
				return prev.filter((fav) => fav.id !== movie.id);
			}
			return [...prev, movie];
		});
	}

	return (
		<>
			<header className="header-details">
				<img className="affiche-details" src={posterUrl} alt={movie.title} />
				<article className="info-details">
					<h1 className="primary-title">{movie.title}</h1>
					<p className="body-text">
						<i className="bi bi-calendar-event body-text" /> : {releaseDate}
					</p>
					<p className="body-text">
						<i className="bi bi-stopwatch body-text" /> : {runtime} min
					</p>
					<p className="body-text">
						<i className="bi bi-star body-text" /> : {rating}/10{" "}
						{renderStars(rating)}
					</p>
					<div className="tag-list">
						<i className="bi bi-suit-heart body-text" />
						<i
							className="bi bi-plus-circle body-text"
							onClick={OnOffTagWatchLater}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									OnOffTagWatchLater();
								}
							}}
							role="button"
							tabIndex={0}
							style={{ cursor: "pointer" }}
						/>

						<i className="bi bi-plus-circle body-text" />
						<i className="bi bi-eye body-text" />
					</div>
					<button
						type="button"
						className="primary-button bouton-trailer-details"
						id="bouton-trailer-details"
						onClick={handleTrailerClick}
					>
						Bande annonce
					</button>
				</article>
				<p className="disponibilité-details body-text">
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
			<div className="primary-background">
				<section>
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
						<article>
							<p className="overview-details body-text"> {movie.overview} </p>
							<article className="genres">{renderGenres(movie)}</article>
						</article>
						<article className="information-details">
							<p className="p-information-details body-text">
								<span className="body-text-blue">Réalisé par</span> : {director}
							</p>
							<p className="p-information-details body-text">
								<span className="body-text-blue">Produit par</span> :{" "}
								{producers}
							</p>
							<p className="p-information-details body-text">
								<span className="body-text-blue">Casting</span> : {actors}
							</p>
							<p className="p-information-details body-text">
								<span className="body-text-blue">Origine</span> :{" "}
								{originCountry}
							</p>
							<p className="p-information-details body-text">
								<span className="body-text-blue">Societé de production</span> :{" "}
								{productionCompanies}
							</p>
						</article>
					</article>
				</section>
				<section className="films-similaire">
					<h2 className="secondary-title center padding-30">Films similaire</h2>
					{loadingSimilar ? (
						<p>Chargement...</p>
					) : (
						<CarouselMovie movies={similarMovies} />
					)}
				</section>
				<section className="commentaires">
					<h2 className="secondary-title">Commentaires</h2>
					<div className="tous-les-commentaires">
						<article>
							{messages.map((msg) => {
								return (
									<div
										className="body-text"
										id="last-commentaire"
										key={msg.pseudo}
									>
										<img src={avatar} alt="avatar" width="50px" height="50px" />
										<strong className="pseudo">{msg.pseudo}</strong>
										{renderCommentStars(msg.note)}
										<article className="contenue-commentaire">
											{msg.text}
										</article>
									</div>
								);
							})}
						</article>
					</div>
					<article className="commentaire-box">
						<div className="pseudo-note">
							<label htmlFor="pseudo" className="body-text">
								Pseudo :
							</label>
							<input
								className="pseudo"
								type="text"
								id="pseudo"
								value={pseudo}
								onChange={getPseudo}
								maxLength={12}
							/>
							<p className="body-text">Note :</p>
							<StarRating maxStars={5} onRatingChange={setNote} value={note} />
						</div>
						<label htmlFor="comment" className="body-text">
							Commentaire :
						</label>
						<textarea
							className="comment"
							id="comment"
							value={newMessage}
							onChange={typeNewMessage}
							rows={5}
							maxLength={1000}
						/>
						<br />
						<button
							type="button"
							className="primary-button"
							id="bouton-commentaire-details"
							onClick={sendMessage}
						>
							Envoyer
						</button>
					</article>
				</section>
			</div>
		</>
	);
}

export default Movie;
