import { Link } from "react-router";
import SearchInput from "../SearchInput/SearchInput";
import "./NavBar.css";

function NavBar() {
	return (
		<div className="navbar">
			<img src="/favicon.ico" alt="logo" className="logo" />
			<div className="links">
				<Link to="/" className="primary-button nav-links-size">
					À propos
				</Link>
				<Link to="/catalogue" className="primary-button nav-links-size">
					Catalogue
				</Link>
				<SearchInput />
				<Link to="/quiz" className="primary-button" id="quiz-link">
					Lance le Quiz
				</Link>
			</div>
		</div>
	);
}

export default NavBar;
