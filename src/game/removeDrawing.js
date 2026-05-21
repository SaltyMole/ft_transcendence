const removeDrawing = async ( gameID, playerName ) => {
	// Fetch data
	const response = await fetch('/gameroute/removedrawing', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ id: gameID, name: playerName })
	});

	// Check if no error
	if (!response.ok) {
		throw new Error(`HTTP error: ${response.status}`);
	}

	// Return game ID
	console.log('Drawing removed by ', playerName);
};

export default removeDrawing;