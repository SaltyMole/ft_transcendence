const createGame = async () => {

	const token = localStorage.getItem("token");
	const response = await fetch('/api/games', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});

	// Check if no error
	if (!response.ok) {
		throw new Error(`HTTP error: ${response.status}`);
	}

	const data = await response.json();

	// Return game ID
	console.log('Game created:', data.game.code);
	return data.game.code;
};

export default createGame;