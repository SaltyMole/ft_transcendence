
import '../css/front/style.css'
import { Link } from "react-router-dom";

const users = [
	{
		username: "pfranke",
		link: "https://github.com/SaltyMole"
	},
	{
		username: "zmurie",
		link: "https://github.com/zoemurie"
	},
	{
		username: "nsauret",
		link: "https://nathansauret.com"
	},
	{
		username: "pgiroux",
		link: "https://github.com/Fusaachi"
	},
]

function LinkUser()
{

	return(
		<>
			{	
				users.map((user, index) => (
						<a key={user.username} href={user.link} className ="not-underline"> {user.username}</a> 
				))
			}
		</>
	)
	
}


function Footer() {
  return (
    <footer>
    	<p>© 2026 Our transcendance <Link to="/PrivatePolicy">Private Policy</Link>
		<Link to="/TermsOfService">Terms Of Service</Link> </p>
		
		<p> by <LinkUser /></p>

    </footer>
	
  );
}



export default Footer;