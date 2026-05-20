import React from 'react';
import { useNavigate, Navigate, useParams, generatePath } from "react-router-dom";
import test from "../img/test.jpeg"
import createGame from "../game/createGame"
import addPlayer from "../game/addPlayer"

const Game = () => {
	const navigate = useNavigate();

	const handleCreateGame = async () => {
		const gameID = await createGame();
		const playerName = document.getElementsByClassName('nameInput').value;
		navigate(`/matchmaking/${gameID}`, { state: { name: playerName } });
	}

	const handleJoinGame = () => {
		const gameID = document.getElementsByClassName('codeInput').value;
		const playerName = document.getElementsByClassName('nameInput').value;
		navigate(`/matchmaking/${gameID}`, { state: { name: playerName } });
	}

	return (
	<>
		<main class= "bg-cover bg-center h-screen" style={{ backgroundImage: `url(${test})` }}>
			<h1> Page du jeu</h1>
			<div >
				<input type="text" className='nameInput'></input>
				<button onClick={handleCreateGame}>create game</button>
			</div>
			<div >
				<input type="text" className='nameInput'></input>
				<input type="text" className='gameCode'></input>
				<button onClick={handleJoinGame}>join game</button>
			</div>
		</main>
	</>
	)
}

export default Game;