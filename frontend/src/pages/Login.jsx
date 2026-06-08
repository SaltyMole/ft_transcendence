import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Button from '../components/Button';
import Input from '../components/Input';
import googleLogo from "../img/google.png";
import { useGoogleLogin } from '@react-oauth/google';

function Login( {setIsLoggedIn} )
{
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const loginWithGoogle = useGoogleLogin({
		onSuccess: async (tokenResponse) => {
			console.log("Connexion réussie !", tokenResponse);
			
			const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
				headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
			}).then(res => res.json());

			console.log("Email de l'utilisateur Google :", userInfo.email);
			
			setIsLoggedIn(true);
			localStorage.setItem("token", "connected");
			navigate("/");
		},
		onError: () => {
			console.log('Échec de la connexion');
		}
	});

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
							<Button value="buttonGoogle"  immg={googleLogo} text="Sign in with Google" action={loginWithGoogle} />
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