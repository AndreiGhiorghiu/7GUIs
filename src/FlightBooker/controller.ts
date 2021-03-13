import { useReducer } from "react";
import { ReducerValues } from "./types";

const initState = {
	flightType: "one-way",
	dateStart: null,
	dateEnd: null,
	canBook: false,
	disableEndDate: true,
	invalidDateStart: true,
	invalidDateEnd: true,
};

const reducer = (prev: any, { type, value }: ReducerValues) => {
	const state = { ...prev };

	function canBook() {
		if (state.flightType === "return") {
			if (
				!state.invalidDateStart &&
				!state.invalidDateEnd &&
				state.dateEnd.getTime() >= state.dateStart.getTime()
			) {
				return true;
			}
		} else {
			if (!state.invalidDateStart && state.dateStart) {
				return true;
			}
		}
		return false;
	}

	console.log("aici");

	switch (type) {
		case "SET_FLIGHT_TYPE":
			state.flightType = value;
			state.disableEndDate = state.flightType !== "return";
			state.dateEnd = null;
			state.invalidDateEnd = true;
			break;

		case "SET_START_DATE":
			state.dateStart = value;
			state.invalidDateStart = false;
			break;

		case "SET_END_DATE":
			state.dateEnd = value;
			state.invalidDateEnd = false;
			break;

		case "SET_INVALID_END_DATE":
			state.invalidDateEnd = value;
			break;

		case "SET_INVALID_START_DATE":
			state.invalidDateStart = value;
			break;

		case "RESET":
			state.dateStart = null;
			state.dateEnd = null;
			break;

		default:
			throw new Error(`Action ${type}:  doesn't exist!`);
	}

	state.canBook = canBook();

	return state;
};

export default () => useReducer(reducer, initState);
