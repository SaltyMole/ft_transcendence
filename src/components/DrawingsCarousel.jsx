import React, { useRef, useEffect, useState } from "react";
import EmblaCarousel from '../components/emblaCarousel/js/EmblaCarousel'
import "./DrawingsCarousel.css";

// function DrawingCarousel({
// 	Drawings
// }) {

// 	return (
// 		<div className="DrawingCarouselContent">
// 			{Drawings.map((drawing) => (
// 				<div key={drawing.key} className="DrawingDiv">
// 					<img className="Drawing" src={drawing.drawing} alt={drawing.player}/>
// 					<p className="PlayerName">{drawing.player}</p>
// 				</div>
// 			))}
// 		</div>
// 	);
// }

function DrawingCarousel({
	Drawings
}) {

	return (
		<div className="DrawingCarouselContent">
			<EmblaCarousel slides={Drawings} options={{ loop: false }} />
		</div>
	);
}



export default DrawingCarousel;
