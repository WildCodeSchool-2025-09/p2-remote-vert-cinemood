import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import "./Quiz.css";
import quizPictures from "./genresImage";

function createImageQuestions(imagesData, nbQuestions) {
	const pairs = new Set();
	const questions = [];
	const totalImages = imagesData.length;
	while (
		questions.length < nbQuestions &&
		pairs.size < (totalImages * (totalImages - 1)) / 2
	) {
		const idImageA = Math.floor(Math.random() * totalImages);
		let idImageB = Math.floor(Math.random() * totalImages);
		while (idImageB === idImageA) {
			idImageB = Math.floor(Math.random() * totalImages);
		}
		const key =
			idImageA < idImageB
				? `${idImageA}-${idImageB}`
				: `${idImageB}-${idImageA}`;
		if (!pairs.has(key)) {
			pairs.add(key);
			questions.push({
				questionId: questions.length + 1,
				imageA: imagesData[idImageA],
				imageB: imagesData[idImageB],
			});
		}
	}
	return questions;
}

function Quizz() {
	const [questionNumber, setQuestionNumber] = useState(0);
	const imageQuestions = useMemo(
		() => createImageQuestions(quizPictures, 100),
		[],
	);
	const [genreSelection, setGenreSelection] = useState([]);
	const navigate = useNavigate();
	const [timeLeft, setTimeLeft] = useState(20);
	const currentQuestion = imageQuestions[questionNumber];

	useEffect(() => {
		if (timeLeft <= 0) return;
		const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
		return () => clearInterval(timer);
	}, [timeLeft]);

	useEffect(() => {
		if (timeLeft <= 0 || !currentQuestion) {
			navigate("/recommandations", { state: { genreSelection } });
		}
	}, [timeLeft, currentQuestion, navigate, genreSelection]);

	function selectGenres(genresArray) {
		setGenreSelection((prev) => [...prev, ...genresArray]);
		if (questionNumber + 1 < imageQuestions.length && timeLeft > 0) {
			setQuestionNumber((q) => q + 1);
		}
	}

	return (
		<section className="primary-background quiz-container">
			<h1 className="primary-title">
				Laisse ton humeur <span className="body-text-blue">te guider</span>
				<br />
				vers le bon film
			</h1>
			<article className="questions">
				<button
					type="button"
					className="quiz-images"
					style={{
						backgroundImage: `url(/quizImages/${currentQuestion.imageA.id}.jpg)`,
					}}
					onClick={() => selectGenres(currentQuestion.imageA.genres)}
					key={currentQuestion.imageA.id}
				/>
				<button
					type="button"
					className="quiz-images"
					style={{
						backgroundImage: `url(/quizImages/${currentQuestion.imageB.id}.jpg)`,
					}}
					onClick={() => selectGenres(currentQuestion.imageB.genres)}
					key={currentQuestion.imageB.id}
				/>
			</article>
			<article className="quiz-timer">
				<p>
					⏰ Temps restant : <b>{timeLeft}s</b>
				</p>
				<p className="quiz-progress">
					Question {questionNumber + 1} / {imageQuestions.length}
				</p>
				<p>{genreSelection.join(", ")}</p>
			</article>
		</section>
	);
}

export default Quizz;
