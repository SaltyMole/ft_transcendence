import React from "react";

function Input({text, type, value, set})
{
	return (
		<div>
		<label className="input_label mt-5">
			{type} :
			<input className='input' type={type} value={value} placeholder={text} onChange={e =>set(e.target.value)}/> 
		</label>
		</div>
	)
}

export default Input;