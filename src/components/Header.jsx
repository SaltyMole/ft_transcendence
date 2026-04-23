import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function MyButtonConnect()
{
	// const [connect, setConnect] = useState(false);
	// function handleClick() { connect ? setConnect(false) : setConnect(true)};
	function handleClick(){location.href = "../pages/Login.jsx"}
	return( <button onclick={handleClick}>Login</button>)
};

function Header() {
	const navigate = useNavigate();
  return (
    <header>
      <nav>
		<div>   
			<div id = "pages" > 
				<p><Link to="/">Accueil</Link>
        		<Link to="/Game">Game</Link>
				<Link to="/Login"> <button>Login</button> </Link> </p>
				 {/* <MyButtonConnect id ="connect" /></p> */}

			</div>  
		</div>
      </nav>
    </header>
  );
}

export default Header;