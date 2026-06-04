import getDrawings from "./getDrawings"

const havePlayerDrawn = async ( gameID, searchedName ) => {
		const response = await fetch('/src/game/bdd.json');
	const data = await response.json();
	const game = data.find(game => game.id === gameID);

	if (!game) {
		throw new Error(`Game ${gameID} not found`);
	}

	const drawing = game.drawings.find(drawing => drawing.player === searchedName);
	if (drawing == undefined)
		return (false);

	return (true);
};

export default havePlayerDrawn;