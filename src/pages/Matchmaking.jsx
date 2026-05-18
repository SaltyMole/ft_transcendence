import test from "../img/test.jpeg";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import "../css/front/style.css";
import "../css/Matchmaking.css";
import PlayersPictures from "../components/PlayersPictures";
import Chat from "../components/Chat";


// const gameID = "wPl5G6DO";

const Matchmaking = () => {
	const { gameID } = useParams();

	React.useEffect(() => {
		console.log("iii", gameID);
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
										roomId="Matchmaking"
									/>
								</div>
							</div>

						<button className="LaunchButton">Launch game</button>
					</div>
				</div>
			</main>
		</>
	);
}

export default Matchmaking;
