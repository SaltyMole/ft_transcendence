import test from "../img/test.jpeg"
import React from 'react';
import '../css/Lobby.css';
import "../css/front/style.css";
import DrawingCarousel from "../components/DrawingsCarousel"
import drawingTest from "../../uploads/drawing.png";

const environment = "City"

const drawings = [
	{ key: 1,	player: "Nathan",		drawing: drawingTest },
	{ key: 2,	player: "Paul",			drawing: drawingTest },
	{ key: 3,	player: "Pauline",		drawing: drawingTest },
	{ key: 4,	player: "Zoe",			drawing: drawingTest },
	{ key: 5,	player: "Lucas",		drawing: drawingTest },
	{ key: 6,	player: "Lucas",		drawing: drawingTest },
	{ key: 7,	player: "Lucas",		drawing: drawingTest },
	{ key: 8,	player: "Lucas",		drawing: drawingTest },
	{ key: 9,	player: "Lucas",		drawing: drawingTest },
	{ key: 10,	player: "Lucas",		drawing: drawingTest },
	{ key: 11,	player: "Lucas",		drawing: drawingTest },
	{ key: 12,	player: "Lucas",		drawing: drawingTest },
];

const combatStory = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

function Lobby()
{
	return (
		<>
			<main class="bg-cover bg-center h-screen" style={{ backgroundImage: `url(${test})` }}>
				<div className="overlay">
					<div className="LobbyContent">
						<h1 className="LobbyText"> LOBBY </h1>
						<h1 className="Environment"> Environment: {environment} </h1>
						<DrawingCarousel
							Drawings={drawings}
						/>
						<h1 className="CombatStory"> {combatStory} </h1>
					</div>
					
				</div>
			</main>
		</>
	);
}

export default Lobby;
