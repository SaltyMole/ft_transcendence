import getDrawings from "./getDrawings"

const havePlayerDrawn = async ( gameID, searchedName ) => {
	const response = await fetch('/gameroute/game/' + gameID);
	const data = await response.json();
    const game = data.game;

	if (!game) {
		throw new Error(`Game ${gameID} not found`);
	}

	const drawing = game.drawings.find(drawing => drawing.player === searchedName);
	if (drawing == undefined)
		return (false);

	return (true);
};

export default havePlayerDrawn;