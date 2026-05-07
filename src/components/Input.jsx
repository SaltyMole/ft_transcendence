import React from "react";

function Input({classnameI, classnameL, text, type, value, set})
{
	return (
		<div>
		<label className={classnameL}>
			{type} 
			<input className={classnameI} type={type} value={value} placeholder={text} onChange={e =>set(e.target.value)}/> 
		</label>
		</div>
	)
}

export default Input;