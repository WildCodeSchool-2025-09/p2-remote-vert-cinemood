import { Link } from "react-router";
import "./NavBar.css";

function NavBar() {
	return (
		<nav className="navbar">
			<Link to={"/"} className="btn">
				Home
			</Link>
			<Link to={"catalogue"} className="btn">
				Catalogue
			</Link>
		</nav>
	);
}

export default NavBar;
