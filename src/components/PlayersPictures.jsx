import React from "react";
import "./PlayersPictures.css";

function PlayersPictures({ Players }) {



	return (
		<div className="PlayersWrapper">
			{Players.map((player) => (
				<div key={player.key} className="PlayerDiv">
					<div className="PlayerPictureWrapper">
						<img className="PlayerPicture" src={player.picture} alt={player.name}/>
					</div>
					<p className="PlayerName">{player.name}</p>
				</div>
			))}
		</div>
	);
}

export default PlayersPictures;