import { Link } from "react-router";
// import SearchInput from "../SearchInput/SearchInput";
import "./NavBar.css";
//import { useLaunch } from "../../context/LaunchQuiz";
// import { useContext, useState } from "react";
// import { SearchbarContext } from "../Context/SearchBarContexts";

function NavBar() {
	// const { allMovies, setMovies, setFilteredMovies, isOpen, setIsOpen } =
	// 	useContext(SearchbarContext);
	// const [quizStarted, setQuizStarted] = useState(false);
	//const { setLaunch } = useLaunch();

	return (
		<div className="navbar">
			<div className="links-container">
				<Link to="/">
					<img
						src="logo-black-background.webp"
						alt="CinéMood"
						className="logo"
					/>
				</Link>
				<div className="nav-links-container">
					<Link to="/" className="nav-button">
						À propos
					</Link>
					<Link to="/catalogue" className="nav-button">
						Catalogue
					</Link>
					{/* <SearchInput
					isOpen={isOpen}
					setFilteredMovies={setFilteredMovies}
					movieData={allMovies}
					setIsOpen={setIsOpen}
				/> */}
					<input type="text" className="search-bar" placeholder="Recherche" />
					<Link
						to="/quiz"
						className="primary-button quiz-nav-button"
						//onClick={() => setLaunch(true)}
					>
						Lance le Quiz
					</Link>
				</div>
			</div>
		</div>
	);
}

export default NavBar;
