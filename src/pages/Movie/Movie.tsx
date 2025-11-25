import "./Movie.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import CarouselMovie from "../../components/CarouselMovie/CarouselMovie";
import StarRating from "../../components/StarRating/StarRating";
import avatar from "./../../assets/images/avatar-utilisateur.jpg";

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

interface ResizeParams {
	url: string;
	width: number;
	height: number;
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
	const [loadingSimilar, setLoadingSimilar] = useState(false);
	const [note, setNote] = useState(0);
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

		fetch(`${apiUrl}movie/${id}/recommendations?language=fr-FR&page=1`, {
			headers,
		})
			.then((res) => res.json())
			.then((movieSimilar) => {
				setSimilarMovies(movieSimilar.results?.slice(0, 8));
				setLoadingSimilar(true);
			})
			.catch(() => setLoadingSimilar(false));
	}, [id]);

	useEffect(() => {
		if (!movie) return;

		const header = document.querySelector(".header-details") as HTMLElement;
		if (!header) return;

		if (movie.backdrop_path) {
			const originalUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

			resizeImage({ url: originalUrl, width: 1040, height: 400 })
				.then((resizedUrl) => {
					header.style.backgroundImage = `url(${resizedUrl})`;
				})
				.catch(() => {
					header.style.backgroundImage = "url(/background-movie-not-found.jpg)";
				});
		} else {
			header.style.backgroundImage = "url(/background-movie-not-found.jpg)";
		}
	}, [movie]);

	if (!movie) return <p>Chargement du film...</p>;

	const posterUrl = movie.poster_path
		? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
		: "/no-poster.jpg";

	const releaseDate = movie.release_date ?? "";
	const originCountry =
		movie.production_countries?.map((c) => c.name).join(", ") || "";
	const productionCompanies =
		movie.production_companies?.map((c) => c.name).join(", ") || "";

	const director = credits?.crew?.find((c) => c.job === "Director")?.name || "";
	const producers =
		credits?.crew
			?.filter((c) => c.job === "Producer")
			.map((c) => c.name)
			.join(", ") || "";
	const actors =
		credits?.cast
			?.slice(0, 5)
			.map((a) => a.name)
			.join(", ") || "";

	const ratingfloat = movie.vote_average ?? "";
	const rating = Math.floor(ratingfloat);
	const runtime = movie.runtime ?? "";

	const trailer = videos?.results?.find(
		(v) => v.type === "Trailer" && v.site === "YouTube",
	)?.key;
	const trailerUrl = trailer
		? `https://www.youtube.com/watch?v=${trailer}`
		: null;

	const PROVIDER_URLS: Record<string, string> = {
		Netflix: "https://www.netflix.com",
		"Netflix Standard with Ads": "https://www.netflix.com",
		"Amazon Prime Video": "https://www.primevideo.com",
		"HBO Max": "https://www.primevideo.com",
		"HBO Max  Amazon Channel": "https://www.primevideo.com",
		Universcine: "https://www.primevideo.com",
		"Universcine Amazon Channel": "https://www.primevideo.com",
		"Cine+ OCS Amazon Channel ": "https://www.primevideo.com",
		"Disney Plus": "https://www.disneyplus.com",
		"Apple TV Plus": "https://tv.apple.com",
		"Canal+": "https://www.canalplus.com",
		"Paramount Plus": "https://www.paramountplus.com",
		Crunchyroll: "https://www.crunchyroll.com",
		"Google Play Movies": "https://play.google.com/store/movies",
		"YouTube Premium": "https://www.youtube.com/premium",
		"Rakuten TV": "https://rakuten.tv",
		"INA  madelen Amazon Channel": "https://www.primevideo.com",
	};

	const streamingProvidersLogos =
		providers?.results?.FR?.flatrate?.map((p) => ({
			name: p.provider_name,
			logo: `https://image.tmdb.org/t/p/w92${p.logo_path}`,
			url: PROVIDER_URLS[p.provider_name] || null,
		})) || [];

	const renderStars = (ratingfloat: number | "") => {
		if (ratingfloat === "") return "";
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

	function resizeImage({ url, width, height }: ResizeParams): Promise<string> {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.crossOrigin = "anonymous";
			img.src = url;

			img.onload = () => {
				const canvas = document.createElement("canvas");
				canvas.width = width;
				canvas.height = height;

				const ctx = canvas.getContext("2d");
				if (!ctx) return reject("Canvas unsupported");

				ctx.drawImage(img, 0, 0, width, height);

				resolve(canvas.toDataURL("image/jpeg", 0.8));
			};

			img.onerror = reject;
		});
	}

	return (
		<>
			<header className="header-details">
				<img className="affiche-details" src={posterUrl} alt={movie.title} />
				<article className="info-details">
					<h1 className="primary-title">{movie.title}</h1>
					<p className="header-text">
						<i className="bi bi-calendar-event" /> : {releaseDate}
					</p>
					<p className="header-text">
						<i className="bi bi-stopwatch" /> : {runtime} min
					</p>
					<p className="header-text">
						<i className="bi bi-star" /> : {rating}/10 {renderStars(rating)}
					</p>
					<div className="tag-list">
						<i className="bi bi-suit-heart" />
						<i className="bi bi-plus-circle" />
						<i className="bi bi-eye" />
					</div>
					{trailerUrl !== null && (
						<button
							type="button"
							className="primary-button bouton-trailer-details"
							onClick={handleTrailerClick}
						>
							Bande annonce
						</button>
					)}
				</article>

				<p className="disponibilité-details-logo body-text">
					{streamingProvidersLogos.length > 0 &&
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
						))}
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
							<article className="genres">{renderGenres(movie)}</article>
							<p className="overview-details body-text">
								{movie.overview ? (
									movie.overview
								) : (
									<>
										<p>Cette fiche ne contient pas encore de description.</p>
										<p>
											🎬 Mais pas de panique ! Clique ci-dessous pour lancer le
											quiz interactif et découvrir une sélection de films rien
											que pour toi.
										</p>
										<Link
											to="/quiz"
											className="primary-button primary-button-home"
											id="button-quiz"
										>
											Lance le quiz
										</Link>
									</>
								)}
							</p>
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
					<h2 className="secondary-title center padding-30">
						Cela pourrait aussi t'intéresser
					</h2>
					{loadingSimilar ? (
						<CarouselMovie movies={similarMovies} />
					) : (
						<p>Chargement...</p>
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
