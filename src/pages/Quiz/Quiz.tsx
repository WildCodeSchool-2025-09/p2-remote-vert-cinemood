import { useState } from "react";
import "./Quiz.css";

export default function Quiz() {
	const [quizStarted, setQuizStarted] = useState(false);

	return (
		<>
			<div className="quiz-bg">
				{quizStarted ? (
					<div>QUIZ HERE</div>
				) : (
					<section className="header-section-center quiz-hero">
						<h1 className="primary-title">
							Découvre des films selon ton
							<span className="body-text-blue"> humeur</span> !
						</h1>
						<p className="body-text">
							<span className="body-text-bold">Sans réfléchir</span>, clique
							aussi vite que possible sur l'image que tu préfères sur le moment.
						</p>
						<button
							type="button"
							className="primary-button"
							onClick={() => setQuizStarted(true)}
						>
							Lance le quiz
						</button>
					</section>
				)}
			</div>
		</>
	);
}
