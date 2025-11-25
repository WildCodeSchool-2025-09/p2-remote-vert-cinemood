import "./HowItWorks.css";
import "./HowItWorks-mobile.css";

function HowItWorks() {
	return (
		<>
			<section id="how-it-works">
				<h2 className="secondary-title">Comment ça marche ?</h2>

				<div className="steps-container">
					<article className="step">
						<div className="sphere">
							<span className="number">1</span>
						</div>

						<h3 className="section-title">
							Réponds à des <br />
							questions simples
						</h3>
						<p className="body-text">
							Partage tes humeurs du moment avec un quiz rapide et amusant
						</p>
					</article>
					<article className="step">
						<div className="sphere">
							<span className="number">2</span>
						</div>

						<h3 className="section-title">
							Nous analysons ton <br /> humeur
						</h3>
						<p className="body-text">
							Notre algorithme associe ton état émotionnel au film qui te
							correspond
						</p>
					</article>
					<article className="step">
						<div className="sphere">
							<span className="number">3</span>
						</div>

						<h3 className="section-title">
							Installe toi et <br />
							regarde
						</h3>
						<p className="body-text">
							Reçoit des recommandations de films personnalisées et adaptées à
							toi
						</p>
					</article>
				</div>
			</section>
		</>
	);
}

export default HowItWorks;
