import React, { useEffect } from "react";

const getDrawings = async ( gameID ) => {
	const response = await fetch('/src/game/bdd.json');
	
	if (!response.ok) {
		throw new Error(`HTTP error: ${response.status}`);
	}

	const data = await response.json();
	return data.drawings;
};

export default getDrawings;