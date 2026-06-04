import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button  from "./Button";
// import isLoggedIn from "../App"

<<<<<<< HEAD
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
=======
function Header({setIsLoggedIn}) {
	const navigate = useNavigate();

	const handleLogout = () =>{
		localStorage.removeItem("token");
		setIsLoggedIn(false)
		navigate("/Login");
	}
>>>>>>> front-test
  return (
    <header>
      <nav>
		<div>   
			<div id = "pages" > 
				<p><Link to="/">Accueil</Link>
        		<Link to="/Game">Game</Link>
<<<<<<< HEAD
				 <Button value="ml-5" text="Login" type="btn" link="/login"/> </p>
				{/* <button onClick= {handleAuth}> {isLoggedIn ? "Logout" : "Login"}</button> </p> */}
=======
				 <Button value=" buttonP ml-5" text="Logout" action={handleLogout}/> </p>
>>>>>>> front-test

			</div>  
		</div>
      </nav>
    </header>
  );
}

export default Header;