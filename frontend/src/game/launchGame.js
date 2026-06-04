import changeState from "./changeState";

const launchGame = async ( gameID ) => {
    changeState(gameID, "playing");
};

export default launchGame;