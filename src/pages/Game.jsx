import React from 'react';
import { useNavigate, Navigate, useParams, generatePath } from "react-router-dom";
import test from "../img/test.jpeg"
import createGame from "../game/createGame"
import addPlayer from "../game/addPlayer"

const Game = () => {
	const navigate = useNavigate();

	const handleCreateGame = async () => {
		const gameID = await createGame();
		await addPlayer(gameID, "user", "");
		navigate(`/matchmaking/${gameID}`);
	}
	return (
	<>
		<main class= "bg-cover bg-center h-screen" style={{ backgroundImage: `url(${test})` }}>
			<div >
				<h1> Page du jeu</h1>
				<button onClick={handleCreateGame}>create game</button>
			</div>
		</main>
	</>
	)
}

export default Game;