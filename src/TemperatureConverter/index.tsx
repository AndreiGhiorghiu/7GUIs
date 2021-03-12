import React, { useState } from "react";
import $ from "./style.module.css";

interface InputProps {
	value: number;
	onChange: (value: string) => void;
	label: string;
}

const Input = ({ value, onChange, label }: InputProps): JSX.Element => {
	return (
		<div className={$.item}>
			<label>{label}</label>
			<input
				type="number"
				value={value}
				step={0.01}
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	);
};

const TemperatureConverter = (): JSX.Element => {
	const [tc, setTc] = useState(0);
	const [tf, setTf] = useState(() => tc * (9 / 5) + 32);

	const CHANGE_TC = (value: number) => {
		setTc(value);
		setTf(value * (9 / 5) + 32);
	};

	const CHANGE_TF = (value: number) => {
		setTf(value);
		setTc((value - 32) * (5 / 9));
	};

	return (
		<div className={$.container}>
			<Input
				value={tc}
				onChange={(val) => CHANGE_TC(parseFloat(val))}
				label={"Celsius"}
			/>
			<span>=</span>
			<Input
				value={tf}
				onChange={(val) => CHANGE_TF(parseFloat(val))}
				label={"Fahrenheit"}
			/>
		</div>
	);
};

export default TemperatureConverter;
