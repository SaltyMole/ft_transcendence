import { useState } from 'react';
import { Link } from "react-router-dom";
import Button from '../components/Button';
import Input from '../components/Input'
function Login()
{
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	
	return (
    <>
    	<main>
			<div className= 'overlay '>
				<h1 id="homeText">Login</h1>
				<div>
					<p></p>
				</div>
				<div className="input_container text-start ">
					<form action="" method="post">
						<Input classnameI ="Input" classnameL="input_label mt-5" text='Email@email.com' type="email" value={email} set={setEmail}/>
						<Input classnameI ="Input"  classnameL="input_label mt-5" text='Password' type="password" value={password} set ={setPassword}/>
						<div className ="flex px-2 items-center justify-between mt-5">
							<Button value="buttonP"type="submit" text="Login"/>
							<Link className="underline  register" to="/Register"> Register </Link>
						</div>
					</form>
				</div>
			</div>
      	</main>
    </>
  );
}

export default Login;