import test from "../img/test.jpeg";
import React from "react";
import "../css/front/style.css";
import "../css/Matchmaking.css";
import PlayersPictures from "../components/PlayersPictures";
import Chat from "../components/Chat";

import NathanPicture from "../img/nathan.png";
import PaulPicture from "../img/paul.png";
import PaulinePicture from "../img/pauline.png";
import ZoePicture from "../img/zoe.jpg";
import LucasPicture from "../img/lucas.webp";

const players = [
	{ key: 1, name: "Nathan", picture: NathanPicture },
	{ key: 2, name: "Paul", picture: PaulPicture },
	{ key: 3, name: "Pauline", picture: PaulinePicture },
	{ key: 4, name: "Zoe", picture: ZoePicture },
	{ key: 5, name: "Lucas", picture: LucasPicture },
	{ key: 6, name: "Lucas", picture: LucasPicture },
	{ key: 7, name: "Lucas", picture: LucasPicture },
	{ key: 8, name: "Lucas", picture: LucasPicture },
	{ key: 9, name: "Lucas", picture: LucasPicture },
	{ key: 10, name: "Lucas", picture: LucasPicture },
	{ key: 11, name: "Lucas", picture: LucasPicture },
	{ key: 12, name: "Lucas", picture: LucasPicture },
];

const code = "42abcdef"

function Matchmaking() {
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
										<PlayersPictures Players={players} />
									</div>
									<div className="CodeDiv">
										CODE: {code}
									</div>


								</div>

								<div className="ChatDiv">
									<Chat
										chatWidth="100%"
										chatHeight="40vh"
										chatPhoneModeWidth="0vw"
										chatPhoneWidth="100%"
										chatPhoneHeight="50vh"
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
