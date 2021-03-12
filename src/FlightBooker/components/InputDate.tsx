import React, { useEffect, useReducer } from "react";
import $ from "../style.module.css";
import { validate, toDate, fromDate } from "../helpers";

interface InputDateProps {
	value: Date;
	onChange: (arg: Date | null) => void;
	disable?: boolean;
}

interface InputState {
	valid: boolean;
	value: string;
}

const initialState = {
	value: "",
	valid: true,
};

const reducer = (
	prev: InputState,
	{ type, value }: { type: string; value: string | boolean }
) => {
	const state = { ...prev };

	switch (type) {
		case "SET_IS_VALID":
			state.valid = !!value;
			break;

		case "SET_VALUE":
			state.value = value.toString();
			break;

		default:
			throw new Error("Action doesn't exist!");
	}

	return state;
};

let sendInvalid = false;

const InputDate = ({ value, onChange, disable = false }: InputDateProps) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { value: formattedValue, valid } = state;

	useEffect(() => {
		if (value) {
			dispatch({ type: "SET_IS_VALID", value: true });
			dispatch({ type: "SET_VALUE", value: fromDate(value) });
		}
	}, [value]);

	const CHANGE_DATE = (val: string) => {
		const isValid = validate(val);

		dispatch({ type: "SET_IS_VALID", value: isValid });
		dispatch({ type: "SET_VALUE", value: val });

		if (isValid) {
			sendInvalid = true;
			const date = toDate(val);

			onChange(date);
		} else {
			if (sendInvalid) {
				onChange(null);
			}
		}
	};

	return (
		<input
			className={`${$.item} ${(!valid && $.itemError) || ""}`}
			value={formattedValue}
			type="text"
			placeholder="dd.mm.yyyy"
			disabled={disable}
			onChange={(e) => {
				CHANGE_DATE(e.target.value);
			}}
		/>
	);
};

export default InputDate;
