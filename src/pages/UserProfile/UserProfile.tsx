import "./UserProfile.css";
import { useTagFavorite } from "../../Contexts/TagFavoriteContext";
import profile from "./../../assets/images/patron_incognito.png";

const { TagFavorite } = useTagFavorite();

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
		</>
	);
}

export default UserProfile;
