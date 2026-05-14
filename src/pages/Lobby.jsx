import test from "../img/test.jpeg"
import React from 'react';
import '../css/Lobby.css';
import "../css/front/style.css";

function Lobby()
{
	return (
		<>
			<main class="bg-cover bg-center h-screen" style={{ backgroundImage: `url(${test})` }}>
				<div className="overlay">
					<h1> LOBBY </h1>
				</div>
			</main>
		</>
	);
}

export default Lobby;
