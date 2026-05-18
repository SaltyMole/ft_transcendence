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
	{ key: 12,	player: "Lucas",		drawing: null },
];

const combatStory = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"

function Lobby()
{
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
								<DrawingCarousel slides={drawings} />
							</div>
							<h1 className="CombatStory"> {combatStory} </h1>
						</div>
					</div>
					
				</div>
			</main>
		</>
	);
}

export default Lobby;
