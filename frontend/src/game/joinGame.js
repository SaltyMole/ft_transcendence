const joinGame = async (gameID) => {
	const response = await fetch(`/api/games/${gameID}/join`, {
		method: 'POST',
		credentials: 'include'
	});

	if (!response.ok) {
		const data = await response.json();
		return [{ field: "code", message: data.error }];
	}

	return true;
};

export default joinGame;