import test from "../img/test.jpeg"
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Navigate, useParams, generatePath, useLocation } from "react-router-dom";
import '../css/Lobby.css';
import "../css/front/style.css";
import DrawingCarousel from "../components/DrawingsCarousel"
import getEnvironment from "../game/getEnvironment";
import getStory from "../game/getStory";
import getState from "../game/getState"

const Lobby = () => {
	const { gameID, name } = useParams();
	const navigate = useNavigate();

	const [state, setState] = useState("");
	useEffect(() => {
		const fetchState = () => {
			getState(gameID)
			.then(fetchedState => {
				setState(fetchedState);
				if (fetchedState == "matchmaking")
					navigate(`/matchmaking/${gameID}`);
			})
			.catch(error => console.error(error));
		};

		fetchState();
		const interval = setInterval(fetchState, 2000);
		return () => clearInterval(interval);
	}, [gameID]);

	const [environment, setEnvironment] = useState([]);
	useEffect(() => {
		const fetchEnvironment = () => {
			getEnvironment(gameID)
			.then(environment => setEnvironment(environment))
			.catch(error => console.error(error));
		}

		// Fetch
		fetchEnvironment();
		const interval = setInterval(fetchEnvironment, 2000);

		// Cleaner unmount
		return () => clearInterval(interval);
	}, []);

	const [story, setStory] = useState([]);
	useEffect(() => {
		const fetchStory = () => {
			getStory(gameID)
			.then(story => setStory(story))
			.catch(error => console.error(error));
		}

		// Fetch
		fetchStory();
		const interval = setInterval(fetchStory, 10);

		// Cleaner unmount
		return () => clearInterval(interval);
	}, []);

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
								<DrawingCarousel gameID={gameID} />
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
	);
}

export default Lobby;
