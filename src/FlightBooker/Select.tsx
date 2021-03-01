import React from "react";
import $ from "./style.module.css";

const Select = ({ value, onChange }) => {
	return (
		<select
			className={$.item}
			value={value}
			onChange={(e) => onChange(e.target.value)}
		>
			<option value="one-way">one-way flight</option>
			<option value="return">return flight</option>
		</select>
	);
};

export default Select;
