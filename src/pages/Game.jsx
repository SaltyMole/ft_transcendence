import React, { useState } from 'react';
import { useNavigate, Navigate, useParams, generatePath } from "react-router-dom";
import test from "../img/test.jpeg"
import createGame from "../game/createGame"
import joinGame from '../game/joinGame';

const Game = () => {
	const navigate = useNavigate();

	const handleCreateGame = async (formData) => {
		var gameID = await createGame();
		var playerName = formData.get("name");
		await joinGame(gameID, playerName);
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
			<form action={handleCreateGame}
				style={{
					backgroundColor: '#000000cb',
					width: '15vw',
					height: '25vh',
					fontSize: 50
     			}}
			>
				<input name="name" placeholder='name' />
				<button type="submit">CreateGame</button>
			</form>
			<form action={handleJoinGame}
				style={{
					backgroundColor: '#000000cb',
					width: '15vw',
					height: '25vh',
					fontSize: 50
     			}}
			>
				<input name="name" placeholder='name' />
				<input name="id" placeholder='id' />
				<button type="submit">JoinGame</button>
			</form>

			<h1
				style={{
					fontSize: 100,
					color: "#ff0000",
					backgroundColor: "#5f5f5f",
					width: '30vw',
					height: '10vh',
			}}>
					TEMPORAIRE /!\
			</h1>
		</main>
	</>
	)
}

export default Game;