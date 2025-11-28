import "./UserProfile.css";
import CarouselMovie from "../../components/CarouselMovie/CarouselMovie";
import { useAlreadySeenMovieList } from "../../context/AlreadySeenMovieListContext";
import { useFavoriteMoviesList } from "../../context/FavoriteMovieListContext";
import { useWatchListMovies } from "../../context/WatchListMoviesContext";
import profile from "./../../assets/images/patron_incognito.png";

const { FavoriteMoviesList } = useFavoriteMoviesList();
const { AlreadySeenMovieList } = useAlreadySeenMovieList();
const { WatchListMovies } = useWatchListMovies();

function UserProfile() {
	return (
		<>
			<header>
				<h1>BONJOUR MICKAËL & SIMON</h1>
				<h2>
					met a jour ton profile afin d'optenir des résultats encore plus
					pertinents
				</h2>
			</header>
			<article className="profile">
				<article className="information-personnel">
					<p>ages : 35 ans</p>
					<p> genre : masculin</p>
					<p>pays : France</p>
					<p>pseudo : mickaël&simon</p>
					<p>mail : mickaëllambert@gmail.Com</p>
				</article>
				<img src={profile} alt="mickaël&simon" />
			</article>
			<article>
				<CarouselMovie movies={FavoriteMoviesList} />
			</article>
			<article>
				<CarouselMovie movies={AlreadySeenMovieList} />
			</article>
			<article>
				<CarouselMovie movies={WatchListMovies} />
			</article>
		</>
	);
}

export default UserProfile;
