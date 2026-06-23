import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Button from '../components/Button';
import Input from '../components/Input';
import googleLogo from "../img/google.png";
import { useGoogleLogin } from '@react-oauth/google';

function Login({ setIsLoggedIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    
    const [show2FA, setShow2FA] = useState(false);
    const [twoFaCode, setTwoFaCode] = useState('');
    const [twoFaError, setTwoFaError] = useState('');
    
    const navigate = useNavigate();

    const checkIf2FA = (response, data) => {
        return (
            response.status === 202 || 
            (data.message && data.message.toLowerCase().includes('2fa')) || 
            (data.error && data.error.toLowerCase().includes('2fa')) || 
            (data.user && data.user.isTwoFactorEnabled) || 
            (response.ok && !data.user) 
        );
    };

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
                
                if (checkIf2FA(response, data)) {
                    setShow2FA(true);
                } else if (response.ok) {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(""); 
        
        if (!email || !password) {
            setErrors("Please fill in the fields");
            return;
        }
        
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();
            
            if (checkIf2FA(response, data)) {
                setShow2FA(true);
            } else if (response.ok) {
                localStorage.setItem("token", "connected");
                setIsLoggedIn(true);
                navigate("/");
            } else {
                setErrors(data.error || "Incorrect email or password");
            }
        } catch (error) {
            console.error(error);
            setErrors("Server error");
        }
    };

    const handleVerify2FA = async (e) => {
        e.preventDefault();
        setTwoFaError("");

        if (!twoFaCode || twoFaCode.length !== 6) {
            setTwoFaError("Please enter a valid 6-digit code");
            return;
        }

        try {
            const response = await fetch("/api/auth/2fa/verify-login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: twoFaCode }),
            });

            const data = await response.json();

            if (response.ok) {
                setShow2FA(false);
                localStorage.setItem("token", "connected");
                setIsLoggedIn(true);
                navigate("/");
            } else {
                setTwoFaError(data.error || "Invalid 2FA code");
            }
        } catch (error) {
            console.error(error);
            setTwoFaError("Server error verifying 2FA");
        }
    };
    
    return (
        <>
            <main>
                <div className='overlay'>
                    <h1 id="homeText">Login</h1>
                    <div className="input_container text-start">
                        <form onSubmit={handleSubmit}>
                            <Input 
                                classnameI="Input" 
                                classnameL="input_label mt-5" 
                                text='Email@email.com' 
                                type="email"  
                                label="email adress" 
                                value={email} 
                                set={setEmail}
                            />
                            <Input 
                                classnameI="Input mb-2"  
                                classnameL="input_label mt-5" 
                                text='Password' 
                                type="password" 
                                label="password" 
                                value={password} 
                                set={setPassword}
                            />
                            
                            {errors && <p className='text-center text-red-500 font-bold'>{errors}</p>}
                            
                            <div className="flex px-2 items-center justify-center gap-10 mt-5">
                                <Button value="buttonP !pl-18 !pr-18" type="submit" text="Sign in"/>
                            </div>
                            
                            <p className="test p-5"> or </p>
                            
                            <div className="flex px-2 items-center justify-center">
                                <Button value="buttonGoogle" immg={googleLogo} text="Sign in with Google" action={loginWithGoogle} />
                            </div>
                            
                            <div className="flex px-2 items-center justify-center gap-10 mt-5">
                                <p style={{color: '#7972A3'}}> Need an account? <Link className="underline register" to="/Register">Register</Link> </p>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            {show2FA && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50 transition-opacity">
                    <div className="input_container text-center w-full max-w-sm mx-4 p-8 !border-[3px] !border-[#4D007E] !rounded-lg">
                        <h2 className="!pt-0" style={{ color: '#4D007E', marginTop: 0 }}>Two-Factor Auth</h2>
                        <p style={{ color: '#58508D', marginBottom: '25px', fontWeight: 'bold' }}>
                            Enter your 6-digit code
                        </p>
                        
                        <form onSubmit={handleVerify2FA} className="flex flex-col items-center">
                            <Input 
                                classnameI="Input mb-2"  
                                classnameL="input_label mt-5"                                 text='000000' 
                                type="text" 
                                label="2FA Code" 
                                value={twoFaCode} 
                                set={setTwoFaCode} 
                            />
                            
                            {twoFaError && <p className="text-red-500 mt-2 font-bold">{twoFaError}</p>}
                            
                            <div className="flex justify-between items-center w-full px-2 mt-8">
                                <button 
                                    type="button" 
                                    onClick={() => setShow2FA(false)} 
                                    className="register cursor-pointer bg-transparent border-none p-2"
                                >
                                    Cancel
                                </button>
                                <Button value="buttonP !pl-8 !pr-8" type="submit" text="Verify"/>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Login;