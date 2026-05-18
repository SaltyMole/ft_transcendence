import React, { useRef, useEffect, useState } from "react";
import "./DrawingsCarousel.css";



const DrawingCarousel = ({ slides }) => {
	const [index, setIndex] = useState(0)

	const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
	const next = () => setIndex((i) => (i + 1) % slides.length)

	const slide = slides[index]

	return (
	<div className="DrawingCarouselContent">
		<img src={slide.drawing} alt={`Drawing by ${slide.player}`} />

		<p className="PlayerName">{slide.player}</p>

		<div className="Buttons">
			<button onClick={prev}>←</button>
			<button onClick={next}>→</button>
		</div>

		<p>{index + 1} / {slides.length}</p>
	</div>
	)
}



export default DrawingCarousel;
