import React from "react";
import { useNavigate} from "react-router-dom";

function Button({type, text, link, value, immg})
{
	const navigate = useNavigate();

	if(immg)
		return <button className={value} type={type} onClick={()=>navigate(link)}> <img src={immg}/> {text}  </button>
	return <button className={value} type={type} onClick={()=>navigate(link)}> {text}  </button>	
}

export default Button;