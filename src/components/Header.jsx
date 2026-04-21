import { useState } from "react";
import { Link } from "react-router-dom";

function MyButtonConnect()
{
	const [connect, setConnect] = useState(false);
	function handleClick() { connect ? setConnect(false) : setConnect(true)};
	return( <button onClick={handleClick}>{connect ? 'Logout' : "Login"}</button>)
};

function Header() {
  return (
    <header>
      <nav>
		<div>   
			<div id = "pages" > 
				<p><Link to="/">Accueil</Link>
        		<Link to="/Game">Game</Link>
				 <MyButtonConnect id ="connect" /></p>
			</div>  
		</div>
      </nav>
    </header>
  );
}

export default Header;