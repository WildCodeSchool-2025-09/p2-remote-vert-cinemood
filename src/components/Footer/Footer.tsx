import { Link } from "react-router";
import "./Footer.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Footer() {
	return (
		<>
			<footer>
				<Link
					to="/"
					onClick={() => {
						window.scrollTo({ top: 0, left: 0 });
					}}
				>
					<img src="/logo-cine-mood-black.png" alt="logo" height="80px" />
				</Link>
				<p className="body-text footer">
					EXPLORER
					<ul>
						<Link
							to="/quiz"
							className="link"
							onClick={() => {
								window.scrollTo({ top: 0, left: 0 });
							}}
						>
							<li>Quiz</li>
						</Link>
						<Link
							to="/profil"
							onClick={() => {
								window.scrollTo({ top: 0, left: 0 });
							}}
						>
							<li className="link">Profil</li>
						</Link>
						<Link
							to="/catalogue"
							onClick={() => {
								window.scrollTo({ top: 0, left: 0 });
							}}
						>
							<li>Catalogue</li>
						</Link>
					</ul>
				</p>
				<p className="body-text footer">
					SOCIÉTÉ
					<ul>
						<Link
							to="/apropos"
							onClick={() => {
								window.scrollTo({ top: 0, left: 0 });
							}}
						>
							<li className="link">A propos</li>
						</Link>
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
