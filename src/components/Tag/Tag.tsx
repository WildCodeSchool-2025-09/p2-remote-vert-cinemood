export default function Tag({ className, list, setter, icon, movie }) {
	const isActive = list.some((listItem) => listItem.id === movie.id);

	function addtoList(setter, para) {
		setter((prev) => {
			const exists = prev.some((listItem) => listItem.id === para.id);
			if (exists) {
				return prev.filter((listItem) => listItem.id !== para.id);
			}
			return [...prev, movie];
		});
	}

	return (
		<div className={className}>
			<i
				className={isActive ? `${icon}-fill tag-on` : icon}
				onClick={() => {
					addtoList(setter, movie);
				}}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						addtoList(setter, movie);
					}
				}}
				role="button"
				tabIndex={0}
			/>
		</div>
	);
}
