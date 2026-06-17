import React, { useState, useEffect } from "react";
import "./PlayerPicture.css";
import getPlayer from "../game/getPlayer";

function PlayerPicture({ gameID, playerId }) {

	// Get player
	const [player, setPlayer] = useState([]);
	useEffect(() => {

        if (!gameID || !playerId) return; // wait until props are ready

        const fetchPlayer = async () => {
            try {
                const p = await getPlayer(gameID, playerId);
                setPlayer(p);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPlayer();
    }, [gameID, playerId]); // re-run when props change

	console.log(playerId);

	if (!gameID) return null;

	return (
		<div className="PlayersWrapper">
			<div className="PlayerDiv">
				<div className="PlayerPictureWrapper">
					<img className="PlayerPicture" src={player.avatar} alt={player.username}/>
				</div>
				<p className="PlayerNamePicture">{player.username}</p>
			</div>
		</div>
	);
}

export default PlayerPicture;