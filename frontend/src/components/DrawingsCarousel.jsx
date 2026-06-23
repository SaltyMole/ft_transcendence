import React, { useEffect, useState } from "react";
import "./DrawingsCarousel.css";
import getDrawings from "../game/getDrawings";
import getDrawingFile from "../game/getDrawingFile";

const DrawingCarousel = ({ gameID }) => {
	const [index, setIndex] = useState(0);
	const [drawings, setDrawings] = useState([]);

	useEffect(() => {
		const fetchDrawings = () => {
		getDrawings(gameID)
			.then(newDrawings => {
			setDrawings(prev => {
				if (JSON.stringify(prev) === JSON.stringify(newDrawings)) return prev;
				return newDrawings;
			});
			})
			.catch(error => console.error(error));
		};
		fetchDrawings();
		const interval = setInterval(fetchDrawings, 2000);
		return () => clearInterval(interval);
	}, [gameID]);

	const drawing = drawings[index];
	const prev = () => setIndex((i) => (i - 1 + drawings.length) % drawings.length);
	const next = () => setIndex((i) => (i + 1) % drawings.length);

	if (!drawing) return null;

	return (
		<div className="DrawingCarouselContent">
		<img className="Drawing" src={drawing.drawingData} alt={`Drawing by ${drawing.username}`} />
		<p className="PlayerName">{drawing.username}</p>
		<div className="Buttons">
			<button className="buttonSend flex item-center justify-center w-9 h-6" onClick={prev}>←</button>
			<button className="buttonSend flex item-center justify-center w-9 h-6" onClick={next}>→</button>
		</div>
		<p>{index + 1} / {drawings.length}</p>
		</div>
	);
};

export default DrawingCarousel;