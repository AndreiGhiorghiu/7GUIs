import React from "react";
import $ from "../style.module.css";

interface SelectProps {
	value: string;
	onChange: (arg: string) => void;
}

const Select = ({ value, onChange }: SelectProps) => {
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
