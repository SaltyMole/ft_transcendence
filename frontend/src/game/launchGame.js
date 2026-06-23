import changeState from "./changeState";

const launchGame = async ( gameID ) => {
    changeState(gameID, "in_progress");
};

export default launchGame;