import type { MovieData } from "../../types/MovieType";

type TagProps = {
	className: string;
	list: MovieData[];
	setter: React.Dispatch<React.SetStateAction<MovieData[]>>;
	icon: string;
	movie: MovieData;
};

export default function Tag({
	className,
	list,
	setter,
	icon,
	movie,
}: TagProps) {
	const isActive = list.some((listItem) => listItem.id === movie.id);

	function addtoList(
		setter: React.Dispatch<React.SetStateAction<MovieData[]>>,
		movie: MovieData,
	) {
		setter((prev) => {
			const exists = prev.some((listItem) => listItem.id === movie.id);
			if (exists) {
				return prev.filter((listItem) => listItem.id !== movie.id);
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
