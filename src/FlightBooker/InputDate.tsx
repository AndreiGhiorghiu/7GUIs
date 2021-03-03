import React from "react";
import $ from "./style.module.css";
import { InitialInputStateValues } from "./types";

interface InputDateProps {
	data: InitialInputStateValues;
	onChange: (arg: InitialInputStateValues) => void;
	disabled: boolean;
}

const InputDate = ({ data, onChange, disabled }: InputDateProps) => {
	return (
		<input
			className={`${$.item} ${(!data.valid && $.itemError) || ""}`}
			value={data.value}
			type="text"
			placeholder="dd.mm.yyyy"
			disabled={disabled}
			onChange={(e) => {
				const value = e.target.value;

				onChange({ ...data, value });
			}}
		/>
	);
};

export default InputDate;
