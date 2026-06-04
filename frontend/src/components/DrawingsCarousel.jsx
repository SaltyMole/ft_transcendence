import React, { useEffect, useState } from "react";
import "./DrawingsCarousel.css";
import getDrawings from "../game/getDrawings";
import getDrawingFile from "../game/getDrawingFile";

const DrawingCarousel = ({ gameID }) => {
	const [index, setIndex] = useState(0);
	const [drawings, setDrawings] = useState([]);
	const [imageUrl, setImageUrl] = useState(null);

	// Move this up, before the useEffects
	const drawing = drawings[index];

	useEffect(() => {
		const fetchDrawings = () => {
			getDrawings(gameID)
			.then(newDrawings => {
				setDrawings(prev => {
				// Only update if drawings actually changed
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

	useEffect(() => {
		if (!drawing) return;
		setImageUrl(null);
		getDrawingFile(gameID, drawing.player, setImageUrl);
	}, [index, drawings]);

	const prev = () => setIndex((i) => (i - 1 + drawings.length) % drawings.length);
	const next = () => setIndex((i) => (i + 1) % drawings.length);

	if (!drawing) return null;

	return (
		<div className="DrawingCarouselContent">
		{imageUrl
			? <img className="Drawing" src={imageUrl} alt={`Drawing by ${drawing.player}`} />
			: <p>Loading...</p>
		}
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