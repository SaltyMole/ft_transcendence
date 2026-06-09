const joinGame = async ( gameID, name ) => {
	const token = localStorage.getItem("token");
	const response = await fetch(`/api/games/${gameID}/join`, {
		method: 'POST',
		credentials: 'include'
	});

	if (!response.ok) {
		throw new Error(`HTTP error: ${response.status}`);
		return (false);
	}

	return (true);
};

export default joinGame;





