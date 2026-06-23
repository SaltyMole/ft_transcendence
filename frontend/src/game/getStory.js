const getStory = async ( gameID ) => {
	const response = await fetch(`/api/games/${gameID}/story`, {
		method: 'GET',
		credentials: 'include' 
	});

	// Check if no error
	if (!response.ok) {
		return ("");
	}
	
	const data = await response.json();

	return data.story.story;
};

export default getStory;