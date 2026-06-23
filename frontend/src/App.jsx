
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { useEffect, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Header from "./components/Header";
import Head from "./components/Head";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import Loading from "./components/Loading";
import Home from "./pages/Home";
import Game from "./pages/Game";
import PrivatePolicy from "./pages/PrivatePolicy";
import TermsOfService from "./pages/TermsOfService";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Drawing from "./pages/Drawing";
import Matchmaking from "./pages/Matchmaking";
import Lobby from "./pages/Lobby";
import Results from "./pages/Results";
import ProtectedRoute from "./pages/ProtectedRoute";
import E404 from "./pages/404";
import Settings from "./pages/Settings";
import Friends from "./pages/Friends"
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
//import About from "./pages/About";


function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [authReady, setAuthReady] = useState(false);

	useEffect(() => {
		const validateAuth = async () => {
			try {
				const response = await fetch('/api/users/profile', { credentials: 'include', });
				if (response.ok) {
					setIsLoggedIn(true);
				} else {
					localStorage.removeItem('token');
					setIsLoggedIn(false);
				}
			} catch (error) {
				console.error('Failed to validate auth token', error);
				setIsLoggedIn(false);
			} finally {
				setAuthReady(true);
			}
		};

		validateAuth();
	}, []);

	if (!authReady) {
		return (
			<div className="app min-h-screen flex items-center justify-center">
				<p>Checking session...</p>
			</div>
		);
	}
	
  	return (
	<GoogleOAuthProvider clientId="496213748350-bq85hc6fl5i2msfvq4817r9939010tqh.apps.googleusercontent.com">
		<div className="app">
			<BrowserRouter>
			<Head />
			<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
				<Routes>
					<Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
					<Route path="/Register" element={<Register />}/>
					<Route path="/" element={<ProtectedRoute isLoggedIn={isLoggedIn}> <Home /> </ProtectedRoute>}  />
					<Route path="/Game" element={<ProtectedRoute isLoggedIn={isLoggedIn}> <Game /> </ProtectedRoute>} />
					<Route path="/PrivatePolicy" element={<PrivatePolicy />} />
					<Route path="/TermsOfService" element={<TermsOfService />}/> 
					<Route path="/Drawing/:gameID" element={<ProtectedRoute isLoggedIn={isLoggedIn}> <Drawing /> </ProtectedRoute>} />
					<Route path="/Matchmaking/:gameID" element={<ProtectedRoute isLoggedIn={isLoggedIn}> <Matchmaking /> </ProtectedRoute>}/>
					<Route path="/Lobby/:gameID" element={<ProtectedRoute isLoggedIn={isLoggedIn}> <Lobby /> </ProtectedRoute>} />
					<Route path="/Results/:gameID" element={<ProtectedRoute isLoggedIn={isLoggedIn}> <Results/> </ProtectedRoute>}/>
					<Route path="/Settings" element={<ProtectedRoute isLoggedIn={isLoggedIn}> <Settings /> </ProtectedRoute>} />
					<Route path="/Friends" element={<ProtectedRoute isLoggedIn={isLoggedIn}> <Friends /> </ProtectedRoute>} />
					<Route path="/Messages/:friendId" element={<ProtectedRoute isLoggedIn={isLoggedIn}> <Messages /> </ProtectedRoute>} />
					<Route path="/Profile/:id" element={<ProtectedRoute isLoggedIn={isLoggedIn}> <Profile /> </ProtectedRoute>} />
					<Route path="*" element={<E404 />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	</div>
	</GoogleOAuthProvider>
	);
}
export default App;