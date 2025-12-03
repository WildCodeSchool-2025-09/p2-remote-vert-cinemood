import "./UserProfile.css";
import CarouselMovie from "../../components/CarouselMovie/CarouselMovie";
import { useAlreadySeenMovieList } from "../../context/AlreadySeenMovieListContext";
import { useFavoriteMovieList } from "../../context/FavoriteMovieListContext";
import { useWatchListMovie } from "../../context/WatchListMovieContext";
import profile from "./../../assets/images/patron_incognito.png";

function UserProfile() {
	const { FavoriteMovieList } = useFavoriteMovieList();
	const { AlreadySeenMovieList } = useAlreadySeenMovieList();
	const { WatchListMovie } = useWatchListMovie();
	return (
		<>
			<section className="pages-profile">
				<header className="header-profile">
					<h1 className="h1-profile">BONJOUR MICKAËL & SIMON</h1>
					<h2 className="h2-profile">
						met a jour ton profile afin d'optenir des résultats encore plus
						pertinents
					</h2>
				</header>
				<article className="profile">
					<article className="information-personnel">
						<h2 className="h2-profile">MES INFORMATION PERSONNEL</h2>
						<p className="texte-profile">ages : 35 ans</p>
						<p className="texte-profile"> genre : masculin</p>
						<p className="texte-profile">pays : France</p>
						<p className="texte-profile">pseudo : mickaël&simon</p>
						<p className="texte-profile">mail : mickaëllambert@gmail.Com</p>
					</article>
					<img className="images-profile" src={profile} alt="mickaël&simon" />
				</article>
				<section className="mon-historique">
					<h2 className="h2-profile">MON HISTORIQUE</h2>
					<article className="mes-favoris">
						<h2 className="h2-profile">MES FAVORIS</h2>
						<CarouselMovie movies={FavoriteMovieList} />
					</article>
					<article className="deja-vue">
						<h2 className="h2-profile">FILM DÉjÀ VUE</h2>
						<CarouselMovie movies={AlreadySeenMovieList} />
					</article>
					<article className="a-voir">
						<h2 className="h2-profile">FILM À VOIR</h2>
						<CarouselMovie movies={WatchListMovie} />
					</article>
				</section>
			</section>
		</>
	);
}

export default UserProfile;
