
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";

import Header from "./components/Header";
import Head from "./components/Head";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Game from "./pages/Game";
import PrivatePolicy from "./pages/PrivatePolicy";
import TermsOfService from "./pages/TermsOfService";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Drawing from "./pages/Drawing";
// import Loading from "./pages/Loading";
import { useState } from 'react';
				
//import About from "./pages/About";

// const [isLoggedIn, setIsLoggedIn] = useState(false);

function App() {
	
  return (
	<div className="app">

		<BrowserRouter>

			<Head />
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/Game" element={<Game />} />
				<Route path="/PrivatePolicy" element={<PrivatePolicy />} />
				<Route path="/TermsOfService" element={<TermsOfService />}/> 
				<Route path="/Login" element={<Login/>}/>
				{/* <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn}/>}/> */}
				<Route path="/Register" element={<Register/>}/>
				<Route path="/Drawing" element={<Drawing />} />
				{/* <Route path="/Loading" element={<Loading />} /> */}
			</Routes>
			<Footer />
			
		</BrowserRouter>
	</div>
	);
}

export default App;