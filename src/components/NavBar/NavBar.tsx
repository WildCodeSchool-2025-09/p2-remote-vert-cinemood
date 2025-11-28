import { Link } from "react-router";
import SearchInput from "../SearchInput/SearchInput";
import "./NavBar.css";
import { useContext } from "react";
import { SearchbarContext } from "../../context/SearchBarContext";

function NavBar() {
	const { getAllMovies, searchValue, setSearchValue } =
		useContext(SearchbarContext);

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
				<SearchInput movieData={getAllMovies} search />
				<Link to="/quiz" className="primary-button" id="quiz-link">
					Lance le Quiz
				</Link>
			</div>
		</div>
	);
}

export default NavBar;
