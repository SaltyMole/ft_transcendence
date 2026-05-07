import test from "../img/test.jpeg"
import send from "../img/button.png"
import Button from "../components/Button";
import { useState } from "react";
import Input from "../components/Input";

function Game()
{
	const [code, setCode] = useState('');
	return (
	<>
    	<main className= "bg-cover bg-center h-screen" style={{ backgroundImage: `url(${test})` }}>
			<div className= 'overlay '>
				<h1 id="homeText">Games</h1>
				<div className="Games">
					<div className= "overlayGames ">
						{/* <h2> Choose the game</h2> */}
						{/* <div  className="listGames">
							<ul>
								<li>Game1 <Button value="buttonJointheGame" text="join" /></li>
								<li>Game2 <Button value="buttonJointheGame"  text="join" /></li>
								<li>Game3 <Button value="buttonJointheGame"  text="join" /></li>
								<li>Game4 <Button value="buttonJointheGame" text="join" /></li>
								<li>Game5 <Button value="buttonJointheGame"  text="join" /></li>
								<li>Game6 <Button value="buttonJointheGame"  text="join" /></li>
							</ul>
						</div>  */}
						<h2> Join the game</h2>
						<div className="bim flex justify-center  ">
						<Input classnameI="code text-black" classnameL="text-white" type="Code :	" id="id" text='xxxx' value={code} set={setCode} /> 
						<button className = "buttonSend"> <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="#491A65"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg> </button>
						
						</div>
						
					</div>
					<div className = "overlayGames">
						<h2> Create the game</h2>
						<p className="text-white" >You can create a multiplayer game by generating a code to share.</p>
						<div className="flex justify-center items-center ">						
							<p><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z"/></svg></p>
							<Button value="buttonP"text="play"/>
							<p><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z"/></svg></p>
						</div>

						
						{/* <button className = "button"> Play </button> */}
						
					</div>
					<div className = "overlayGames">
						<h2> Solo</h2>
						<p className="text-white" >play a game against an AI</p>
						<div className="flex justify-center items-center ">						
							<p><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z"/></svg></p>
							<Button value="buttonP"text="play"/>
							<p><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z"/></svg></p>
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