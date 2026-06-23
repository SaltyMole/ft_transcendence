import getDrawings from "./getDrawings"

const havePlayerDrawn = async ( gameID, searchedId ) => {

	const drawings = await getDrawings(gameID);

	if (!drawings)
		return (false);
	
	const drawing = drawings.find(drawing => drawing.userId === searchedId);
	if (drawing == undefined)
		return (false);

	return (true);
};

export default havePlayerDrawn;