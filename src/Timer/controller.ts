import { useReducer } from "react";
import { StateValues, ReducerValues } from "./types";

const initialState: StateValues = {
	seconds: 0,
	percent: 0,
};

const reducer = (prev: StateValues, { type, value }: ReducerValues) => {
	const state = { ...prev };

	switch (type) {
		case "SET_SECONDS":
			state.seconds = value;
			state.percent = 0;
			break;

		case "UPDATE_PERCENT":
			state.percent = value;
			break;

		default:
			throw new Error(`Action ${type}: doesn't exist!`);
	}

	return state;
};

export default () => useReducer(reducer, initialState);
