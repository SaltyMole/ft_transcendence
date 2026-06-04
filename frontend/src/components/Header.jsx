import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button  from "./Button";
// import isLoggedIn from "../App"

function Header({setIsLoggedIn}) {
	const navigate = useNavigate();

	const handleLogout = () =>{
		localStorage.removeItem("token");
		setIsLoggedIn(false)
		navigate("/Login");
	}
  return (
    <header>
      <nav>
		<div>   
			<div id = "pages" > 
				<p><Link to="/">Accueil</Link>
        		<Link to="/Game">Game</Link>
				 <Button value=" buttonP ml-5" text="Logout" action={handleLogout}/> </p>

			</div>  
		</div>
      </nav>
    </header>
  );
}

export default Header;