import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button  from "./Button";
// import isLoggedIn from "../App"

function Header({setIsLoggedIn}) {
	const navigate = useNavigate();

	const handleLogout = async () =>{
		try {
			await fetch("/api/auth/logout", {
				method: "POST",
				credentials: 'include'
			});
		} catch (error) {
			console.error("Logout error:", error);
		}
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
				<Link to="/Messages">Messages</Link>
				<Link to="/Friends">Friends</Link>
				<Link to="/Settings">Settings</Link>
				<Button value=" buttonP ml-5" text="Logout" action={handleLogout}/> </p>

			</div>  
		</div>
      </nav>
    </header>
  );
}

export default Header;