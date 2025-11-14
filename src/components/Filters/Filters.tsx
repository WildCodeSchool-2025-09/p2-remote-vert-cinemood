import DropdownButton from "./DropdownButton";

function Filters({ movies, genre }: any) {
	console.log(genre);
	return (
		<>
			<DropdownButton />
			<DropdownButton />
			<DropdownButton />
			<DropdownButton />
		</>
	);
}

export default Filters;
