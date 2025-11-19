import { useCallback, useEffect, useMemo, useState } from "react";
import "./Quiz.css";
import { useNavigate } from "react-router";
import CarouselMovie from "../../components/CarouselMovie/CarouselMovie";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import { useQuiz } from "../../context/QuizContext";
import quizPicturesData from "./QuizPicturesData";

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

export default function Quiz() {
	const [quizStarted, setQuizStarted] = useState(false);
	const [popularMovies, setPopularMovies] = useState([]);
	const { quizAnswers, setQuizAnswers } = useQuiz();
	const [questionNumber, setQuestionNumber] = useState(0);
	const [genreSelection, setGenreSelection] = useState([]);
	const navigate = useNavigate();
	const [timeLeft, setTimeLeft] = useState(10);
	const imageQuestions = useMemo(
		() => createImageQuestions(quizPicturesData, 100),
		[],
	);
	const currentQuestion = imageQuestions[questionNumber];

	useEffect(() => {
		if (timeLeft <= 0) return;
		const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
		return () => clearInterval(timer);
	}, [timeLeft]);

	useEffect(() => {
		if (timeLeft <= 0) {
			navigate("/recommandations", { state: { quizAnswers } });
		}
	}, [timeLeft, navigate, quizAnswers]);

	function selectGenres(genresArray) {
		setGenreSelection((prev) => [...prev, ...genresArray]);
		if (questionNumber + 1 < imageQuestions.length && timeLeft > 0) {
			setQuestionNumber((q) => q + 1);
		}
	}

	const countGenre = useMemo(() => {
		return genreSelection.reduce((acc, curr) => {
			acc[curr] = (acc[curr] || 0) + 1;
			return acc;
		}, {});
	}, [genreSelection]);

	useEffect(() => {
		let maxCount = 0;
		const result = [];

		for (const genre in countGenre) {
			if (countGenre[genre] > maxCount) maxCount = countGenre[genre];
		}
		for (const genre in countGenre) {
			if (countGenre[genre] >= maxCount - 1) result.push(genre);
		}
		setQuizAnswers(result);
	}, [countGenre, setQuizAnswers]);

	useEffect(() => {
		fetch(`${import.meta.env.VITE_TMDB_API_URL}movie/popular?page=5`, {
			headers: {
				Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
				"Content-Type": "application/json;charset=utf-8",
			},
		})
			.then((response) => response.json())
			.then((movies) => {
				setPopularMovies(movies.results);
			});
	}, []);

	return (
		<>
			<div className="quiz-bg">
				{quizStarted ? (
					<>
						<section className="quiz-container">
							<h1 className="primary-title">
								Laisse ton humeur{" "}
								<span className="body-text-blue">te guider</span>
								<br />
								vers le bon film
							</h1>
							<article className="questions">
								<img
									src={`/quizImages/${currentQuestion.imageA.id}.jpg`}
									alt={`${currentQuestion.imageA.description}`}
									className="quiz-images"
									onClick={() => selectGenres(currentQuestion.imageA.genres)}
									onKeyUp={() => selectGenres(currentQuestion.imageA.genres)}
									key={currentQuestion.imageA.id}
								/>
								<img
									src={`/quizImages/${currentQuestion.imageB.id}.jpg`}
									alt={`${currentQuestion.imageB.description}`}
									className="quiz-images"
									onClick={() => selectGenres(currentQuestion.imageB.genres)}
									onKeyUp={() => selectGenres(currentQuestion.imageB.genres)}
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
								<p>{quizAnswers.join(", ")}</p>
							</article>
						</section>
					</>
				) : (
					<>
						<section className="header-section-center quiz-hero">
							<h1 className="primary-title">
								Découvre des films selon ton
								<span className="body-text-blue"> humeur</span> !
							</h1>
							<p className="body-text">
								<span className="body-text-bold">Sans réfléchir</span>, clique
								aussi vite que possible sur l'image que tu préfères sur le
								moment.
							</p>
							<button
								type="button"
								className="primary-button"
								onClick={() => setQuizStarted(true)}
							>
								Lance le quiz
							</button>
						</section>
						<section className="quiz-section quiz-carousel-section">
							<h2 className="secondary-title">
								Le plaisir
								<span className="body-text-blue"> sans scroll infini.</span>
								<br />
								Ton film idéal t'attend.
							</h2>
							{popularMovies && popularMovies.length > 0 ? (
								<CarouselMovie movies={popularMovies} />
							) : (
								<div className="recos-loading-screen">
									<img
										className="loading-icon"
										src="/logo-transparent.png"
										alt="Chargement…"
									/>
								</div>
							)}
						</section>
						<section className="quiz-section">
							<HowItWorks />
						</section>
					</>
				)}
			</div>
		</>
	);
}
