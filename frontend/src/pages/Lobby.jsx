import test from "../img/test.jpeg"
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Navigate, useParams, generatePath, useLocation } from "react-router-dom";
import '../css/Lobby.css';
import "../css/front/style.css";
import DrawingCarousel from "../components/DrawingsCarousel"
import getEnvironment from "../game/getEnvironment";
import getStory from "../game/getStory";
import getState from "../game/getState"
import havePlayerDrawn from "../game/havePlayerDrawn"
import removePlayer from "../game/removePlayer";
import removeDrawing from "../game/removeDrawing";
import isPlayerInGame from "../game/isPlayerInGame";
import Chat from "../components/Chat";
import getDrawings from "../game/getDrawings";
import getPlayers from "../game/getPlayers"
import generateStory from "../game/generateStory";
import getCurrentUser from "../game/getCurrentUser"

const Lobby = () => {
	const { gameID } = useParams();
	const navigate = useNavigate();
	const playerContinuingGame = useRef(false);

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
	// Then if didn't drawn, then redirect to drawing page
	useEffect(() => {
		const checkIsHere = async () => {
			if (!playerID || !gameID) return;
			const isHeHere = await isPlayerInGame(gameID, playerID)
			if (isHeHere == false)
				navigate('/game');
		}
		checkIsHere();

		const checkDrawn = async () => {
			if (!playerID || !gameID) return;
			const isHeHere = await isPlayerInGame(gameID, playerID)
			const doIHvaeDrawn = await havePlayerDrawn(gameID, playerID);
			
			if (isHeHere == true && doIHvaeDrawn == false)
			{
				playerContinuingGame.current = true
				navigate(`/drawing/${gameID}`);
			}
				
		}
		checkDrawn();
	}, [playerID, gameID]);



	// When player change website page (except lobby that is the next game page)
	// When player quit the website or close the page, then display a warning page to confirm
	const location = useLocation();
	useEffect( () => {
		const handlePageHide = () => {
			if (!playerID || !gameID) return;
			if (location.pathname !== `/drawing/${gameID}`) {
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
			// if (playerID && gameID && !playerContinuingGame.current) {
			// 	(async () => {
			// 		const isHeHere = await isPlayerInGame(gameID, playerID)
			// 		if (isHeHere)
			// 			removePlayer(gameID, playerID);
			// 	})();
			// }
		};
	}, [playerID, gameID]);



	// Get game state and change path if necessary
	const [gameState, setState] = useState("");
	useEffect(() => {
		const fetchState = () => {
			getState(gameID)
			.then(fetchedState => {
				setState(fetchedState);
				if (fetchedState == "finished")
				{
					playerContinuingGame.current = true
					navigate(`/results/${gameID}`);
				}
					
			})
			.catch(error => console.error(error));
		};

		fetchState();
		const interval = setInterval(fetchState, 2000);
		return () => clearInterval(interval);
	}, [gameID]);



	// Get environment
	const [environment, setEnvironment] = useState([]);
	useEffect(() => {
		const fetchEnvironment = () => {
			getEnvironment(gameID)
			.then(environment => setEnvironment(environment))
			.catch(error => console.error(error));
		}

		// Fetch
		fetchEnvironment();
	}, [gameID]);



	// Get story (almost real-time)
	const [story, setStory] = useState([]);
	useEffect(() => {
		const fetchStory = () => {
			getStory(gameID)
			.then(story => setStory(story))
			.catch(error => console.error(error));
		}

		// Fetch
		fetchStory();
		const interval = setInterval(fetchStory, 10);

		// Cleaner unmount
		return () => clearInterval(interval);
	}, [gameID]);





	// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
	// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
	// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
	// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
	// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
	// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
	// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
	// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
	// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
	// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

	// ~~~~~~~~~~~~~~~~~~~~~~ WEBSOCKET FOR STORY HERE ~~~~~~~~~~~~~~~~~~~~~~

	// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
	// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
	// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
	// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
	// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
	// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
	// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
	// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
	// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
	// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^





	// Get number of drawings
	const [drawings, setDrawings] = useState([]);
	useEffect(() => {
		const fetchDrawings = () => {
			getDrawings(gameID)
			.then(drawings => setDrawings(drawings))
			.catch(error => console.error(error));
		}
		
		// Fetch
		fetchDrawings();
		const interval = setInterval(fetchDrawings, 2000);

		// Cleaner unmount
		return () => clearInterval(interval);
	}, [gameID]);



	// Get number of players
	const [players, setPlayers] = useState([]);
	useEffect(() => {
		const fetchPlayers = async () => {
			await getPlayers(gameID)
			.then(players => setPlayers(players))
			.catch(error => console.error(error));
		}

		// Fetch
		fetchPlayers();
		const interval = setInterval(fetchPlayers, 2000);

		// Cleaner unmount
		return () => clearInterval(interval);
	}, [gameID]);



	// Set generate story button state
	// Get number of players
	useEffect(() => {
		const checkAndSetButtonState = async () => {
			// If story is writing
			if (story.length > 0)
			{
				document.getElementById("generateStoryButton").style.visibility = "hidden";
				document.getElementById("generateStoryButton").style.height = "0px";
				return;
			}
				
			// If players are still drawing, then display in red, not clickable
			if (drawings.length < players.length)
			{
				document.getElementById("generateStoryButton").style.backgroundColor = "#ff8787";
				document.getElementById("generateStoryButton").style.color = "#FFFADE";
				document.getElementById("generateStoryButton").style.boxShadow = "2px 4px 3px #000000b5";
			}
			// Else display with green text, clickable
			else
			{
				// document.getElementById("generateStoryButton").style.backgroundColor = "#58508D";
				// document.getElementById("generateStoryButton").style.color = "#87ff97";
				// document.getElementById("generateStoryButton").style.boxShadow = "#491A65";
			}
		}

		// Fetch
		checkAndSetButtonState();
		const interval = setInterval(checkAndSetButtonState, 2000);

		// Cleaner unmount
		return () => clearInterval(interval);
	}, [drawings, players]);



	// Generate story button clicked
	const generateStoryButtonAction = () => {
		if (drawings.length == players.length)
		{
			generateStory(gameID);
		}
	}

	// if (!playerID && !players) return null;
	if (!playerID) return null;

	return (
		<>
			<main className="bg-cover bg-center h-screen" style={{ backgroundImage: `url(${test})` }}>
				<div className="overlay">
					<div className="LobbyContent">
						<h1 id="homeText"> Lobby </h1>
						<h1 className="Environment"> Environment: {environment} </h1>
						<div className="CarouselAndStory">
							<div className="Carousel">
								<h1 className="CarouselText">Drawings</h1>
								<DrawingCarousel gameID={gameID} />
								<div className="ChatDivLobby">
									<Chat
										clientName={username}
										gameID={gameID}
									/>
								</div>
							</div>
							<div className="CombatStory">
								<h1 className="CombatStoryText">Fight</h1>
								<button onClick={generateStoryButtonAction} id="generateStoryButton" className="generateStoryButton buttonSend">Generate story ({drawings.length}/{players.length})</button>
								<h1>{story}</h1>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

export default Lobby;
