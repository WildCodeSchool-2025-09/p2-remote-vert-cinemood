import "./MovieModal.css";

function MovieModal({ selectedMovie, imgUrl, setIsOpen }) {
	const closeModal = () => {
		setIsOpen(false);
	};

	return (
		<>
			<div className="modal-overlay">
				<div
					className="modal-content"
					onClick={closeModal}
					onKeyUp={() => {}}
					style={{ backgroundImage: `url(${imgUrl || ""})` }}
				>
					<h3>{selectedMovie.title}</h3>
					<p>{selectedMovie.overview}</p>
				</div>
			</div>
		</>
	);
}

export default MovieModal;
