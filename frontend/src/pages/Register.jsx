import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

function Register()
{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
        
    const handleRegister = async (event) => {
        event.preventDefault();

        if (email && password && username)
        {
            const response = await fetch('/api/auth/register', {
                method:'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, username, password, firstName: 'test', lastName: 'test' })
            });

            if (response.ok)
            {
                localStorage.setItem('token', 'connected');
                navigate('/');
            }
            
        }
    }
            
        return (
        <>
            <main>
                <div className= 'overlay'>
                    <h1 id="homeText">Register</h1>
                    <div>
                        <p></p>
                    </div>
                    <div className="input_container text-start ">
                        <form onSubmit={handleRegister}>
                            <Input classnameI ="Input"  classnameL="input_label mt-5" text='Email@email.com' type="email" label="email adress" value={email} set={setEmail}/>
                            <div><Input classnameI ="Input"  classnameL="input_label mt-5" text='Password' type="password" label="password" value={password} set ={setPassword}/>
                            </div>
                            <div>
                                <Input classnameI ="Input"  classnameL="input_label mt-5" text="Username" type="text" label="Username" value={username} set ={setUsername}/>
                            </div>
                            <div className ="flex px-2 items-center mt-5 justify-center gap-10 mt-5">
                                <Button value ="buttonP !pl-18 !pr-18" type="submit" text="Register" />
                            </div>
                            <div className ="flex px-2 items-center justify-center gap-10 mt-5">
                                <p style={{color: '#7972A3'}}>Already have an account?<Link className="underline  register" to="/Login">Login</Link> </p>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
        );
}

export default Register;