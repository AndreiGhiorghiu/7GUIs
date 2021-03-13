import { useReducer } from "react";
import { ReducerValues } from "./types";

const initState = {
	flightType: "one-way",
	dateStart: null,
	dateEnd: null,
};

const reducer = (prev: any, { type, value }: ReducerValues) => {
	const state = { ...prev };

	switch (type) {
		case "SET_FLIGHT_TYPE":
			state.flightType = value;

			break;
		case "SET_START_DATE":
			state.dateStart = value;

			break;

		case "SET_END_DATE":
			state.dateEnd = value;

			break;

		case "RESET":
			state.dateStart = null;
			state.dateEnd = null;

			break;

		default:
			throw new Error("Action type doesn't exist!");
	}

	return state;
};

export default () => {
	const [state, dispatch] = useReducer(reducer, initState);

	const onChangeFlightType = (value: string) => {
		dispatch({ type: "SET_FLIGHT_TYPE", value });
		dispatch({ type: "RESET" });
	};

	const onChangeStartDate = (value: Date | null) => {
		dispatch({ type: "SET_START_DATE", value });
	};

	const onChangeEndDate = (value: Date | null) => {
		dispatch({ type: "SET_END_DATE", value });
	};

	const canBook = (() => {
		if (state.flightType === "return") {
			if (
				state.dateStart &&
				state.dateEnd &&
				state.dateEnd.getTime() >= state.dateStart.getTime()
			) {
				return true;
			}
		} else {
			if (state.dateStart) {
				return true;
			}
		}
		return false;
	})();

	const disableStartDate = state.flightType !== "return";

	return {
		...state,
		canBook,
		disableStartDate,
		events: {
			onChangeFlightType,
			onChangeStartDate,
			onChangeEndDate,
		},
	};
};
