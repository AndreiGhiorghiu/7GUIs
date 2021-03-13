import { useReducer } from "react";

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
			state.valid = true;
			state.value = "";
			break;

		default:
			throw new Error("Action doesn't exist!");
	}

	return state;
};

export default () => useReducer(reducer, initialState);
