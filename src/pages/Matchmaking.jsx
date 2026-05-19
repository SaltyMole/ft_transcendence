import test from "../img/test.jpeg";
import React, { useState, useEffect } from "react";
import { useNavigate, Navigate, useParams, generatePath } from "react-router-dom";
import "../css/front/style.css";
import "../css/Matchmaking.css";
import PlayersPictures from "../components/PlayersPictures";
import Chat from "../components/Chat";
import addPlayer from "../game/addPlayer"


// const gameID = "wPl5G6DO";

const Matchmaking = () => {
	const { gameID } = useParams();

	function launchGame() {
		const navigate = useNavigate();

		navigate(`/lobby/${gameID}`);
	}
	
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
