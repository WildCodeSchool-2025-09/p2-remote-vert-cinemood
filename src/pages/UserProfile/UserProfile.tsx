import "./UserProfile.css";
import CarouselMovie from "../../components/CarouselMovie/CarouselMovie";
import { useAlreadySeenMovieList } from "../../context/AlreadySeenMovieListContext";
import { useFavoriteMovieList } from "../../context/FavoriteMovieListContext";
import { useWatchListMovie } from "../../context/WatchListMovieContext";

function UserProfile() {
	const { FavoriteMovieList } = useFavoriteMovieList();
	const { AlreadySeenMovieList } = useAlreadySeenMovieList();
	const { WatchListMovie } = useWatchListMovie();
	return (
		<>
			<section className="mon-historique">
				<h1 className="primary-title">MON HISTORIQUE</h1>
				<article className="mes-favoris">
					<h2 className="secondary-title">MES FAVORIS</h2>
					{FavoriteMovieList.length > 0 ? (
						<CarouselMovie movies={FavoriteMovieList} />
					) : (
						<p className="body-text empty-list">
							Tu n’as encore marqué aucun film comme film favoris.
						</p>
					)}
				</article>
				<article className="deja-vue">
					<h2 className="secondary-title">FILM DÉjÀ VUE</h2>
					{AlreadySeenMovieList.length > 0 ? (
						<CarouselMovie movies={AlreadySeenMovieList} />
					) : (
						<p className="body-text empty-list">
							Tu n’as encore marqué aucun film comme déjà vu.
						</p>
					)}
				</article>
				<article className="a-voir">
					<h2 className="secondary-title">FILM À VOIR</h2>
					{WatchListMovie.length > 0 ? (
						<CarouselMovie movies={WatchListMovie} />
					) : (
						<p className="body-text empty-list">
							Tu n’as encore marqué aucun film comme film a voir
						</p>
					)}
				</article>
			</section>
		</>
	);
}

export default UserProfile;
