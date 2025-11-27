import { Link } from "react-router";
import "./NavBar.css";
import { useLaunch } from "../../context/LaunchQuiz";

function NavBar() {
	const { setLaunch } = useLaunch();

	return (
		<nav className="navbar">
			<div className="links-container">
				<Link to="/">
					<img
						src="/logo-cine-mood-black.png"
						alt="CinéMood"
						className="logo"
					/>
				</Link>

				<button type="button" className="burger-button burger">
					&#9776;
				</button>

				<ul className="nav-links-container nav-links">
					<li>
						<Link to="/" className="nav-button">
							À propos
						</Link>
					</li>
					<li>
						<Link to="/catalogue" className="nav-button">
							Catalogue
						</Link>
					</li>
					<li>
						<input type="text" className="search-bar" placeholder="Recherche" />
					</li>
					<li>
						<Link
							to="/quiz"
							className="primary-button quiz-nav-button"
							onClick={() => setLaunch(true)}
						>
							Lance le Quiz
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default NavBar;
