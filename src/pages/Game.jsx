import test from "../img/test.jpeg"
function Game()
{
	return (
	<>
    	<main class= "bg-cover bg-center h-screen" style={{ backgroundImage: `url(${test})` }}>
			<div >
				<h1> Page du jeu</h1>
			</div>
      	</main>
    </>
	)
}

export default Game;