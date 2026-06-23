const getWinner = async ( gameID ) => {
		const response = await fetch(`/api/games/${gameID}/winner`, {
		method: 'GET',
		credentials: 'include' 
	});

	// Check if no error
	if (!response.ok) {
		return ("");
	}
	
	const data = await response.json();

	return data.winner;
};

export default getWinner;