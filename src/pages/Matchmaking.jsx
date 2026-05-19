import test from "../img/test.jpeg";
import React, { useState, useEffect } from "react";
import { useNavigate, Navigate, useParams, generatePath } from "react-router-dom";
import "../css/front/style.css";
import "../css/Matchmaking.css";
import PlayersPictures from "../components/PlayersPictures";
import Chat from "../components/Chat";
import addPlayer from "../game/addPlayer"
import changeState from "../game/changeState";
import getState from "../game/getState"


// const gameID = "wPl5G6DO";

const Matchmaking = () => {
	const { gameID } = useParams();
	const navigate = useNavigate();

	function launchGame() {
		changeState(gameID, "playing");
		navigate(`/lobby/${gameID}`);
	}

	const [state, setState] = useState([]);
	useEffect(() => {
		const fetchState = () => {
			getState(gameID)
			.then(state => setState(state))
			.catch(error => console.error(error));
		}

		// Fetch
		fetchState();
		const interval = setInterval(fetchState, 2000);

		// Cleaner unmount
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const checkState = () => {
			console.log(state);

			if (state == "playing")
				navigate(`/lobby/${gameID}`);
		}

		// Check
		checkState();
		const interval = setInterval(checkState, 2000);

		// Cleaner unmount
		return () => clearInterval(interval);
	}, []);

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
										clientName="User"
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
