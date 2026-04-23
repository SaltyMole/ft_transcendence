import { useState } from 'react';

function Login()
{
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	
		
	// const [password, setPassword] = useState("");
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
							<label class="input_label"> Email :
									<input  class=" input" value={email} placeholder='exemple@email.fr' onChange={e => setEmail(e.target.value)} />
							</label>
						</div>
						<div>
							<label class="input_label"> Password : 
									<input  class=" input" value={password} placeholder='password' onChange={e => setPassword(e.target.value)} />
							</label>
						</div>
						
						<p>text: {email}</p>
					</form>
				</div>
			</div>
      	</main>
    </>
  );
}

export default Login;