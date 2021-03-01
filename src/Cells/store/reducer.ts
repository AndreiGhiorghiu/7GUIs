import { updateAllValues } from "../helpers";

export default function reducer(
	previous: any,
	{ type, data, identifier }: any
) {
	const state = { ...previous };

	switch (type) {
		case "updateCol":
			const { row, col } = identifier;
			const colData = state.data[row][col];

			state.data[row][col] = { ...colData, ...data };
			state.data = updateAllValues(state.data);

			break;

		case "setActive":
			state.active = identifier;
			break;

		default:
			throw Error(`Action ${type} not found.`);
	}

	return state;
}
