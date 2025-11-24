import { useEffect, useState } from "react";
import "./StarRating.css";

interface Props {
	maxStars?: number;
	onRatingChange: (rating: number) => void;
	value: number;
}

function StarRating({ maxStars = 5, onRatingChange, value }: Props) {
	const [rating, setRating] = useState(value);
	const [hover, setHover] = useState(0);

	useEffect(() => {
		setRating(value);
	}, [value]);

	const handleClick = (val: number) => {
		setRating(val);
		onRatingChange(val);
	};

	return (
		<div className="star-rating-container">
			<div className="star-rating">
				{[...Array(maxStars)].map((_, i) => {
					const starValue = i + 1;
					return (
						<button
							key={`star-${starValue}`}
							type="button"
							className={`star-icon ${
								starValue <= (hover || rating) ? "filled" : ""
							} ${hover === starValue ? "pulse" : ""}`}
							onMouseEnter={() => setHover(starValue)}
							onMouseLeave={() => setHover(0)}
							onClick={() => handleClick(starValue)}
						>
							★
						</button>
					);
				})}
			</div>
		</div>
	);
}

export default StarRating;
