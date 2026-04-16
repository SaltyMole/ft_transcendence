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

					<div className="ColorsEnsemble">
						<div className="SelectedColor"></div>
						<div className="ColorsButtonsBackground">
							<div>
								<button className={`${"ColorButton"} ${"White"}`}></button>
								<button className={`${"ColorButton"} ${"LightGrey"}`}></button>
								<button className={`${"ColorButton"} ${"LightRed"}`}></button>
								<button className={`${"ColorButton"} ${"LightOrange"}`}></button>
								<button className={`${"ColorButton"} ${"LightYellow"}`}></button>
								<button className={`${"ColorButton"} ${"LightGreen"}`}></button>
								<button className={`${"ColorButton"} ${"LightSkyBlue"}`}></button>
								<button className={`${"ColorButton"} ${"LightOceanBlue"}`}></button>
								<button className={`${"ColorButton"} ${"LightPurple"}`}></button>
								<button className={`${"ColorButton"} ${"LightPink"}`}></button>
								<button className={`${"ColorButton"} ${"LightBrown"}`}></button>
							</div>
							<div>
								<button className={`${"ColorButton"} ${"Black"}`}></button>
								<button className={`${"ColorButton"} ${"DarkGrey"}`}></button>
								<button className={`${"ColorButton"} ${"DarkRed"}`}></button>
								<button className={`${"ColorButton"} ${"DarkOrange"}`}></button>
								<button className={`${"ColorButton"} ${"DarkYellow"}`}></button>
								<button className={`${"ColorButton"} ${"DarkGreen"}`}></button>
								<button className={`${"ColorButton"} ${"DarkSkyBlue"}`}></button>
								<button className={`${"ColorButton"} ${"DarkOceanBlue"}`}></button>
								<button className={`${"ColorButton"} ${"DarkPurple"}`}></button>
								<button className={`${"ColorButton"} ${"DarkPink"}`}></button>
								<button className={`${"ColorButton"} ${"DarkBrown"}`}></button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}



export default Drawing_board;