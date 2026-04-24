import { useState } from 'react';
import { Link } from "react-router-dom";
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
				<div class="input_container ">
					<form action="" method="post">
						<div class="">
							<label class="input_label mt-5"> Email :
									<input  class="input" type="email" value={email} placeholder='exemple@email.fr' onChange={e => setEmail(e.target.value)} />
							</label>
						</div>
						<div>
							<label class="input_label mt-5 "> Password : 
									<input  class="input" type="password" value={password} placeholder='password' onChange={e => setPassword(e.target.value)} />
							</label>
						</div>
						<div class ="flex px-2 items-center mt-5">
							<button type="submit">Login</button>
							<Link class="underline" to="/Register"> Register </Link>
						</div>
					</form>
				</div>
			</div>
      	</main>
    </>
  );
}

export default Login;