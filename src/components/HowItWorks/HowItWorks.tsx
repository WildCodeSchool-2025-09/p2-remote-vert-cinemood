import "./HowItWorks.css";

function HowItWorks() {
    return (
					<>
						<section id="how-it-works">
							<h2 className="h2">Comment ça marche ?</h2>
							<h3 className="h3">
								Trois étape simple pour découvrir ton prochain film préféré
							</h3>
							<div className="articles">
								<article className="article">
									<div className="sphere">
										<span className="number">1</span>
									</div>

									<h4 className="h4">Réponds à des questions simples</h4>
									<p className="description">
										Partage tes humeurs du moment avec un quiz rapide et amusant
									</p>
								</article>
								<article className="article">
									<div className="sphere">
										<span className="number">2</span>
									</div>

									<h4 className="h4">Nous analysons ton humeur</h4>
									<p className="description">
										Notre algorithme associe ton état émotionnel au film qui te
										correspond
									</p>
								</article>
								<article className="article">
									<div className="sphere">
										<span className="number">3</span>
									</div>

									<h4 className="h4">Installe toi et regarde</h4>
									<p className="description">
										Reçoit des recommandations de films personnalisées et
										adaptées à toi
									</p>
								</article>
							</div>
						</section>
					</>
				);
}

export default HowItWorks;