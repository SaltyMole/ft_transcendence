import React from "react";
import { useNavigate} from "react-router-dom";

<<<<<<< HEAD
function Button({type, text, link, value})
{
	const navigate = useNavigate();

	return <button className={value} type={type} onClick={()=>navigate(link)}> {text} </button>
=======
function Button({type, text, link, value, immg, action})
{
	const navigate = useNavigate();

	const handleClick = () => {
		if (action)
			action();
		else if (link)
			navigate(link);
	}

		return <button className={value} type={type || "button"} onClick={handleClick}> {immg && <img src={immg} alt="" />} {text}  </button>
>>>>>>> front-test
}

export default Button;