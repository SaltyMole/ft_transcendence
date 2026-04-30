import test from "../img/test.jpeg"
import React from 'react';
import '../css/Lobby.css';

function Loading()
{
	return (
	<>
		<main class= "bg-cover bg-center h-screen" style={{ backgroundImage: `url(${test})` }}>
			<div >
				<h1> LOBBY </h1>
			</div>
		</main>
	</>
	)
}

export default Loading;