import { useState } from 'react';
<<<<<<< HEAD
import Input from '../components/Input';
=======
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
>>>>>>> front-test

function Register()
{

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
		
			
		return (
		<>
			<main>
<<<<<<< HEAD
				<div class= 'overlay'>
=======
				<div className= 'overlay'>
>>>>>>> front-test
					<h1 id="homeText">Register</h1>
					<div>
						<p></p>
					</div>
<<<<<<< HEAD
					<div class="input_container text-start ">
						<form action="" method="post">
						<div class="">
							<Input text='Email@email.com' type="email" value={email} set={setEmail}/>
						</div>
						<div>
							<Input text='Password' type="password" value={password} set ={setPassword}/>
						</div>
						<div>
							<Input text="Username" type="username" value={username} set ={setUsername}/>
						</div>
							<div class ="flex px-2 items-center mt-5">
							 <button type="submit">Register</button>
=======
					<div className="input_container text-start ">
						<form action="" method="post">
							<Input classnameI ="Input"  classnameL="input_label mt-5" text='Email@email.com' type="email" value={email} set={setEmail}/>
							<div>
								<Input classnameI ="Input"  classnameL="input_label mt-5" text='Password' type="password" value={password} set ={setPassword}/>
							</div>
							<div>
								<Input classnameI ="Input"  classnameL="input_label mt-5" text="Username" type="username" value={username} set ={setUsername}/>
							</div>
							<div className ="flex px-2 items-center mt-5 justify-center gap-10 mt-5">
								<Button value ="buttonP !pl-18 !pr-18" type="submit" text="Register" />
							</div>
							<div className ="flex px-2 items-center justify-center gap-10 mt-5">
								<p style={{color: '#7972A3'}}>Already have an account?<Link className="underline  register" to="/Login">Login</Link> </p>
>>>>>>> front-test
							</div>
						</form>
					</div>
				</div>
			</main>
		</>
		);
}

export default Register;