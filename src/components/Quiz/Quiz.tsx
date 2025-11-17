import { useState } from "react";
import "./Quiz.css";
import quizPictures from "./genresImage";

function createImageQuestions(imagesData) {
	const imageQuestions = [];
	for (let i = 0; i < imagesData.length; i++) {
		for (let j = i + 1; j < imagesData.length; j++) {
			imageQuestions.push({
				questionId: imageQuestions.length + 1,
				imageA: imagesData[i],
				imageB: imagesData[j],
			});
		}
	}
	return imageQuestions;
}

function Quizz() {
	const [questionNumber, setQuestioNumber] = useState(0);
	const currentQuestion = createImageQuestions(quizPictures)[questionNumber];

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
						<button
							type="button"
							className="quiz-images"
							style={{
								backgroundImage: `url(/quizImages/${currentQuestion.imageA.id}.jpg)`,
							}}
						/>
						<button
							type="button"
							className="quiz-images"
							style={{
								backgroundImage: `url(/quizImages/${currentQuestion.imageB.id}.jpg)`,
							}}
						/>
					</div>
				</div>
			</section>
		</>
	);
}

export default Quizz;
