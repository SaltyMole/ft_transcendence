const isPlayerInGame = async ( gameID, searchedName ) => {
	const response = await fetch('/src/game/bdd.json');
	const data = await response.json();
	const game = data.find(game => game.id === gameID);

	if (!game) {
		throw new Error(`Game ${gameID} not found`);
	}

	const player = game.players.find(player => player.name === searchedName);
	if (!player)
		return (false);

	return (true);
};

export default isPlayerInGame;