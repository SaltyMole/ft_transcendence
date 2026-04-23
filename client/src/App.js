import React from 'react';
import { useRef } from 'react';
import './App.css';
import { Stage, Layer, Line, Text } from 'react-konva';
import Konva from 'konva';

var selected_color = "#000000"

var pen = "source-over"
var eraser = "destination-out"
var bucket = ""
var selected_tool = pen

var thinckness_fine = 3
var thickness_medium = 10
var thickness_thick = 25
var selected_thickness = thickness_medium

var phone_width = 850

const boardRef = { current: null };


function set_select_color(color, id)
{
	document.getElementById("SelectedColor").style.backgroundColor = color;
	selected_color = color;
	console.log("new selected color = ", selected_color);

	// Reset all butons style
	const colorButton = document.getElementsByClassName("ColorButton")
	for (let i = 0; i < colorButton.length; i++)
	{
		colorButton[i].style.borderStyle = "none";
		colorButton[i].style.zIndex = 1;
	}

	// Set new style for selected color button
	if (document.getElementById(id).id === "Black" |
		document.getElementById(id).id === "DarkGrey" |
		document.getElementById(id).id === "DarkRed" |
		document.getElementById(id).id === "DarkOrange" |
		document.getElementById(id).id === "DarkYellow" |
		document.getElementById(id).id === "DarkGreen" |
		document.getElementById(id).id === "DarkSkyBlue" |
		document.getElementById(id).id === "DarkOceanBlue" |
		document.getElementById(id).id === "DarkPurple" |
		document.getElementById(id).id === "DarkPink" |
		document.getElementById(id).id === "DarkBrown")
	{
		document.getElementById(id).style.borderColor = "white";
	}

	document.getElementById(id).style.borderStyle = "double";
	if (window.innerWidth < phone_width)
		document.getElementById(id).style.borderWidth = "medium";
	else
		document.getElementById(id).style.borderWidth = "thick";

}



function set_select_tool(tool)
{
	selected_tool = tool;

	// Reset all tools colors and svg fills
	document.getElementById("Pen").style.backgroundColor = "";
	document.getElementById("PenSvg").style.fill = "";
	document.getElementById("Eraser").style.backgroundColor = "";
	document.getElementById("EraserSvg").style.fill = "";
	document.getElementById("Bucket").style.backgroundColor = "";
	document.getElementById("BucketSvg").style.fill = "";

	// Set new color and svg fill to new selected tool
	if (selected_tool === pen)
	{
		console.log("new selected tool = pen");
		document.getElementById("Pen").style.backgroundColor = "#491A65";
		document.getElementById("PenSvg").style.fill = "#ffffff";
	}
	else if (selected_tool === eraser)
	{
		console.log("new selected tool = eraser");
		document.getElementById("Eraser").style.backgroundColor = "#491A65";
		document.getElementById("EraserSvg").style.fill = "#ffffff";
	}
	else if (selected_tool === bucket)
	{
		console.log("new selected tool = bucket");
		document.getElementById("Bucket").style.backgroundColor = "#491A65";
		document.getElementById("BucketSvg").style.fill = "#ffffff";
	}
}



function set_select_thickness(thickness)
{
	selected_thickness = thickness;

	// Reset all thicknesses colors and svg fills
	document.getElementById("FineThickness").style.backgroundColor = "";
	document.getElementById("FineSvg").style.fill = "";
	document.getElementById("MediumThickness").style.backgroundColor = "";
	document.getElementById("MediumSvg").style.fill = "";
	document.getElementById("ThickThickness").style.backgroundColor = "";
	document.getElementById("ThickSvg").style.fill = "";

	// Set new color and svg fill to new selected thickness
	if (selected_thickness === thinckness_fine)
	{
		console.log("new selected thickness = fine");
		document.getElementById("FineThickness").style.backgroundColor = "#491A65";
		document.getElementById("FineSvg").style.fill = "#ffffff";
	}
	else if (selected_thickness === thickness_medium)
	{
		console.log("new selected thickness = medium");
		document.getElementById("MediumThickness").style.backgroundColor = "#491A65";
		document.getElementById("MediumSvg").style.fill = "#ffffff";
	}
	else if (selected_thickness === thickness_thick)
	{
		console.log("new selected thickness = thick");
		document.getElementById("ThickThickness").style.backgroundColor = "#491A65";
		document.getElementById("ThickSvg").style.fill = "#ffffff";
	}
}



function clear_board()
{
	boardRef.current?.clear();
	console.log("board cleared !");
}

function export_drawing()
{
	boardRef.current?.handleExport();
	console.log("drawing saved !");
	document.getElementById("ZaWorldooo").style = "animation: 0.75s ease-in-out flip forwards";
	setTimeout(function(){

	}, 2000);
}

function send_message_enter_key(key) {
	console.log(key);
	if(key === 'Enter')
		send_message();
}
function send_message()
{
	var message = document.getElementById("ChatInput").value;
	document.getElementById("ChatInput").value = "";
	console.log("Message sent in chat:", message);
}



function YesNoPopup({question, yesAction}) {

	function noActionExec()
	{
		document.getElementById("YesNo").style.visibility = "hidden"
	}

	function yesActionExec()
	{
		yesAction();
		document.getElementById("YesNo").style.visibility = "hidden"
	}

	return (
		<div id='YesNo' className='YesNo'>
			<div className='YesNoBox'>
				<text className='YesNoQuestion'>{question}</text>
				<div className='YesNoButtonsRow'>
					<button onClick={noActionExec} className="YesNoButton">no</button>
					<button onClick={yesActionExec} className="YesNoButton">yes</button>
				</div>
			</div>
		</div>
	)
}


function Board() {
	const stageRef = useRef(null);

	const [lines, setLines] = React.useState([]);

	React.useEffect(() => {
		boardRef.current = {
			clear: () => setLines([]),
			handleExport: () => handleExport([]),
		};
	}, []);


	const isDrawing = React.useRef(false);
	const containerRef = React.useRef(null);
	const [size, setSize] = React.useState({ width: 0, height: 0 });

	React.useEffect(() => {
		const el = containerRef.current;
		if (!el) return;
		const observer = new ResizeObserver(([entry]) => {
			setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
		});
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	const handleMouseDown = (e) => {
		isDrawing.current = true;
		const pos = e.target.getStage().getPointerPosition();
		setLines(prev => [...prev, {
			points: [pos.x / size.width, pos.y / size.height], // store as ratio
			color: selected_color,
			thickness: selected_thickness,
			tool: selected_tool,
		}]);
	};

	const handleMouseMove = (e) => {
		if (!isDrawing.current) return;
		const stage = e.target.getStage();
		const point = stage.getPointerPosition();
		setLines(prev => {
			const lastLine = prev[prev.length - 1];
			return [...prev.slice(0, -1), {
				...lastLine,
				points: [...lastLine.points, point.x / size.width, point.y / size.height], // store as ratio
			}];
		});
	};

	const handleMouseUp = () => {
		isDrawing.current = false;
	};

	const handleExport = () => {
		const stage = stageRef.current;
		if (!stage) return;

		const stageRect = new Konva.Rect({
			x: 0,
			y: 0,
			width: stage.width(),
			height: stage.height(),
			fill: 'white',
		});

		const backg = new Konva.Layer();
		backg.add(stageRect);
		stage.add(backg);
		backg.moveToBottom();
		stage.draw();

		const dataURL = stage.toDataURL({
			mimeType: 'image/png',
			pixelRatio: 1920 / stage.width()
		});

		backg.destroy();
		stage.draw();

		downloadURI(dataURL, 'drawing.png');
	};

	const downloadURI = async (uri, name) => {
		const blob = await (await fetch(uri)).blob();	// Convert dataURL to blob

		// Send to server
		const formData = new FormData();
		formData.append('file', blob, name);
		await fetch('/api/save-image', {
			method: 'POST',
			body: formData,
		});
	};

	return (
		<div ref={containerRef} style={{ width: '100%', height: '100%' }}>
			<Stage
				ref={stageRef}
				width={size.width}
				height={size.height}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onTouchStart={handleMouseDown}
				onTouchMove={handleMouseMove}
				onTouchEnd={handleMouseUp}
				onMouseLeave={handleMouseUp}
			>
				<Layer>
				{lines.map((line, i) => (
					<Line
					key={i}
					points={line.points.map((p, j) => j % 2 === 0 ? p * size.width : p * size.height)} // Scale with screen size
					stroke={line.color}
					strokeWidth={line.tool === eraser ? (line.thickness * (size.width / 1000))*2 : line.thickness * (size.width / 1000)}
					tension={0.5}
					lineCap="round"
					lineJoin="round"
					globalCompositeOperation={line.tool}
					/>
				))}
				</Layer>
			</Stage>
		</div>
	);
};


class DrawingInterface extends React.Component
{
	state = { data: null, yesNoQuestion: "", yesNoAction: null };

	componentDidMount()
	{
		// Set tool and thickness state at launch
		set_select_tool(selected_tool);
		set_select_thickness(selected_thickness);
		set_select_color(selected_color, "Black");

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

	displayYesNoPopup = (action, question) => {
		this.setState({ yesNoQuestion: question, yesNoAction: action });
		document.getElementById("YesNo").style.visibility = "visible";
	};


	render() {
		return (
			<div className='BlackBG'>
				<div id="ZaWorldooo">
					<div className="FilmGrain"></div>

					<YesNoPopup
						id="YesNoPopup"
						question={this.state.yesNoQuestion}
						yesAction={this.state.yesNoAction}
					/>

					<div className="Background">

						<div className="UpperPart">

							<div className="Board" id="Board">
								<Board className="KonvaBoard"/>
							</div>

							<div className="ChatBox">
								<div className="Chat">
									<b>Paul:</b> c moche <br/>
									<b>Pauline:</b> oui <br/>
									<b>Zoe:</b> d'accord <br/>
									<b>Nathan:</b> pas gentil ;( <br/>
									<b>Nathan:</b> oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
								</div>

								<div className="ChatInputBox">
									<input onKeyDown={() => send_message_enter_key(window.event.key)} placeholder='Chat here...' id="ChatInput" className="ChatInput"></input>

									<button onClick={send_message} className="SendChatButton">
										<svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="#000000"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg>
									</button>
								</div>
							</div>

						</div>

						<div className="Foot">

							<div className="ColorsEnsemble">
								<div id="SelectedColor" className="SelectedColor" style={{ backgroundColor: selected_color }}></div>
								<div className="ColorsButtonsBackground">
									<button onClick={() => set_select_color("#ffffff", "White")}			className="ColorButton" id="White"></button>
									<button onClick={() => set_select_color("#D9D9D9", "LightGrey")}		className="ColorButton" id="LightGrey"></button>
									<button onClick={() => set_select_color("#FF0000", "LightRed")}		className="ColorButton" id="LightRed"></button>
									<button onClick={() => set_select_color("#FF6A00", "LightOrange")}		className="ColorButton" id="LightOrange"></button>
									<button onClick={() => set_select_color("#FFC300", "LightYellow")}		className="ColorButton" id="LightYellow"></button>
									<button onClick={() => set_select_color("#95FF00", "LightGreen")}		className="ColorButton" id="LightGreen"></button>
									<button onClick={() => set_select_color("#00D9FF", "LightSkyBlue")}	className="ColorButton" id="LightSkyBlue"></button>
									<button onClick={() => set_select_color("#0033FF", "LightOceanBlue")}	className="ColorButton" id="LightOceanBlue"></button>
									<button onClick={() => set_select_color("#A100FF", "LightPurple")}		className="ColorButton" id="LightPurple"></button>
									<button onClick={() => set_select_color("#F200FF", "LightPink")}		className="ColorButton" id="LightPink"></button>
									<button onClick={() => set_select_color("#BC4F51", "LightBrown")}		className="ColorButton" id="LightBrown"></button>

									<button onClick={() => set_select_color("#000000", "Black")}			className="ColorButton" id="Black"></button>
									<button onClick={() => set_select_color("#666666", "DarkGrey")}		className="ColorButton" id="DarkGrey"></button>
									<button onClick={() => set_select_color("#930000", "DarkRed")}			className="ColorButton" id="DarkRed"></button>
									<button onClick={() => set_select_color("#983F00", "DarkOrange")}		className="ColorButton" id="DarkOrange"></button>
									<button onClick={() => set_select_color("#977400", "DarkYellow")}		className="ColorButton" id="DarkYellow"></button>
									<button onClick={() => set_select_color("#548F00", "DarkGreen")}		className="ColorButton" id="DarkGreen"></button>
									<button onClick={() => set_select_color("#0094AE", "DarkSkyBlue")}		className="ColorButton" id="DarkSkyBlue"></button>
									<button onClick={() => set_select_color("#001876", "DarkOceanBlue")}	className="ColorButton" id="DarkOceanBlue"></button>
									<button onClick={() => set_select_color("#6800A4", "DarkPurple")}		className="ColorButton" id="DarkPurple"></button>
									<button onClick={() => set_select_color("#95009D", "DarkPink")}		className="ColorButton" id="DarkPink"></button>
									<button onClick={() => set_select_color("#772E30", "DarkBrown")}		className="ColorButton" id="DarkBrown"></button>
								</div>
							</div>

							<div className="ToolsEnsemble">
								<div className="Tools">
									<button onClick={() => set_select_tool(pen)} className="ToolButton" id="Pen">
										<svg id="PenSvg" xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="#000000"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
									</button>
									<button onClick={() => set_select_tool(eraser)} className="ToolButton" id="Eraser">
										<svg id="EraserSvg" xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="#000000"><path d="M690-240h190v80H610l80-80Zm-500 80-85-85q-23-23-23.5-57t22.5-58l440-456q23-24 56.5-24t56.5 23l199 199q23 23 23 57t-23 57L520-160H190Zm296-80 314-322-198-198-442 456 64 64h262Zm-6-240Z"/></svg>
									</button>
									<button onClick={() => set_select_tool(bucket)} className="ToolButton" id="Bucket">
										<svg  id="BucketSvg" xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="#000000"><path d="M346-140 100-386q-10-10-15-22t-5-25q0-13 5-25t15-22l230-229-106-106 62-65 400 400q10 10 14.5 22t4.5 25q0 13-4.5 25T686-386L440-140q-10 10-22 15t-25 5q-13 0-25-5t-22-15Zm47-506L179-432h428L393-646Zm399 526q-36 0-61-25.5T706-208q0-27 13.5-51t30.5-47l42-54 44 54q16 23 30 47t14 51q0 37-26 62.5T792-120Z"/></svg>
									</button>
								</div>
								&nbsp;&nbsp;
								<div className="Thickness">
									<button onClick={() => set_select_thickness(thinckness_fine)} className="ToolButton" id="FineThickness">
										<svg id="FineSvg" xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="#000000"><path d="M280-200q-33 0-56.5-23.5T200-280q0-15 6-29.5t18-26.5l400-400q12-12 26.5-18t29.5-6q33 0 56.5 23.5T760-680q0 15-5.5 30T737-623L337-223q-12 12-26.5 17.5T280-200Z"/></svg>
									</button>
									<button onClick={() => set_select_thickness(thickness_medium)} className="ToolButton" id="MediumThickness">
										<svg id="MediumSvg" xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="#000000"><path d="M340-200q-58 0-99-41t-41-99q0-27 10.5-53t30.5-46l280-280q20-20 46-30.5t53-10.5q58 0 99 41t41 99q0 27-10.5 53T719-521L439-241q-20 20-46 30.5T340-200Z"/></svg>
									</button>
									<button onClick={() => set_select_thickness(thickness_thick)} className="ToolButton" id="ThickThickness">
										<svg id="ThickSvg" xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="#000000"><path d="M402-120q-118 0-200-82t-82-200q0-54 20-105.5t62-93.5l157-157q42-42 93.5-62T558-840q118 0 200 82t82 200q0 54-20 105.5T758-359L601-202q-42 42-93.5 62T402-120Z"/></svg>
									</button>
									&nbsp;&nbsp;
									<button onClick={() => this.displayYesNoPopup(clear_board, "Do you really want to clear the board ?")} className={`${"ToolButton"} ${"Trash"}`}>
										<svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="#000000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
									</button>
								</div>

							</div>

							<button onClick={() => this.displayYesNoPopup(export_drawing, "Do you really want to export the drawing ?")} className="SendDrawingButton"></button>

						</div>
					</div>
				</div>
			</div>
		);
	}
}



export default DrawingInterface;