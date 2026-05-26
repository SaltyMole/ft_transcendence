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

const Lobby = () => {
	const { gameID } = useParams();
	const { state } = useLocation();
	const playerName = state?.name;

	const navigate = useNavigate();

	// If player not in this game, then kick player because he didn't joined using the game page
	// Then if didn't drawn, then redirect to drawing page
	useEffect(() => {
		const checkIsHere = async () => {
			const isHeHere = await isPlayerInGame(gameID, playerName)
			if (isHeHere == false)
				navigate('/game');
		}
		checkIsHere();

		const checkDrawn = async () => {
			const doIHvaeToDraw = await havePlayerDrawn(gameID, playerName);
			if (doIHvaeToDraw == false)
				navigate(`/drawing/${gameID}`, { state: { name: playerName } });
		}
		checkDrawn();
	}, []);

	// When player leave the page (except drawing that is the next game page)
	const location = useLocation();
	useEffect(() => {
		return () => {
			if (window.location.pathname !== `/drawing/${gameID}`) {
				removePlayer(gameID, playerName);
				removeDrawing(gameID, playerName);
			}
		};
	}, [location]);

	// Get game state and change path if necessary
	const [gameState, setState] = useState("");
	useEffect(() => {
		const fetchState = () => {
			getState(gameID)
			.then(fetchedState => {
				setState(fetchedState);
				if (fetchedState == "finished")
					navigate(`/results/${gameID}`, { state: { name: playerName } });
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
	}, []);

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
	}, []);

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
		const fetchPlayers = () => {
			getPlayers(gameID)
			.then(players => setPlayers(players))
			.catch(error => console.error(error));
		}

		// Fetch
		fetchPlayers();
		const interval = setInterval(fetchPlayers, 2000);

		// Cleaner unmount
		return () => clearInterval(interval);
	}, []);

	// Set generate story button state
	// Get number of players
	useEffect(() => {
		const checkAndSetButtonState = async () => {
			if (drawings.length < players.length)
			{
				document.getElementById("generateStoryButton").style.backgroundColor = "#ff8787";
				document.getElementById("generateStoryButton").style.color = "#FFFADE";
				document.getElementById("generateStoryButton").style.boxShadow = "2px 4px 3px #000000b5";
			}
			else
			{
				document.getElementById("generateStoryButton").style.backgroundColor = "#58508D";
				document.getElementById("generateStoryButton").style.color = "#87ff97";
				document.getElementById("generateStoryButton").style.boxShadow = "#491A65";
			}

			console.log("heyyyyy");
		}

		// Fetch
		checkAndSetButtonState();
		const interval = setInterval(checkAndSetButtonState, 2000);

		// Cleaner unmount
		return () => clearInterval(interval);
	}, [drawings, players]);

	return (
		<>
			<main class="bg-cover bg-center h-screen" style={{ backgroundImage: `url(${test})` }}>
				<div className="overlay">
					<div className="LobbyContent">
						<h1 className="LobbyText"> LOBBY </h1>
						<h1 className="Environment"> Environment: {environment} </h1>
						<div className="CarouselAndStory">
							<div className="Carousel">
								<h1 className="CarouselText">Drawings</h1>
								<DrawingCarousel gameID={gameID} />
								<div className="ChatDivLobby">
									<Chat
										clientName={playerName}
										gameID={gameID}
									/>
								</div>
							</div>
							<div className="CombatStory">
								<h1 className="CombatStoryText">Fight</h1>
								<button id="generateStoryButton" className="generateStoryButton">Generate story ({drawings.length}/{players.length})</button>
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
