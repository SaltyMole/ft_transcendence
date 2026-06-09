const getPlayers = async ( gameID ) => {
	const token = localStorage.getItem("token");
	const response = await fetch(`/api/games/${gameID}`, {
		method: 'GET',
		credentials: 'include'
	});

	if (!response.ok) {
		throw new Error(`HTTP error: ${response.status}`);
		return (false);
	}

	const data = await response.json();

	console.log(game.players);
	return game.players;
};

export default getPlayers;