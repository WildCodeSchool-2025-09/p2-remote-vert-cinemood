import { useEffect, useMemo, useState } from "react";
import "./Quiz.css";
import "./Quiz-mobile.css";
import { OrbitProgress } from "react-loading-indicators";
import ProgressTimer from "react-progress-bar-timer";
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
	const { setQuizAnswers } = useQuiz();
	const [questionNumber, setQuestionNumber] = useState(0);
	const [genreSelection, setGenreSelection] = useState([]);
	const navigate = useNavigate();
	const [timeLeft, setTimeLeft] = useState(22);
	const [timeLeftAnalysis, setTimeLeftAnalysis] = useState(2);
	const [quizEnded, setQuizEnded] = useState(false);
	const imageQuestions = useMemo(
		() => createImageQuestions(quizPicturesData, 100),
		[],
	);
	const currentQuestion = imageQuestions[questionNumber];

	function timer() {
		if (timeLeft <= 0) return;
		const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
		return () => clearInterval(timer);
	}

	useEffect(() => {
		if ((quizStarted && timeLeft <= 0) || questionNumber === 5) {
			setQuizEnded(true);
		}
	}, [quizStarted, timeLeft, questionNumber]);

	useEffect(() => {
		if (!quizEnded) return;
		if (timeLeftAnalysis <= 0) {
			navigate("/recommandations");
			return;
		}
		const timer = setInterval(() => {
			setTimeLeftAnalysis((prev) => prev - 1);
		}, 1000);
		return () => clearInterval(timer);
	}, [quizEnded, timeLeftAnalysis, navigate]);

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
		// console.log({ result });
		// console.log({ countGenre });

		if (result.length > 1) {
			const randomlyShortened = [...result].sort(() => 0.5 - Math.random());
			setQuizAnswers(randomlyShortened.slice(0, 2));
		} else {
			setQuizAnswers(result);
		}
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
					quizEnded ? (
						<>
							<div className="page-analyse">
								<p className="primary-title">
									Nous <span className="gradient-text">analysons </span> <br />
									tes résultats...
								</p>
								<OrbitProgress
									variant="track-disc"
									color="#05a6d6"
									dense
									size="medium"
									text=""
									textColor=""
								/>
							</div>
						</>
					) : (
						<>
							<section className="quiz-container">
								<h1 className="primary-title">
									Laisse ton humeur{" "}
									<span className="body-text-blue">te guider</span>
									<br />
									vers le bon film
								</h1>
								<article className="question-container">
									<div className="image-container">
										<img
											src={`/quizImages/${currentQuestion.imageA.id}.jpg`}
											alt={`${currentQuestion.imageA.description}`}
											className="quiz-images"
											onClick={() =>
												selectGenres(currentQuestion.imageA.genres)
											}
											onKeyUp={() =>
												selectGenres(currentQuestion.imageA.genres)
											}
											key={currentQuestion.imageA.id}
										/>
									</div>
									<div className="image-container">
										<img
											src={`/quizImages/${currentQuestion.imageB.id}.jpg`}
											alt={`${currentQuestion.imageB.description}`}
											className="quiz-images"
											onClick={() =>
												selectGenres(currentQuestion.imageB.genres)
											}
											onKeyUp={() =>
												selectGenres(currentQuestion.imageB.genres)
											}
											key={currentQuestion.imageB.id}
										/>
									</div>
								</article>
								<article className="quiz-timer">
									<ProgressTimer
										barRounded
										color="#05a6d6"
										direction="left"
										duration={20}
										rootRounded
										showDuration="true"
										variant="empty"
										started
										classes={{
											root: "timer-root",
											progressContainer: "timer-progress-bar-container",
											progress: "timer-progress-bar",
											textContainer: "timer-text-container",
											time: "timer-time",
										}}
									/>
								</article>
								<p className="body-text">
									Plus tu choisis d'images, <br />
									plus les recommandations de films seront précises.
								</p>
							</section>
						</>
					)
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
								onClick={() => {
									timer();
									setQuizStarted(true);
								}}
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
								<div className="loading-movies">
									<OrbitProgress
										variant="track-disc"
										color="#05a6d6"
										dense
										size="medium"
										text=""
										textColor=""
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
