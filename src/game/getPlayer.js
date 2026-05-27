const getPlayer = async ( gameID, playerName ) => {
	const response = await fetch('/src/game/bdd.json');
	const data = await response.json();
	const game = data.find(game => game.id === gameID);

	if (!game) {
		throw new Error(`Game ${gameID} not found`);
	}

    const player = game.players.find(player => player.name === playerName);
	if (!player)
		throw new Error(`Player ${playerName} not found`);

	return player;
};

export default getPlayer;