const sendDrawing = async ( gameID, playerID, drawing ) => {
	// Fetch data
	const res = await fetch(`/api/games/${gameID}/drawings`, {
		method: 'POST',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ drawingData: drawing })
	});

	// Check if no error
	if (!response.ok) {
		throw new Error(`HTTP error: ${response.status}`);
	}

	// Return game ID
	console.log('Drawing sent from ', playerID);
};

export default sendDrawing;