import test from "../img/test.jpeg"
import Button from "../components/Button";
function Game()
{
	return (
	<>
    	<main className= "bg-cover bg-center h-screen" style={{ backgroundImage: `url(${test})` }}>
			<div className= 'overlay '>
				<h1 id="homeText">Games</h1>
				<div className="Games">
					<div className= " overlayGames ">
						<h2> Join the game</h2>
						<Button text="Join" />
					</div>
					<div className = "overlayGames">
						<h2> Create the game</h2>
					</div>
					<div className = "overlayGames">
						<h2> Solo</h2>
					</div>
				</div>
			</div>
      	</main>
    </>
	)
}

export default Game;