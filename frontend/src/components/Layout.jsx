import { useLocation } from 'react-router-dom';
import Header from "./Header";
import Head from "./Head";
import Footer from "./Footer";

const Layout = ({ children, isLoggedIn, setIsLoggedIn }) => {
	const location = useLocation();
	const hideHeaderFooter = location.pathname.startsWith('/drawing/');

	return (
		<>
		{!hideHeaderFooter && isLoggedIn && <Header setIsLoggedIn={setIsLoggedIn} />}
		{children}
		{!hideHeaderFooter && <Footer />}
		</>
	);
};

export default Layout