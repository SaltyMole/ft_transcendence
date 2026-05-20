import test from "../img/test.jpeg";
import React, { useState, useEffect } from "react";
import { useNavigate, Navigate, useParams, generatePath, useLocation } from "react-router-dom";
import "../css/front/style.css";
import "../css/Matchmaking.css";
import PlayersPictures from "../components/PlayersPictures";
import Chat from "../components/Chat";
import addPlayer from "../game/addPlayer"
import changeState from "../game/changeState";
import getState from "../game/getState"
import isPlayerInGame from "../game/isPlayerInGame";

const Matchmaking = () => {
	const { gameID } = useParams();
	const { state } = useLocation();
	const name = state?.name;
	// const name = "Nat";

	const navigate = useNavigate();

	useEffect(() => {
		const checkPlayer = async () => {
			const isInGame = await isPlayerInGame(gameID, name);
			if (isInGame == false)
			{
				await addPlayer(gameID, name, "/src/img/nathan.png");
			}
		}

		checkPlayer();
		
	}, []);


	function launchGame() {
		changeState(gameID, "playing");
		navigate(`/lobby/${gameID}`);
	}

	const [stateGameID, setState] = useState("");
	useEffect(() => {
		const fetchState = () => {
			getState(gameID)
			.then(fetchedState => {
				setState(fetchedState);
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
										clientName={name}
										gameID={gameID}
									/>
								</div>
							</div>

						<button className="LaunchButton" onClick={launchGame}>Launch game</button>
					</div>
				</div>
			</main>
		</>
	);
}

export default Matchmaking;
