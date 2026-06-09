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
import isPlayerInGame from "../game/isPlayerInGame";
import Button from "../components/Button";

const playerID = "9eadf287-7532-4759-9206-fbf5b396e4b1";

const Matchmaking = () => {
	const { gameID } = useParams();

	const navigate = useNavigate();

	// If player not in this game, then kick player because he didn't joined using the game page
	useEffect(() => {
		const checkIsHere = async () => {

			const isHeHere = await isPlayerInGame(gameID, playerID)
			if (isHeHere == false)
				navigate('/game');
		}
		checkIsHere();


	}, []);

	// When player change website page (except lobby that is the next game page)
	// When player quit the website or close the page, then display a warning page to confirm
	const location = useLocation();
	useEffect(() => {
		const handlePageHide = () => {
			const blob = new Blob(
				[JSON.stringify({ id: gameID, name: playerName })],
				{ type: "application/json" }
			);
			navigator.sendBeacon("/gameroute/removeplayer", blob);
		};

		const handleBeforeUnload = (e) => {
			e.preventDefault();
			e.returnValue = "";
		};

		window.addEventListener("beforeunload", handleBeforeUnload);
		window.addEventListener("pagehide", handlePageHide);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
			window.removeEventListener("pagehide", handlePageHide);
			// if (window.location.pathname !== `/lobby/${gameID}`) {
			// 	removePlayer(gameID, playerID);
			// }
		};
	}, []);

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
					navigate(`/lobby/${gameID}`);
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
						<h1 id="homeText"> Matchamaking </h1>
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
										clientName={playerID}
										gameID={gameID}
									/>
								</div>
							</div>

						<button className="LaunchButton buttonSend flex item-center justify-center w-9 h-6" onClick={launchFunction}>Launch game</button>
					</div>
				</div>
			</main>
		</>
	);
}

export default Matchmaking;
