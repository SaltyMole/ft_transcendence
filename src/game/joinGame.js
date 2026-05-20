import addPlayer from "./addPlayer";
import isPlayerInGame from "./isPlayerInGame";
import getState from "./getState";

const joinGame = async ( gameID, name ) => {
    const response = await fetch('/src/game/bdd.json');
	const data = await response.json();
	const game = data.find(game => game.id === gameID);

    // Check if it's in matchmaking state
    if (game.state != "matchmaking")
        return (false);

    // Check if the player isn't already in this game
    const isInGame = await isPlayerInGame(gameID, name);
    if (isInGame == false)
    {
        await addPlayer(gameID, name, "/src/img/nathan.png");
        return (true);
    }

    return (false);
        
};

export default joinGame;





