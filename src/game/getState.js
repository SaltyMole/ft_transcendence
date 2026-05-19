import React, { useEffect } from "react";

const getState = async ( gameID ) => {
	const response = await fetch('/src/game/bdd.json');
	const data = await response.json();
	const game = data.find(game => game.id === gameID);

	if (!game) {
		throw new Error(`Game ${gameID} not found`);
	}

	return game.state;
};

export default getState;