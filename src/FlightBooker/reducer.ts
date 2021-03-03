import { validate, formatDate } from "./helpers";
import { ReducerValues, InitialInputStateValues } from "./types";

export const initialInputState: InitialInputStateValues = {
	value: "",
	valid: true,
	date: null,
};

export const initState = {
	flightType: "one-way",
	dateStart: initialInputState,
	dateEnd: initialInputState,
	canBook: false,
};

export const reducer = (prev: any, { type, ...data }: ReducerValues) => {
	const state = { ...prev };

	switch (type) {
		case "updateDate":
			for (const key in data) {
				if (["dateStart", "dateEnd"].includes(key)) {
					const valid = validate(data[key]?.value);

					let date = null;

					if (valid) {
						date = formatDate(data[key].value);
					}

					data[key].date = date;
					data[key].valid = valid;
				}
			}

		case "update":
			Object.assign(state, data);

			let ok = false;
			if (state.flightType === "return") {
				if (state.dateStart.date && state.dateEnd.date) {
					const dateStartTimestamp = state.dateStart.date.getTime();
					const dateEndTimestamp = state.dateEnd.date.getTime();

					if (dateEndTimestamp >= dateStartTimestamp) {
						ok = true;
					}
				}
			} else {
				if (state.dateStart.date) {
					ok = true;
				}
			}

			state.canBook = ok;
			break;

		default:
			throw new Error("Dispatch type doesn't exist!");
	}

	return state;
};
