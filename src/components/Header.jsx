import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button  from "./Button";
// import isLoggedIn from "../App"

function MyButtonConnect()
{
	// const [connect, setConnect] = useState(false);
	// function handleClick() { connect ? setConnect(false) : setConnect(true)};
	function handleClick(){location.href = "../pages/Login.jsx"}
	return( <button onclick={handleClick}>Login</button>)
};

function Header() {
	const navigate = useNavigate();

	// const handleAuth = () => {
	// 	if (isLoggedIn)
	// 	{
	// 		setIsLoggetIn(false);
	// 		navigate("/");
	// 	}
	// 	else
	// 		navigate("/Login");
	// }
  return (
    <header>
      <nav>
		<div>   
			<div id = "pages" > 
				<p><Link to="/">Accueil</Link>
        		<Link to="/Game">Game</Link>
				 <Button value="ml-5" text="Login" type="btn" link="/login"/> </p>
				{/* <button onClick= {handleAuth}> {isLoggedIn ? "Logout" : "Login"}</button> </p> */}

			</div>  
		</div>
      </nav>
    </header>
  );
}

export default Header;