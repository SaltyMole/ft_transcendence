import React, { useState } from 'react';
import { useNavigate, Navigate, useParams, generatePath } from "react-router-dom";
import test from "../img/test.jpeg"
import createGame from "../game/createGame"
import joinGame from '../game/joinGame';

const Game = () => {
	const navigate = useNavigate();

	const handleCreateGame = async (formData) => {
		var gameID = await createGame();
		var playerName = formData.get("name")
		navigate(`/matchmaking/${gameID}`, { state: { name: playerName } });
	}

	const handleJoinGame = async (formData) => {
		var playerName = formData.get("name")
		var gameID = formData.get("id")
		const canIJoin = await joinGame(gameID, playerName);
		if (canIJoin == true)
			navigate(`/matchmaking/${gameID}`, { state: { name: playerName } });
	}

	return (
	<>
		<main class= "bg-cover bg-center h-screen" style={{ backgroundImage: `url(${test})` }}>
			<h1> Page du jeu</h1>
			<form action={handleCreateGame}
				style={{
					backgroundColor: 'blue',
					width: '100px',
					height: '100px'
     			}}
			>
				<input name="name" placeholder='name' />
				<button type="submit">CreateGame</button>
			</form>
			<form action={handleJoinGame}
				style={{
					backgroundColor: 'blue',
					width: '100px',
					height: '100px'
     			}}
			>
				<input name="name" placeholder='name' />
				<input name="id" placeholder='id' />
				<button type="submit">JoinGame</button>
			</form>
		</main>
	</>
	)
}

export default Game;