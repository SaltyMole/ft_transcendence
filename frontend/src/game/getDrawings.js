const getDrawings = async ( gameID ) => {
	const response = await fetch(`/api/games/${gameID}/drawings`, {
		method: 'GET',
		credentials: 'include' 
	});

	// Check if no error
	if (!response.ok) {
		throw new Error(`HTTP error: ${response.status}`);
	}
	
	const data = await response.json();

	return data.drawings;
};

export default getDrawings;