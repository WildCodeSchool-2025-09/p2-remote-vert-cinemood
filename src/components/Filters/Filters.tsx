import DropdownButton from "./genres";

function Filters({ movies, genre }) {
	return (
		<>
			<div>
				<DropdownButton />
				<DropdownButton />
				<DropdownButton />
				<DropdownButton />
			</div>
		</>
	);
}

export default Filters;
