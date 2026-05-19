import React, { useEffect } from "react";

const changeState = async ( gameID, state ) => {
	// Fetch data
	const response = await fetch('/gameroute/changestate', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ id: gameID, state: state })
	});

	// Check if no error
	if (!response.ok) {
		throw new Error(`HTTP error: ${response.status}`);
	}

	// Return game ID
	console.log('State changed:', state);
};

export default changeState;