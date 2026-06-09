import React, { useState, useEffect } from "react";
import "./PlayersPictures.css";
import getPlayers from "../game/getPlayers";

function PlayersPictures({ gameID }) {
	const [players, setPlayers] = useState([]);
	useEffect(() => {
		const fetchPlayers = () => {
			getPlayers(gameID)
			.then(players => setPlayers(players))
			.catch(error => console.error(error));
		}

		// Fetch
		fetchPlayers();
		const interval = setInterval(fetchPlayers, 2000);

		// Cleaner unmount
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="PlayersWrapper">
			{players.map((player) => (
				<div key={player.userId} className="PlayerDiv">
					<div className="PlayerPictureWrapper">
					<img className="PlayerPicture" src={player.avatar} alt={player.username}/>
					</div>
					<p className="PlayerNamePicture">{player.username}</p>
				</div>
			))}
		</div>
	);
}

export default PlayersPictures;