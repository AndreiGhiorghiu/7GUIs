import { ReducerValues } from "./types";

export const initState = {
	flightType: "one-way",
	dateStart: null,
	dateEnd: null,
};

export const reducer = (prev: any, { type, value }: ReducerValues) => {
	const state = { ...prev };

	const next = (ss: string) => {
		switch (ss) {
			case "SET_FLIGHT_TYPE":
				state.flightType = value;

				next("RESET");
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
	};

	next(type);

	return state;
};
