import { Link } from "react-router";
import "./Footer.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Footer() {
	return (
		<>
			<footer className="bas-de-page">
				<Link to="/">
					<img src="/logo-cine-mood-black.png" alt="logo" height="80px" />
				</Link>
				<p className="body-text footer">
					EXPLORER
					<ul>
						<Link to="/quiz">
							<li>Quiz</li>
						</Link>
						<li>Profil</li>
						<Link to="/catalogue">
							<li>Catalogue</li>
						</Link>
					</ul>
				</p>
				<p className="body-text footer">
					SOCIÉTÉ
					<ul>
						<li>A propos</li>
						<li>contact</li>
						<li>Actualités</li>
					</ul>
				</p>
				<p className="body-text footer">
					LÉGAL
					<ul>
						<li>Mentions légales</li>
						<li>Politique de confidentialité</li>
						<li>Conditions d'utilisation</li>
					</ul>
				</p>
				<p className="body-text footer">
					Suivez-nous
					<br />
					<span className="follow">
						<i className="bi bi-twitter-x body-text" />
						<i className="bi bi-facebook body-text" />
						<i className="bi bi-instagram body-text" />
					</span>
				</p>
			</footer>
		</>
	);
}

export default Footer;
