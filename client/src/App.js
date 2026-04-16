import React from 'react';
import './App.css';

var selected_color = "#000000"
var selected_tool = "pen"


function set_select_color(color)
{
	document.getElementById("SelectedColor").style.backgroundColor = color;
	selected_color = color;
	console.log("new selected color = ", selected_color);
}

function set_select_tool(tool)
{
	selected_tool = tool;
	console.log("new selected tool = ", selected_tool);
}


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
						<div id="SelectedColor" className="SelectedColor" style={{ backgroundColor: selected_color }}></div>
						<div className="ColorsButtonsBackground">
							<div>
								<button onClick={() => set_select_color("#ffffff")} className={`${"ColorButton"} ${"White"}`}></button>
								<button onClick={() => set_select_color("#D9D9D9")} className={`${"ColorButton"} ${"LightGrey"}`}></button>
								<button onClick={() => set_select_color("#FF0000")} className={`${"ColorButton"} ${"LightRed"}`}></button>
								<button onClick={() => set_select_color("#FF6A00")} className={`${"ColorButton"} ${"LightOrange"}`}></button>
								<button onClick={() => set_select_color("#FFC300")} className={`${"ColorButton"} ${"LightYellow"}`}></button>
								<button onClick={() => set_select_color("#95FF00")} className={`${"ColorButton"} ${"LightGreen"}`}></button>
								<button onClick={() => set_select_color("#00D9FF")} className={`${"ColorButton"} ${"LightSkyBlue"}`}></button>
								<button onClick={() => set_select_color("#0033FF")} className={`${"ColorButton"} ${"LightOceanBlue"}`}></button>
								<button onClick={() => set_select_color("#A100FF")} className={`${"ColorButton"} ${"LightPurple"}`}></button>
								<button onClick={() => set_select_color("#F200FF")} className={`${"ColorButton"} ${"LightPink"}`}></button>
								<button onClick={() => set_select_color("#BC4F51")} className={`${"ColorButton"} ${"LightBrown"}`}></button>
							</div>
							<div>
								<button onClick={() => set_select_color("#000000")} className={`${"ColorButton"} ${"Black"}`}></button>
								<button onClick={() => set_select_color("#666666")} className={`${"ColorButton"} ${"DarkGrey"}`}></button>
								<button onClick={() => set_select_color("#930000")} className={`${"ColorButton"} ${"DarkRed"}`}></button>
								<button onClick={() => set_select_color("#983F00")} className={`${"ColorButton"} ${"DarkOrange"}`}></button>
								<button onClick={() => set_select_color("#977400")} className={`${"ColorButton"} ${"DarkYellow"}`}></button>
								<button onClick={() => set_select_color("#548F00")} className={`${"ColorButton"} ${"DarkGreen"}`}></button>
								<button onClick={() => set_select_color("#0094AE")} className={`${"ColorButton"} ${"DarkSkyBlue"}`}></button>
								<button onClick={() => set_select_color("#001876")} className={`${"ColorButton"} ${"DarkOceanBlue"}`}></button>
								<button onClick={() => set_select_color("#6800A4")} className={`${"ColorButton"} ${"DarkPurple"}`}></button>
								<button onClick={() => set_select_color("#95009D")} className={`${"ColorButton"} ${"DarkPink"}`}></button>
								<button onClick={() => set_select_color("#772E30")} className={`${"ColorButton"} ${"DarkBrown"}`}></button>
							</div>
						</div>
					</div>

					<div className="ToolsEnsemble">
						<button onClick={() => set_select_tool("pen")} className={`${"ToolButton"} ${"Pen"}`}>
							<svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="#000000"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
						</button>
						<button onClick={() => set_select_tool("eraser")} className={`${"ToolButton"} ${"Eraser"}`}>
							<svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="#000000"><path d="M690-240h190v80H610l80-80Zm-500 80-85-85q-23-23-23.5-57t22.5-58l440-456q23-24 56.5-24t56.5 23l199 199q23 23 23 57t-23 57L520-160H190Zm296-80 314-322-198-198-442 456 64 64h262Zm-6-240Z"/></svg>
						</button>
						<button onClick={() => set_select_tool("bucket")} className={`${"ToolButton"} ${"Bucket"}`}>
							<svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="#000000"><path d="M346-140 100-386q-10-10-15-22t-5-25q0-13 5-25t15-22l230-229-106-106 62-65 400 400q10 10 14.5 22t4.5 25q0 13-4.5 25T686-386L440-140q-10 10-22 15t-25 5q-13 0-25-5t-22-15Zm47-506L179-432h428L393-646Zm399 526q-36 0-61-25.5T706-208q0-27 13.5-51t30.5-47l42-54 44 54q16 23 30 47t14 51q0 37-26 62.5T792-120Z"/></svg>
						</button>
					</div>

				</div>
			</div>
		);
	}
}



export default Drawing_board;