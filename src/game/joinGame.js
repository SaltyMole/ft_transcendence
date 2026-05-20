import addPlayer from "./addPlayer";
import isPlayerInGame from "./isPlayerInGame";

const joinGame = async ( gameID, name ) => {
    const isInGame = await isPlayerInGame(gameID, name);
    if (isInGame == false)
    {
        await addPlayer(gameID, name, "/src/img/nathan.png");
        return (true);
    }

    return (false);
        
};

export default joinGame;





