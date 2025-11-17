import { useState } from "react";
import "./Quiz.css";
import quizPictures from "./genresImage";

function Quizz () {
  const [buttons] = useState([quizPictures[0], quizPictures[1]]);

return (
	<>
		<section className="primary-background">
			<div className="quiz-container">
				<h1 className="primary-title">
					Laisse ton humeur <span className="body-text-blue">te guider</span>
					<br />
					vers le bon film
				</h1>
				<div className="questions">
					{buttons.map((item, index) => (
						<button
							type="button"
							key={item.id}
							className="quiz-images"
							style={{
								backgroundImage: `url(../../assets/images/quizImages/${item.id}.jpg)`,
								backgroundSize: "cover",
								backgroundPosition: "center",
							}}
							aria-label={`Image quiz ${index + 1}`}
						/>
					))}
				</div>
			</div>
		</section>
	</>
);
}

export default Quizz;