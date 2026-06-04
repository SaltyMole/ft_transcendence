const isPlayerInGame = async ( gameID, searchedName ) => {
	const response = await fetch('/gameroute/game/' + gameID);
	const data = await response.json();
    const game = data.game;

	if (!game || !game.players) {
		throw new Error(`Game ${gameID} not found`);
	}
	
	const player = game.players.find(player => player.name === searchedName);
	if (!player)
		return (false);

	return (true);
};

export default isPlayerInGame;