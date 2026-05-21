const removePlayer = async ( gameID, playerName ) => {
	// Fetch data
	const response = await fetch('/gameroute/removeplayer', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ id: gameID, name: playerName })
	});

	// Check if no error
	if (!response.ok) {
		throw new Error(`HTTP error: ${response.status}`);
	}

	// Return game ID
	console.log('Player removed:', playerName);
};

export default removePlayer;