const removePlayer = async ( gameId, playerId ) => {
	
	const token = localStorage.getItem("token");
	const response = await fetch(`/api/games/removePlayer/${gameId}/${playerId}`, {
		method: 'POST',
		credentials: 'include'
	});

	// Check if no error
	if (!response.ok) {
		throw new Error(`HTTP error: ${response.status}`);
	}

	// Return game ID
	console.log('Player removed:', playerId);
};

export default removePlayer;