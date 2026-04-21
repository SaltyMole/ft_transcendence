
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";

import Header from "./components/Header";
import Head from "./components/Head";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Game from "./pages/Game";
import PrivatePolicy from "./pages/PrivatePolicy";
import TermsOfService from "./pages/TermsOfService";
				
//import About from "./pages/About";

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
			</Routes>
			<Footer />
		</BrowserRouter>
	</div>
	);
}

export default App