import React from "react";

<<<<<<< HEAD
function Input({text, type, value, set})
{
	return (
		<div>
		<label className="input_label mt-5">
			{type} :
			<input className='input' type={type} value={value} placeholder={text} onChange={e =>set(e.target.value)}/> 
=======
function Input({classnameI, classnameL, text, type, value, set})
{
	return (
		<div>
		<label className={classnameL}>
			{type}
			<input className={classnameI} type={type} value={value} placeholder={text} onChange={e =>set(e.target.value)}/> 
>>>>>>> front-test
		</label>
		</div>
	)
}

export default Input;