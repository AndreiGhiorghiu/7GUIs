import React, { useEffect } from "react";
import $ from "../../style.module.css";
import useBehavior from "./behavior";

interface InputDateProps {
	value: Date;
	onChange: (arg: Date | null) => void;
	disable?: boolean;
}

const InputDate = ({ value, onChange, disable = false }: InputDateProps) => {
	const { events, value: date, valid } = useBehavior(value, onChange);

	return (
		<input
			className={`${$.item} ${(!valid && $.itemError) || ""}`}
			value={date}
			type="text"
			placeholder="dd.mm.yyyy"
			disabled={disable}
			onChange={(e) => {
				console.log("change");

				events.changeDate(e.target.value);
			}}
		/>
	);
};

export default InputDate;
