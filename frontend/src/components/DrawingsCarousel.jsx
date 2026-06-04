import React, { useRef, useEffect, useState } from "react";
import "./DrawingsCarousel.css";
import getDrawings from "../game/getDrawings";



const DrawingCarousel = ({ gameID }) => {
	const [index, setIndex] = useState(0);
	const [drawings, setDrawings] = useState([]);

	useEffect(() => {
		const fetchDrawings = () => {
			getDrawings(gameID)
			.then(drawings => setDrawings(drawings))
			.catch(error => console.error(error));
		}
		
		// Fetch
		fetchDrawings();
		const interval = setInterval(fetchDrawings, 2000);

		// Cleaner unmount
		return () => clearInterval(interval);
	}, [gameID]);

	const prev = () => setIndex((i) => (i - 1 + drawings.length) % drawings.length);
	const next = () => setIndex((i) => (i + 1) % drawings.length);

	const drawing = drawings[index];

	if (!drawing) return null;

	return (
		<div className="DrawingCarouselContent">
			<img className="Drawing" src={drawing.drawing} alt={`Drawing by ${drawing.player}`} />
			<p className="PlayerName">{drawing.player}</p>
			<div className="Buttons">
				<button className="buttonSend flex item-center justify-center w-9 h-6" onClick={prev}>←</button>
				<button className="buttonSend flex item-center justify-center w-9 h-6" onClick={next}>→</button>
			</div>
			<p>{index + 1} / {drawings.length}</p>
		</div>
	);
};

export default DrawingCarousel;
