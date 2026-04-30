import { useState } from 'react';
import Input from '../components/Input';

function Register()
{

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
		
			
		return (
		<>
			<main>
				<div className= 'overlay'>
					<h1 id="homeText">Register</h1>
					<div>
						<p></p>
					</div>
					<div className="input_container text-start ">
						<form action="" method="post">
						<div className="">
							<Input text='Email@email.com' type="email" value={email} set={setEmail}/>
						</div>
						<div>
							<Input text='Password' type="password" value={password} set ={setPassword}/>
						</div>
						<div>
							<Input text="Username" type="username" value={username} set ={setUsername}/>
						</div>
							<div className ="flex px-2 items-center mt-5">
							 <button type="submit">Register</button>
							</div>
						</form>
					</div>
				</div>
			</main>
		</>
		);
}

export default Register;