import test from "../img/test.jpeg";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Navigate, useParams, generatePath, useLocation } from "react-router-dom";
import "../css/front/style.css";
import "../css/Matchmaking.css";
import PlayersPictures from "../components/PlayersPictures";
import Chat from "../components/Chat";
import getState from "../game/getState"
import launchGame from "../game/launchGame"
import joinGame from "../game/joinGame";
import removePlayer from "../game/removePlayer";

const Matchmaking = () => {
	const { gameID } = useParams();
	const { state } = useLocation();
	const playerName = state?.name;

	const navigate = useNavigate();

	// If no playerName, then kick player because he didn't joined using the game page
	useEffect(() => {
		if (playerName == undefined)
			navigate('/game');
	}, []);

	// When player leave the page (except lobby that is the next game page)
	const location = useLocation();
	useEffect(() => {
		return () => {
			if (window.location.pathname !== `/lobby/${gameID}`) {
				removePlayer(gameID, playerName);
			}
		};
	}, [location]);

	// Launch the game
	function launchFunction() {
		launchGame(gameID);
	}

	// Get the state of the game and change page
	const [stateGameID, setState] = useState("");
	useEffect(() => {
		const fetchState = () => {
			getState(gameID)
			.then(fetchedState => {
				setState(fetchedState);
				// If playing -> go to /lobby if have a name, else go back to /game
				if (fetchedState == "playing")
					navigate(`/lobby/${gameID}`, { state: { name: playerName } });
			})
			.catch(error => console.error(error));
		};

		fetchState();
		const interval = setInterval(fetchState, 2000);
		return () => clearInterval(interval);
	}, [gameID]);

	return (
		<>
			<main
				className="bg-cover bg-center h-screen"
				style={{ backgroundImage: `url(${test})` }}
			>
				<div className="overlay">
					<div className="MatchmakingContent">
						<h1 className="MatchmakingText"> MATCHMAKING </h1>
							<div className="PlayersAndCodeAndChat">
								<div className="PlayersAndCode">

									<div className="PlayersDiv">
										<PlayersPictures gameID={gameID} />
									</div>
									<div className="CodeDiv">
										CODE: {gameID}
									</div>


								</div>

								<div className="ChatDiv">
									<Chat
										clientName={playerName}
										gameID={gameID}
									/>
								</div>
							</div>

						<button className="LaunchButton" onClick={launchFunction}>Launch game</button>
					</div>
				</div>
			</main>
		</>
	);
}

export default Matchmaking;
