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
				<div key={player.name} className="PlayerDiv">
					<div className="PlayerPictureWrapper">
						<img className="PlayerPicture" src={player.picture} alt={player.name}/>
					</div>
					<p className="PlayerNamePicture">{player.name}</p>
				</div>
			))}
		</div>
	);
}

export default PlayersPictures;