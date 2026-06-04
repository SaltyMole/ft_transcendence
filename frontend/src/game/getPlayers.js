const getPlayers = async ( gameID ) => {
	const response = await fetch('/gameroute/game/' + gameID);
	const data = await response.json();
    const game = data.game;

	if (!game) {
		throw new Error(`Game ${gameID} not found`);
	}

	return game.players;
};

export default getPlayers;