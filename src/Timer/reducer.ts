import { StateValues, ReducerValues } from "./types";

export const initialState: StateValues = {
	seconds: 0,
	percent: 0,
};

export const reducer = (prev: StateValues, { type, value }: ReducerValues) => {
	const state = { ...prev };

	switch (type) {
		case "update_seconds":
			state.seconds = value;

			break;

		case "update_percent":
			state.percent = value;
			break;
		default:
			throw new Error("Action doesn't exist!");
	}

	return state;
};
