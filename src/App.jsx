
<<<<<<< HEAD
import {BrowserRouter, Routes, Route, Link, Navigate, useParams, generatePath} from "react-router-dom";
import Header from "./components/Header";
import Head from "./components/Head";
import Footer from "./components/Footer";
=======
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import { useState } from 'react';

import Header from "./components/Header";
import Head from "./components/Head";
import Footer from "./components/Footer";

>>>>>>> front-test
import Home from "./pages/Home";
import Game from "./pages/Game";
import PrivatePolicy from "./pages/PrivatePolicy";
import TermsOfService from "./pages/TermsOfService";
import Login from "./pages/Login";
import Register from "./pages/Register";
<<<<<<< HEAD
import Drawing from "./pages/Drawing";
import Matchmaking from "./pages/Matchmaking";
import Lobby from "./pages/Lobby";
import Results from "./pages/Results";
import E404 from "./pages/404";

import Layout from "./components/Layout";
import Loading from "./components/Loading";

import { useState } from 'react';

//import About from "./pages/About";

// const [isLoggedIn, setIsLoggedIn] = useState(false);


function App() {

  return (
	<div className="app">

		<BrowserRouter>

			<Head />
			{/* <Loading/> */}

			<Layout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/Game" element={<Game />} />
					<Route path="/PrivatePolicy" element={<PrivatePolicy />} />
					<Route path="/TermsOfService" element={<TermsOfService />}/>
					<Route path="/Login" element={<Login/>}/>
					{/* <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn}/>}/> */}
					<Route path="/Register" element={<Register/>}/>
					<Route path="/Drawing/:gameID" element={<Drawing />} />
					<Route path="/Matchmaking/:gameID" element={<Matchmaking />} />
					<Route path="/Lobby/:gameID" element={<Lobby />} />
					<Route path="/Results/:gameID" element={<Results />} />
					<Route path="/404" element={<E404 />} />
				</Routes>
			</Layout>



		</BrowserRouter>

=======
				
import ProtectedRoute from "./pages/ProtectedRoute";
import E404 from "./pages/404";
//import About from "./pages/About";


function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(() => { return !!localStorage.getItem("token");});
	
  	return (
	<div className="app">
		<BrowserRouter>
			<Head />
			{isLoggedIn && <Header setIsLoggedIn={setIsLoggedIn} />}
			<Routes>
				<Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
				<Route path="/Register" element={<Register />}/>
				<Route path="/" element={<ProtectedRoute isLoggedIn={isLoggedIn}> <Home /> </ProtectedRoute>}  />
				<Route path="/Game" element={<ProtectedRoute isLoggedIn={isLoggedIn}> <Game /> </ProtectedRoute>} />
				<Route path="/PrivatePolicy" element={<PrivatePolicy />} />
				<Route path="/TermsOfService" element={<TermsOfService />}/> 
				<Route path="*" element={<E404 />} />
			</Routes>
			<Footer />
		</BrowserRouter>
>>>>>>> front-test
	</div>
	);
}

export default App;