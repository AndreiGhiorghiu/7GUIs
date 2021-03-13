import React, { BaseSyntheticEvent, useEffect } from "react";
import $ from "../../style.module.css";
import useController from "./controller";
import { validate, toDate, fromDate } from "../../helpers";

interface InputDateProps {
	value: Date;
	onChange: (arg: Date | null) => void;
	onInvalid: (args: string) => void;
	disabled?: boolean;
	reset?: boolean;
}

const InputDate = ({
	value,
	onChange,
	onInvalid,
	disabled = false,
}: InputDateProps) => {
	const [state, dispatch] = useController();
	const { valid, value: date } = state;

	useEffect(() => {
		if (value) {
			dispatch({ type: "SET_VALUE", value: fromDate(value) || date });
			dispatch({ type: "SET_IS_VALID", value: true });
		} else {
			dispatch({ type: "RESET" });
		}
	}, [value]);

	const CHANGE_DATE = (e: BaseSyntheticEvent) => {
		const value = e.target.value;
		const isValid = validate(value);

		dispatch({ type: "SET_IS_VALID", value: isValid });
		dispatch({ type: "SET_VALUE", value: value });

		if (isValid) {
			const date = toDate(value);

			onChange(date);
		} else {
			onInvalid(value);
		}
	};

	return (
		<input
			className={`${$.item} ${(!valid && $.itemError) || ""}`}
			value={date}
			type="text"
			placeholder="dd.mm.yyyy"
			disabled={disabled}
			onChange={CHANGE_DATE}
		/>
	);
};

export default InputDate;
