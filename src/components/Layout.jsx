import { useLocation } from 'react-router-dom';
import Header from "./Header";
import Head from "./Head";
import Footer from "./Footer";

const Layout = ({ children }) => {
	const location = useLocation();
	const hideHeaderFooter = location.pathname === '/drawing';

	return (
		<>
		{!hideHeaderFooter && <Header />}
		{children}
		{!hideHeaderFooter && <Footer />}
		</>
	);
};

export default Layout