import "./Movie.css";
import "./Movie-mobile.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import logo6 from "../../assets/images/pegi/logo6.png";
import logo10 from "../../assets/images/pegi/logo10.png";
import logo12 from "../../assets/images/pegi/logo12.png";
import logo16 from "../../assets/images/pegi/logo16.png";
import logo18 from "../../assets/images/pegi/logo18.png";
import toutpublic from "../../assets/images/pegi/logopublic.png";
import CarouselMovie from "../../components/CarouselMovie/CarouselMovie";
import { useAlreadySeenMovieList } from "../../context/AlreadySeenMovieListContext";
import { useFavoriteMoviesList } from "../../context/FavoriteMovieListContext";
import { useWatchListMovies } from "../../context/WatchListMoviesContext";
import type { MovieData } from "../../types/MovieType";
import avatar from "./../../assets/images/avatar-utilisateur.jpg";
import { OrbitProgress } from "react-loading-indicators";

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

interface StarRatingProps {
	value: number;
	hover: number;
	onMouseEnter: (i: number) => void;
	onMouseLeave: () => void;
	onClick: (i: number) => void;
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
	const [note, setNote] = useState(0);
	const { AlreadySeenMovieList, setAlreadySeenMovieList } =
		useAlreadySeenMovieList();
	const [hoverNote, setHoverNote] = useState(0); // note au survol
	const apiKey = import.meta.env.VITE_TMDB_API_KEY;
	const apiUrl = import.meta.env.VITE_TMDB_API_URL;
	const { FavoriteMoviesList, setFavoriteMoviesList } = useFavoriteMoviesList();
	const { WatchListMovies, setWatchListMovies } = useWatchListMovies();
	const handleTrailerClick = () => setShowTrailer((prev) => !prev);

	useEffect(() => {
		if (!id) return;

		const headers = {
			Authorization: `Bearer ${apiKey}`,
			"Content-Type": "application/json",
		};

		fetch(
			`${apiUrl}movie/${id}?language=fr-FR&append_to_response=release_dates`,
			{ headers },
		)
			.then((res) => res.json())
			.then((movieDetails: MovieData) => {
				let certification = "";

				const frRelease = movieDetails.release_dates?.results?.find(
					(rc) => rc.iso_3166_1 === "FR",
				);

				const nonEmpty = frRelease?.release_dates?.find(
					(rd) => rd.certification?.trim() !== "",
				);

				if (nonEmpty) certification = nonEmpty.certification;

				setMovie({
					...movieDetails,
					certification,
					production_companies: movieDetails.production_companies ?? [],
					production_countries: movieDetails.production_countries ?? [],
					genres: movieDetails.genres ?? [],
					release_dates: movieDetails.release_dates ?? { results: [] },
				});
			})

			.catch((err) =>
				console.error("Erreur lors de la récupération du film :", err),
			);

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
			})
	}, [id]);

	useEffect(() => {
		if (!movie) return;

		const header = document.querySelector(".background-poster") as HTMLElement;
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

	const releaseYear = movie.release_date
		? `${movie.release_date.slice(0, 4)} · `
		: "";
	const certification = movie.certification ? `${movie.certification} · ` : "";

	const originCountry =
		movie.production_countries?.map((country) => country.name).join(", ") || "";
	const productionCompanies =
		movie.production_companies?.map((companie) => companie.name).join(", ") ||
		"";
	const director =
		credits?.crew?.find((crew) => crew.job === "Director")?.name || "";
	const producers =
		credits?.crew
			?.filter((crew) => crew.job === "Producer")
			.map((crew) => crew.name)
			.join(", ") || "";
	const actors =
		credits?.cast
			?.slice(0, 5)
			.map((actor) => actor.name)
			.join(", ") || "";

	const rating = movie.vote_average ?? "";

	const runtimeInHours = (movie) => {
		const hours = Math.floor(movie.runtime / 60);
		const mins = movie.runtime - hours * 60;
		return `${hours}h${mins}`;
	};
	const runtime = runtimeInHours(movie) ?? "";

	const trailer = videos?.results?.find(
		(video) => video.type === "Trailer" && video.site === "YouTube",
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

	const renderStars = (rating: number | "") => {
		if (rating === "") return "";
		const stars = Math.round((rating / 2) * 2) / 2;
		const fullStars = Math.floor(stars);
		const halfStar = stars % 1 !== 0;
		const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
		let starIcons = "★".repeat(fullStars);
		if (halfStar) {
			starIcons += "⯪";
		}
		starIcons += "☆".repeat(emptyStars);
		return <span className="stars">{starIcons}</span>;
	};

	const isFavorite = FavoriteMoviesList.some(
		(favorite) => favorite.id === movie.id,
	);
	const isAlreadySeen = AlreadySeenMovieList.some(
		(AlreadySeen) => AlreadySeen.id === movie.id,
	);
	const isWatchList = WatchListMovies.some(
		(WatchList) => WatchList.id === movie.id,
	);

	function sendMessage() {
		if (!newMessage.trim()) return;
		if (!pseudo.trim()) return;
		if (note === 0) return;

		setMessages([{ pseudo, text: newMessage, note }, ...messages]);
		setNote(0);
		setNewMessage("");
		setPseudo("");
	}

	function OnOffFavoriteMovies() {
		if (!movie) return;

		setFavoriteMoviesList((prev) => {
			const exists = prev.some((favorite) => favorite.id === movie.id);

			if (exists) {
				return prev.filter((favorite) => favorite.id !== movie.id);
			}
			return [...prev, movie];
		});
	}

	function OnOffWatchListMovies() {
		if (!movie) return;

		setWatchListMovies((prev) => {
			const exists = prev.some((watchlist) => watchlist.id === movie.id);

			if (exists) {
				return prev.filter((watchlist) => watchlist.id !== movie.id);
			}
			return [...prev, movie];
		});
	}

	function OnOffAlreadySeenMovies() {
		if (!movie) return;

		setAlreadySeenMovieList((prev) => {
			const exists = prev.some((AlreadySeen) => AlreadySeen.id === movie.id);

			if (exists) {
				return prev.filter((AlreadySeen) => AlreadySeen.id !== movie.id);
			}
			return [...prev, movie];
		});
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

	function starRating({
		value,
		hover,
		onMouseEnter,
		onMouseLeave,
		onClick,
	}: StarRatingProps) {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			const filled = i <= (hover || value);
			stars.push(
				<button
					key={i}
					type="button"
					className={`star-icon ${filled ? "filled" : ""}`}
					onMouseEnter={() => onMouseEnter(i)}
					onMouseLeave={onMouseLeave}
					onClick={() => onClick(i)}
				>
					★
				</button>,
			);
		}
		return <div className="star-rating">{stars}</div>;
	}

	return (
		<>
			<header className="background-poster">
				<div className="header-width-container">
					<div className="movie-poster-details-container">
						<img src={posterUrl} alt={movie.title} />
					</div>
					<article className="info-details">
						<div className="info-details-top">
							<h1 className="primary-title">{movie.title}</h1>
							<p className="sub-movie-title-text">{`Titre original : ${movie.original_title}`}</p>
							<p className="sub-movie-title-text">
								{releaseYear} {certification} {runtime}
							</p>
							<p>{renderStars(rating)}</p>

							<div className="genres-container">
								{movie.genres?.map((genre) => (
									<p className="genre-movie" key={genre.name}>
										{genre.name}
									</p>
								))}
							</div>
						</div>
						<div className="header-button-container">
							<div className="tag-list">
								<div className="icon">
									<i
										className={`bi bi-suit-heart ${isFavorite ? "heart-favorite" : ""}`}
										onClick={OnOffFavoriteMovies}
										onKeyDown={(e) => {
											if (e.key === "Enter" || e.key === " ") {
												OnOffFavoriteMovies();
											}
										}}
										role="button"
										tabIndex={0}
									/>
								</div>

								<i className="bi bi-plus-circle icon" />
								<i className="bi bi-eye icon" />
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
						</div>
						<div className="providers-container">
							{streamingProvidersLogos.length > 0 &&
								streamingProvidersLogos.map((p) => (
									<div key={p.name}>
										<a
											href={p.url ?? "#"}
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
									</div>
								))}
						</div>
					</article>
				</div>
			</header>

			<div className="primary-background">
				<div className="body-width-container">
					<section>
						{showTrailer && trailerUrl && (
							<div className="trailer">
								<iframe
									width="560"
									height="315"
									src={trailerUrl.replace("watch?v=", "embed/")}
									title="Bande annonce"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								/>
							</div>
						)}
					</section>
					<section className="description-details">
						<p className="movie-description-container body-text">
							{movie.overview ? (
								movie.overview
							) : (
								<>
									<p>Cette fiche ne contient pas encore de description.</p>
									<p>
										🎬 Mais pas de panique ! Clique ci-dessous pour lancer le
										quiz interactif et découvrir une sélection de films rien que
										pour toi.
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
						<section className="information-details">
							<p className="p-information-details body-text">
								<span className="body-text-blue bold">Réalisé par : </span>{director}
							</p>
							<p className="p-information-details body-text">
								<span className="body-text-blue bold">Produit par :</span>{" "}
								{producers}
							</p>
							<p className="p-information-details body-text">
								<span className="body-text-blue bold">Casting: </span> {actors}
							</p>
							<p className="p-information-details body-text">
								<span className="body-text-blue bold">Origine :</span>{" "}
								{originCountry}
							</p>
							<p className="p-information-details body-text">
								<span className="body-text-blue bold">Societé de production :</span>{" "}
								{productionCompanies}
							</p>
						</section>
					</section>
				</div>
				<section className="films-similaire">
					<h2 className="secondary-title title-similar-movies">
						Cela pourrait aussi t'intéresser
					</h2>
					{similarMovies && similarMovies.length > 0 ? (
						<CarouselMovie movies={similarMovies} />
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
										{(() => {
											const note = msg.note;
											if (!note || note < 1 || note > 5) return null;
											return (
												<span className="stars stars-comment">
													{"★".repeat(note) + "☆".repeat(5 - note)}
												</span>
											);
										})()}
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
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setPseudo(e.target.value)
								}
								maxLength={12}
							/>
							<p className="body-text">Note :</p>
							{starRating({
								value: note,
								hover: hoverNote,
								onMouseEnter: setHoverNote,
								onMouseLeave: () => setHoverNote(0),
								onClick: setNote,
							})}
						</div>
						<label htmlFor="comment" className="body-text">
							Commentaire :
						</label>
						<textarea
							className="comment"
							id="comment"
							value={newMessage}
							onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
								setNewMessage(e.target.value)
							}
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
