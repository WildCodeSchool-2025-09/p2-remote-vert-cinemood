import { useState } from "react";
import "./DropdownButton.css";

function DropdownButton() {
	const [open, setOpen] = useState(false);

	return (
		<div className="dropdown" onMouseLeave={() => setOpen(false)}>
			<button
				type="button"
				className="primary-button"
				onMouseEnter={() => setOpen(true)}
			>
				Dropdown
			</button>
			<div id="myDropdown" className={`dropdown-content ${open ? "show" : ""}`}>
				<a href="#">Link 1</a>
				<a href="#">Link 2</a>
				<a href="#">Link 3</a>
			</div>
		</div>
	);
}

export default DropdownButton;
