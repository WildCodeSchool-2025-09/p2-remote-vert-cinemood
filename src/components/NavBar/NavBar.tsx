import { Link } from "react-router";
// import SearchInput from "../SearchInput/SearchInput";
import "./NavBar.css";
import { useContext } from "react";
// import { SearchbarContext } from "../Context/SearchBarContexts";

function NavBar() {
	// const { allMovies, setMovies, setFilteredMovies, isOpen, setIsOpen } =
	// 	useContext(SearchbarContext);

	return (
		<div className="navbar">
			<img src="/favicon.ico" alt="logo" className="logo" />
			<div className="links">
				<Link to="/" className="primary-button">
					À propos
				</Link>
				<Link to="/catalogue" id="catalog-link">
					Catalogue
				</Link>
				{/* <SearchInput
					isOpen={isOpen}
					setFilteredMovies={setFilteredMovies}
					movieData={allMovies}
					setIsOpen={setIsOpen}
				/> */}
				<Link to="/quiz" className="primary-button" id="quiz-link">
					Lance le Quiz
				</Link>
			</div>
		</div>
	);
}

export default NavBar;
