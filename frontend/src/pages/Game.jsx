import test from "../img/test.jpeg"
import send from "../img/button.png"
import Button from "../components/Button";
import { useState } from "react";
import { useNavigate, Navigate, useParams, generatePath } from 'react-router-dom';
import Input from "../components/Input";
import createGame from "../game/createGame"
import joinGame from "../game/joinGame";

function Game()
{
	const [code, setCode] = useState('');
	const navigate = useNavigate();

	const handleCreateGame = async () => {
		console.log("Creating game");
		var gameID = await createGame();
		navigate(`/matchmaking/${gameID}`);
	}

	const handleJoinGame = async () => {
		console.log("Joining game");
		const canIJoin = await joinGame(code);
		if (canIJoin == true)
			navigate(`/matchmaking/${code}`);
		else
			throw "Can't join";
	}

	return (
	<>
    	<main className= "flex  h-screen" style={{ backgroundImage: `url(${test})` }}>
			<div className= 'overlay '>
				<h1 id="homeText">Games</h1>
				<div className="Games">
					<div className= "overlayGames flex-col flex items-center ">
						<h2> Join the game</h2>
						<div className="bim test flex items-end content-center justify-center pb-10">
							<Input classnameI="code text-black " classnameL="flex flex-col gap-3 text-FFFADE" type="code" label="Code :" id="id" text='xxxx' value={code} set={setCode} /> 
							<button onClick={handleJoinGame} className = "buttonSend !mt-8 w-9 h-6"> <svg xmlns="http://www.w3.org/2000/svg" className="bam" height="100%" viewBox="0 -960 960 960" width="100%" fill="#FFFADE"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg> </button>
						</div>
					</div>
					<div className = "overlayGames flex-col flex  " >
						<div className="bim flex flex-col justify-between">
							<h2 className="justify-start"> Create the game</h2>
							<p className="text-white m-2 items-center" >You can create a multiplayer game by generating a code to share.</p>
							<p className="flex flex-row justify-center items-center"> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFADE"><path d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z"/></svg> <Button action={handleCreateGame} value="buttonP"text="Play"/> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFADE"><path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z"/> </svg> </p>
						</div>
					</div>
					<div className = "overlayGames items-center ">
						<div className="bim flex flex-col justify-between">
							<h2 className= "justify-start"> Solo</h2>
							<p className="text-white m-2" >Play a game against an AI</p>						
							<p className="flex flex-row justify-center items-center"> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFADE"><path d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z"/></svg><Button value="buttonP"text="Play"/> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFADE"><path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z"/></svg></p>
						</div>
					</div>
				</div>
			</div>
      	</main>
    </>
	)
}

// function GameList()
// {
// 	const games = [{id = 1,  name ="game1"}, {id = 2,  name ="game2"}];

// 	return (games.map((game =>)))
// }

export default Game;