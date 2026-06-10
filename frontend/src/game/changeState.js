const changeState = async ( gameID, state ) => {
	// Fetch data
	const token = localStorage.getItem("token");
	const response = await fetch(`/api/games/${gameID}/status`, {
		method: 'PUT',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ status: state })
	});

	// Check if no error
	if (!response.ok) {
		throw new Error(`HTTP error: ${response.status}`);
	}

	// Return game ID
	console.log('State changed:', state);
};

export default changeState;