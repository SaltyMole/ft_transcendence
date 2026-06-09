const isPlayerInGame = async ( gameID, searchedId ) => {
	const token = localStorage.getItem("token");
	const response = await fetch(`/api/games/${gameID}/${searchedId}`, {
		method: 'GET',
		credentials: 'include'
	});

	if (!response.ok) {
		throw new Error(`HTTP error: ${response.status}`);
		return (false);
	}

	const data = await response.json();
	console.log("AAAAAAAAAAAAAAAAAAAAAAA: ", data.isInGame);

	return data.isInGame;
};

export default isPlayerInGame;