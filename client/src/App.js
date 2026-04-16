import React, { Component } from 'react';
import './App.css';

class Drawing_board extends React.Component
{
	state = { data: null };

	componentDidMount()
	{
		// Call our fetch function below once the component mounts
		this.callBackendAPI()
		.then(res => this.setState({ data: res.express }))
		.catch(err => console.log(err));
	}
	// Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
	callBackendAPI = async () => {
		const response = await fetch('/express_backend');
		const body = await response.json();

		if (response.status !== 200)
		{
			throw Error(body.message)
		}
		else
		{
			Text("Express connected");
		}
		return body;
	};

	render() {
		return (
			<div className="Background">

				<div className="Board"></div>

				<div className="Foot">
					<div className="Colors">
						<div className="SelectedColor"></div>
					</div>
					
				</div>
			</div>
		);
	}
}



export default Drawing_board;