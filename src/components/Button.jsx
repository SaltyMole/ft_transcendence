import React from "react";
import { useNavigate} from "react-router-dom";

function Button({type, text, link, value})
{
	const navigate = useNavigate();

	return <button className={value} type={type} onClick={()=>navigate(link)}> {text} </button>
}

export default Button;