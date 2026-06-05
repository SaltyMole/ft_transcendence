import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Button from '../components/Button';
import Input from '../components/Input';
import googleLogo from "../img/google.png";

function Login( {setIsLoggedIn} )
{
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = (e) => {e.preventDefault();
		console.log(email, password);
		if (email && password)
		{
			setIsLoggedIn(true);
			localStorage.setItem("token", "connected");
			setIsLoggedIn(true);
			navigate("/");
		}
		else
			alert("Please complete")
	}
	
	return (
    <>
    	<main>
			<div className= 'overlay '>
				<h1 id="homeText">Login</h1>
				<div>
					<p></p>
				</div>
				<div className="input_container text-start ">
					<form onSubmit={handleSubmit}>
						<Input classnameI="Input" classnameL="input_label mt-5 " text='Email@email.com' type="email"  label="email adress" value={email} set={setEmail}/>
						<Input classnameI ="Input mb-2"  classnameL="input_label mt-5" text='Password' type="password" label="password" value={password} set ={setPassword}/>
						<div className ="flex px-2 items-center justify-center gap-10 mt-5">
							<Button value="buttonP !pl-18 !pr-18" type="submit" text="Sign in"/>
						</div>
						<p className="test p-5" > or </p>
						<div className ="flex px-2 items-center justify-center">
							<Button value="buttonGoogle"  immg={googleLogo} text="Sign in with Google" />
						</div>
						<div className ="flex px-2 items-center justify-center gap-10 mt-5">
							<p style={{color: '#7972A3'}}> Need an account?<Link className="underline  register" to="/Register">Register</Link> </p>
						</div>
					</form>
				</div>
			</div>
      	</main>
    </>
  );
}

export default Login;