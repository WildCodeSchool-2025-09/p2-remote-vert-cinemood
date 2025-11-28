import { Link } from "react-router";
import "./Footer.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Footer() {
	return (
		<>
			<footer>
				<Link to="/">
					<img src="/logo-cine-mood-black.png" alt="logo" height="80px" />
				</Link>
				<p className="body-text footer">
					EXPLORER
					<ul>
						<Link to="/quiz" className="link">
							<li>Quiz</li>
						</Link>
						<li className="link">Profil</li>
						<Link to="/catalogue">
							<li>Catalogue</li>
						</Link>
					</ul>
				</p>
				<p className="body-text footer">
					SOCIÉTÉ
					<ul>
						<li className="link">A propos</li>
						<li className="link">Contact</li>
						<li className="link">Actualités</li>
					</ul>
				</p>
				<p className="body-text footer">
					LÉGAL
					<ul>
						<li className="link">Mentions légales</li>
						<li className="link">Politique de confidentialité</li>
						<li className="link">Conditions d'utilisation</li>
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
