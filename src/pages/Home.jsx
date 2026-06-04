<<<<<<< HEAD
=======
import { StrictMode } from 'react'
>>>>>>> front-test
import { createRoot } from 'react-dom/client'

import App from '../App.jsx'


createRoot(document.getElementById('root')).render(
<<<<<<< HEAD
  <App />
=======
<StrictMode>
  <App />
</StrictMode>,
>>>>>>> front-test
)

function Home() {
  return (
    <>
    	<main>
<<<<<<< HEAD
			<div class= 'overlay'>
				<h1 id="homeText">Welcome to Transcendance</h1>
=======
			<div className= 'overlay flex flex-col  '>
				<h1 id="homeText">Game Name</h1>
				<div className='input_container'>
					<h2 className="underline font-extrabold text-Purple" >Goal</h2>
					<p className="text-Purple p-5">
						Welcome to our game !<tr/> 
						This game is a drawing game.<tr/> 
						You are an adventurer, you are going on an adventure alone or with other adventurers.<tr/> 
						Your objective, drawing stuff to fight your enemies.<tr/> 
						Each turn, a new ennemy appears.<tr/> 
						The worst proposition dies.<tr/> 
						The final goal is to be the last one standing.<tr/> 
					</p>

				</div>
				<div className='input_container'>
					<h2 className="underline font-extrabold text-Purple p-5" >Rules</h2>
					<p className="text-start text-Purple">
						The rules are simple :<br/> 
						- Everything is judged by an AI, try to think like one to find a better proposition than the other ones.<br/> 
						- Don't be racist, sexist, or anything illegal.<br/> 
						- Have fun. :ˆ)<br/> 
						Be kind, it's not nice to be bad, so being bad is worse than being kind.<br/> 
					</p>

				</div>
>>>>>>> front-test
			</div>
      	</main>
    </>
  );
}

export default Home;