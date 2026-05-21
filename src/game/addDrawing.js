const addDrawing = async ( gameID, playerName, picturePath ) => {
	// Fetch data
	const response = await fetch('/gameroute/adddrawing', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ id: gameID, player: playerName, drawing: picturePath })
	});

	// Check if no error
	if (!response.ok) {
		throw new Error(`HTTP error: ${response.status}`);
	}

	// Return game ID
	console.log('Drawing added from ', playerName);
};

export default addDrawing;