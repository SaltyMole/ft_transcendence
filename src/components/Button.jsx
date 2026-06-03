import React from "react";
import { useNavigate} from "react-router-dom";

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
}

export default Button;