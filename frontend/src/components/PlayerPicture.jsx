import React, { useState, useEffect } from "react";
import "./PlayerPicture.css";
import getPlayer from "../game/getPlayer";

function PlayerPicture({ gameID, playerName }) {

	// Get player
	const [player, setPlayer] = useState([]);
	useEffect(() => {
        if (!gameID || !playerName) return; // wait until props are ready

        const fetchPlayer = async () => {
            try {
                const p = await getPlayer(gameID, playerName);
                setPlayer(p);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPlayer();
    }, [gameID, playerName]); // re-run when props change

	console.log(player.name);

	return (
		<div className="PlayersWrapper">
			<div className="PlayerDiv">
				<div className="PlayerPictureWrapper">
					<img className="PlayerPicture" src={player.picture} alt={player.name}/>
				</div>
				<p className="PlayerNamePicture">{player.name}</p>
			</div>
		</div>
	);
}

export default PlayerPicture;