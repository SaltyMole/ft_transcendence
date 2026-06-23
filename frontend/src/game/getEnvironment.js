const getEnvironment = async ( gameID ) => {
	const token = localStorage.getItem("token");
	const response = await fetch(`/api/games/${gameID}`, {
		method: 'GET',
		credentials: 'include'
	});

	if (!response.ok) {
		throw new Error(`HTTP error: ${response.status}`);
	}

	const data = await response.json();

	return data.game.environment;
};

export default getEnvironment;