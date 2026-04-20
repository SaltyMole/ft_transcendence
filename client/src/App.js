import React from 'react';
import './App.css';

var selected_color = "#000000"
var selected_tool = "pen"
var selected_thickness = "medium"


function chat_input_focus()
{
	const chatInput = document.getElementById("ChatInput");
	console.log(chatInput.value);

	if (chatInput.focus && chatInput.value === "Chat here...")
		document.getElementById("ChatInput").value = "";
	else if (chatInput.focus && chatInput.value === "")
		document.getElementById("ChatInput").value = "Chat here...";
}

function chat_input_unfocus()
{
	const chatInput = document.getElementById("ChatInput");
	console.log(chatInput.value);

	if (chatInput.focus && chatInput.value === "")
		document.getElementById("ChatInput").value = "Chat here...";
}

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
	
	// Reset all tools colors and svg fills
	document.getElementById("Pen").style.backgroundColor = "";
	document.getElementById("PenSvg").style.fill = "";
	document.getElementById("Eraser").style.backgroundColor = "";
	document.getElementById("EraserSvg").style.fill = "";
	document.getElementById("Bucket").style.backgroundColor = "";
	document.getElementById("BucketSvg").style.fill = "";

	// Set new color and svg fill to new selected tool
	if (selected_tool === "pen")
	{
		document.getElementById("Pen").style.backgroundColor = "#491A65";
		document.getElementById("PenSvg").style.fill = "#ffffff";
	}
	else if (selected_tool === "eraser")
	{
		document.getElementById("Eraser").style.backgroundColor = "#491A65";
		document.getElementById("EraserSvg").style.fill = "#ffffff";
	}
	else if (selected_tool === "bucket")
	{
		document.getElementById("Bucket").style.backgroundColor = "#491A65";
		document.getElementById("BucketSvg").style.fill = "#ffffff";
	}
		
}

function set_select_thickness(thickness)
{
	selected_thickness = thickness;
	console.log("new selected thickness = ", selected_thickness);

	// Reset all thicknesses colors and svg fills
	document.getElementById("FineThickness").style.backgroundColor = "";
	document.getElementById("FineSvg").style.fill = "";
	document.getElementById("MediumThickness").style.backgroundColor = "";
	document.getElementById("MediumSvg").style.fill = "";
	document.getElementById("ThickThickness").style.backgroundColor = "";
	document.getElementById("ThickSvg").style.fill = "";

	// Set new color and svg fill to new selected thickness
	if (selected_thickness === "fine")
	{
		document.getElementById("FineThickness").style.backgroundColor = "#491A65";
		document.getElementById("FineSvg").style.fill = "#ffffff";
	}
	else if (selected_thickness === "medium")
	{
		document.getElementById("MediumThickness").style.backgroundColor = "#491A65";
		document.getElementById("MediumSvg").style.fill = "#ffffff";
	}	
	else if (selected_thickness === "thick")
	{
		document.getElementById("ThickThickness").style.backgroundColor = "#491A65";
		document.getElementById("ThickSvg").style.fill = "#ffffff";
	}
		
}

function clear_board()
{
	console.log("board cleared !");
}




class Drawing_board extends React.Component
{
	state = { data: null };

	componentDidMount()
	{
		// Set tool and thickness state at launch
		set_select_tool("pen");
		set_select_thickness("medium");

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
			<div>
				<div className="FilmGrain"></div>

				<div className="Background">

					<div className="UpperPart">

						<div className="Board">

						</div>

						<div className="ChatBox">
							<div className="Chat">
								<b>Paul:</b> c moche <br/>
								<b>Pauline:</b> oui <br/>
								<b>Zoe:</b> d'accord <br/>
								<b>Nathan:</b> pas gentil ;( <br/>
								<b>Nathan:</b> oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
							</div>

							<div className="ChatInputBox">
								<input onFocus={chat_input_focus} onBlur={chat_input_unfocus} defaultValue="Chat here..." id="ChatInput" className="ChatInput"></input>

								<button className="SendChatButton">
									<svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="#000000"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg>
								</button>
							</div>
						</div>
						
						

					</div>

					<div className="Foot">

						<div className="ColorsEnsemble">
							<div id="SelectedColor" className="SelectedColor" style={{ backgroundColor: selected_color }}></div>
							<div className="ColorsButtonsBackground">
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

						<div className="ToolsEnsemble">
							<div className="Tools">
								<button onClick={() => set_select_tool("pen")} className="ToolButton" id="Pen">
									<svg id="PenSvg" xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="#000000"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
								</button>
								<button onClick={() => set_select_tool("eraser")} className="ToolButton" id="Eraser">
									<svg id="EraserSvg" xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="#000000"><path d="M690-240h190v80H610l80-80Zm-500 80-85-85q-23-23-23.5-57t22.5-58l440-456q23-24 56.5-24t56.5 23l199 199q23 23 23 57t-23 57L520-160H190Zm296-80 314-322-198-198-442 456 64 64h262Zm-6-240Z"/></svg>
								</button>
								<button onClick={() => set_select_tool("bucket")} className="ToolButton" id="Bucket">
									<svg  id="BucketSvg" xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="#000000"><path d="M346-140 100-386q-10-10-15-22t-5-25q0-13 5-25t15-22l230-229-106-106 62-65 400 400q10 10 14.5 22t4.5 25q0 13-4.5 25T686-386L440-140q-10 10-22 15t-25 5q-13 0-25-5t-22-15Zm47-506L179-432h428L393-646Zm399 526q-36 0-61-25.5T706-208q0-27 13.5-51t30.5-47l42-54 44 54q16 23 30 47t14 51q0 37-26 62.5T792-120Z"/></svg>
								</button>
							</div>
							&nbsp;&nbsp;
							<div className="Thickness">
								<button onClick={() => set_select_thickness("fine")} className="ToolButton" id="FineThickness">
									<svg id="FineSvg" xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="#000000"><path d="M280-200q-33 0-56.5-23.5T200-280q0-15 6-29.5t18-26.5l400-400q12-12 26.5-18t29.5-6q33 0 56.5 23.5T760-680q0 15-5.5 30T737-623L337-223q-12 12-26.5 17.5T280-200Z"/></svg>
								</button>
								<button onClick={() => set_select_thickness("medium")} className="ToolButton" id="MediumThickness">
									<svg id="MediumSvg" xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="#000000"><path d="M340-200q-58 0-99-41t-41-99q0-27 10.5-53t30.5-46l280-280q20-20 46-30.5t53-10.5q58 0 99 41t41 99q0 27-10.5 53T719-521L439-241q-20 20-46 30.5T340-200Z"/></svg>
								</button>
								<button onClick={() => set_select_thickness("thick")} className="ToolButton" id="ThickThickness">
									<svg id="ThickSvg" xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="#000000"><path d="M402-120q-118 0-200-82t-82-200q0-54 20-105.5t62-93.5l157-157q42-42 93.5-62T558-840q118 0 200 82t82 200q0 54-20 105.5T758-359L601-202q-42 42-93.5 62T402-120Z"/></svg>
								</button>
								&nbsp;&nbsp;
								<button onClick={clear_board} className={`${"ToolButton"} ${"Trash"}`}>
									<svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="#000000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
								</button>
							</div>

						</div>

						<button className="SendDrawingButton"></button>
						
					</div>
				</div>

			</div>
		);
	}
}



export default Drawing_board;