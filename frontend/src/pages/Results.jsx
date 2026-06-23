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
import getCurrentUser from "../game/getCurrentUser"
import getPlayer from "../game/getPlayer";
import PlayersPictures from "../components/PlayersPictures";



const Loading = () => {
	const { gameID } = useParams();
	const { state } = useLocation();

	const navigate = useNavigate();

	// Get player ID
	const [playerID, setPlayerID] = useState(null);
	const [username, setUsername] = useState(null);
	useEffect(() => {
		const getUserID = async () => {
			const user = await getCurrentUser();
			setPlayerID(user.id);
			setUsername(user.username);
		};
		getUserID();
	}, []);

	// Get winner
	let [winner, setWinner] = useState([]);
	useEffect(() => {
		const fetchWinner = async () => {
			await getWinner(gameID)
			.then(winner => setWinner(winner))
			.catch(error => console.error(error));
		}

		// Fetch
		fetchWinner();
	}, [gameID]);

	// Get winner player
	const [player, setPlayer] = useState([]);
	useEffect(() => {
        if (!gameID || !winner.id) return; // wait until props are ready

        const fetchPlayer = async () => {
            try {
                const p = await getPlayer(gameID, winner.userId);
                setPlayer(p);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPlayer();
    }, [gameID, winner]); // re-run when props change


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

	if (!playerID || !winner.id || !player.id) return null;

	return (
	<>
		<main className="bg-cover bg-center min-h-screen relative" style={{ backgroundImage: `url(${test})` }}>
			<div className="DarkenBackground"/>
			<div className="OverlayResults">
				<div className="ResultsContent">
					<h1 id="homeText"> Results </h1>
					<div className="WinnerDiv">
						<div className="WinnerPicture">
							<PlayerPicture gameID={gameID} playerId={player.userId}/>
						</div>
						<img className="WinnerLight" src={spotlight} />
					</div>
					<h1 className="WinnerText">WINNER: {player.username} !</h1>
					<div className="ResultsRoster">
						<h2 className="ResultsRosterTitle">Combatants</h2>
						<PlayersPictures gameID={gameID} />
					</div>
					
					<div className="CarouselAndStory">
						<div className="Carousel">
							<h1 className="CarouselText">Drawings</h1>
							<DrawingCarousel gameID={gameID} />
							<div className="ChatDivResults">
								<Chat
									clientName={username}
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