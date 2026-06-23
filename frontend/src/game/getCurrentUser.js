const getCurrentUser = async ( ) => {
	const token = localStorage.getItem("token");
	const response = await fetch("/api/users/profile", {
		method: 'GET',
		credentials: 'include'
	});

	if (!response.ok) {
		throw new Error(`HTTP error: ${response.status}`);
		return (false);
	}

	const data = await response.json();

	return data.user;
};

export default getCurrentUser;