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
import getCurrentUser from "../game/getCurrentUser";


const Matchmaking = () => {
	const { gameID } = useParams();
	const navigate = useNavigate();

	// Get player ID
	const [playerID, setPlayerID] = useState(null);
	const [username, setUsername] = useState(null);
	useEffect(() => {
		const getUserID = async () => {
			const user = await getCurrentUser();
			setPlayerID(user.id);
			setUsername(user.username);
		};
		getUserID();
	}, []);

	// If player not in this game, then kick player because he didn't joined using the game page
	useEffect(() => {
		const checkIsHere = async () => {
			const isHeHere = await isPlayerInGame(gameID, playerID)
			if (isHeHere == false)
				navigate('/game');
		}
		if (playerID)
			checkIsHere();
	}, [playerID]);

	// When player change website page (except lobby that is the next game page)
	// When player quit the website or close the page, then display a warning page to confirm
	const location = useLocation();
	useEffect(() => {
		const handlePageHide = () => {
			if (!playerID || !gameID) return;
			if (location.pathname !== `/lobby/${gameID}`) {
				fetch(`/api/games/removePlayer/${gameID}/${playerID}`, {
					method: 'POST',
					credentials: 'include',
					keepalive: true
				});
			}
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
			// if (playerID && gameID && location.pathname !== `/lobby/${gameID}`) {
			// 	removePlayer(gameID, playerID);
			// }
		};
	}, [playerID, gameID]);

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
				if (fetchedState == "in_progress")
					navigate(`/lobby/${gameID}`);
			})
			.catch(error => console.error(error));
		};

		fetchState();
		const interval = setInterval(fetchState, 2000);
		return () => clearInterval(interval);
	}, [gameID]);

	if (!playerID) return null;

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
										clientName={username}
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
