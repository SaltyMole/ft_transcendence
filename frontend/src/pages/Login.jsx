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
	const [errors, setErrors] = useState('');
	const navigate = useNavigate();

	const loginWithGoogle = useGoogleLogin({
		onSuccess: async (tokenResponse) => {
			try {
				const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
					headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
				}).then(res => res.json());

				const response = await fetch("/api/auth/google", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						email: userInfo.email,
						username: userInfo.name,
						googleId: userInfo.sub,
					}),
				});

				const data = await response.json();
				if (response.ok) {
					localStorage.setItem("token", "connected");
					setIsLoggedIn(true);
					navigate("/");
				} else {
					setErrors(data.error || "Google connection failed");
				}
			} catch (error) {
				console.error(error);
				setErrors("Server error");
			}
		},
		onError: () => {
			setErrors('Google connection failed');
		}
	});

	const handleSubmit = async (e) => {e.preventDefault();
		console.log(email, password);
		if (!email || !password)
		{
			setErrors("Please fill in the fields");
			return;
		}
		try {
			const response = await fetch("/api/auth/login",
				{
					method: "POST",
					headers:{ "Content-Type": "application/json"
					},
					body: JSON.stringify({
						email,
						password,
					}),
				});

			const data = await response.json();
			if(response.ok){
				localStorage.setItem("token", "connected");
				setIsLoggedIn(true);
				navigate("/");
			}	
			else{
				setErrors("Incorrect email or password");
			}

		} catch (error)
		{
			console.error(error);
			setErrors("Server error");
		}

	}
	
	return (
    <>
    	<main>
			<div className= 'overlay '>
				<h1 id="homeText">Login</h1>
				<div className="input_container text-start ">
					<form onSubmit={handleSubmit}>
						<Input classnameI="Input" classnameL="input_label mt-5 " text='Email@email.com' type="email"  label="email adress" value={email} set={setEmail}/>
						<Input classnameI ="Input mb-2"  classnameL="input_label mt-5" text='Password' type="password" label="password" value={password} set ={setPassword}/>
						{errors && <p  className='text-center text-red-500'>{errors} </p>}
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