import test from "../img/test.jpeg"
import spotlight from "../img/spotlight.png"
import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate, useParams, generatePath, useLocation } from "react-router-dom";
import '../css/Results.css';
import getPlayers from "../game/getPlayers";
import getWinner from "../game/getWinner"
import PlayerPicture from "../components/PlayerPicture";
import DrawingCarousel from "../components/DrawingsCarousel"
import Chat from "../components/Chat";
import getStory from "../game/getStory";



const Loading = () => {
	const { gameID } = useParams();
	const { state } = useLocation();
	const playerName = state?.name;

	const navigate = useNavigate();

	// Get winner
	let [winner, setWinner] = useState([]);
	useEffect(() => {
		const fetchWinner = () => {
			getWinner(gameID)
			.then(winner => setWinner(winner))
			.catch(error => console.error(error));
		}

		// Fetch
		fetchWinner();
	}, []);

	// winner = "nath"

	// Get story
	const [story, setStory] = useState([]);
	useEffect(() => {
		const fetchStory = () => {
			getStory(gameID)
			.then(story => setStory(story))
			.catch(error => console.error(error));
		}

		// Fetch
		fetchStory();
	}, []);

	return (
	<>
		<main className="bg-cover bg-center min-h-screen relative" style={{ backgroundImage: `url(${test})` }}>
			<div className="DarkenBackground"/>
			<div className="OverlayResults">
				<div className="ResultsContent">
					<h1 id="homeText"> RESULTS </h1>
					<div className="WinnerDiv">
						<div className="WinnerPicture">
							<PlayerPicture gameID={gameID} playerName={winner}/>
						</div>
						<img className="WinnerLight" src={spotlight} />
					</div>
					<h1 className="WinnerText">WINNER: {winner} !</h1>
					
					
					<div className="CarouselAndStory">
						<div className="Carousel">
							<h1 className="CarouselText">Drawings</h1>
							<DrawingCarousel gameID={gameID} />
							<div className="ChatDivLobby">
								<Chat
									clientName={playerName}
									gameID={gameID}
								/>
							</div>
						</div>
						<div className="CombatStory">
							<h1 className="CombatStoryText">Fight</h1>
							<h1>{story}</h1>
						</div>
					</div>
				</div>
			</div>
		</main>
	</>
	)
}

export default Loading;