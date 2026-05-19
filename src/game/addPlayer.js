import React, { useEffect } from "react";

const addPlayer = async ( gameID, playerName, playerPicture ) => {
	// Fetch data
	const response = await fetch('/gameroute/addplayer', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ id: gameID, name: playerName, picture: playerPicture })
	});

	// Check if no error
	if (!response.ok) {
		throw new Error(`HTTP error: ${response.status}`);
	}

	// Return game ID
	console.log('Player added:', playerName);
};

export default addPlayer;