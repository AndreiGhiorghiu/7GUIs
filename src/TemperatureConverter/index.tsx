import React, { useState } from "react";
import $ from "./style.module.css";

const Input = ({ value, onChange, label }) => {
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

const TemperatureConverter = () => {
	const [tc, setTc] = useState(0);
	const [tf, setTf] = useState(() => tc * (9 / 5) + 32);

	const handleChangeTC = (value) => {
		setTc(value);
		setTf(value * (9 / 5) + 32);
	};

	const handleChangeTF = (value) => {
		setTf(value);
		setTc((value - 32) * (5 / 9));
	};

	return (
		<div className={$.container}>
			<Input
				value={tc}
				onChange={(val) => handleChangeTC(val)}
				label={"Celsius"}
			/>
			<span>=</span>
			<Input
				value={tf}
				onChange={(val) => handleChangeTF(val)}
				label={"Fahrenheit"}
			/>
		</div>
	);
};

export default TemperatureConverter;
