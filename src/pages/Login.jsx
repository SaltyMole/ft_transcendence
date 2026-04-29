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
			<div class= 'overlay'>
				<h1 id="homeText">Login</h1>
				<div>
					<p></p>
				</div>
				<div class="input_container text-start ">
					<form action="" method="post">
						{/* <div class=""> */}
							<Input text='Email@email.com' type="email" value={email} set={setEmail}/>
						{/* </div>
						<div> */}
							<Input text='Password' type="password" value={password} set ={setPassword}/>
						{/* </div> */}
						<div class ="flex px-2 items-center justify-between mt-5">
							<Button type="submit" text="Login"/>
							<Link class="underline  register" to="/Register"> Register </Link>
						</div>
					</form>
				</div>
			</div>
      	</main>
    </>
  );
}

export default Login;