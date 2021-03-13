import { useEffect, useReducer } from "react";
import { validate, toDate, fromDate } from "../../helpers";

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
	{ type, value }: { type: string; value?: any | boolean }
) => {
	const state = { ...prev };

	switch (type) {
		case "SET_IS_VALID":
			state.valid = !!value;
			break;

		case "SET_VALUE":
			state.value = value.toString();
			break;

		case "RESET":
			state.value = "";
			break;

		default:
			throw new Error("Action doesn't exist!");
	}

	return state;
};

export default (date: Date, onChange: (arg: Date) => void) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		if (date) {
			formatInput(date);
		} else {
			reset();
		}
	}, [date]);

	const formatInput = (value: Date) => {
		dispatch({ type: "SET_IS_VALID", value: true });
		dispatch({ type: "SET_VALUE", value: fromDate(value) });
	};

	const changeDate = (value: string) => {
		const isValid = validate(value);

		dispatch({ type: "SET_IS_VALID", value: isValid });
		dispatch({ type: "SET_VALUE", value: value });

		if (isValid) {
			const date = toDate(value);

			onChange(date);
		}
	};

	const reset = () => {
		dispatch({ type: "RESET" });
	};

	return {
		...state,
		events: {
			formatInput,
			reset,
			changeDate,
		},
	};
};
