import { useReducer } from "react";
import { getValueByFormula, updateDependencies } from "./helpers";

interface State {
	cols: string;
	rows: number;
	active: string;
	data: Map<string, { formula: string; value: string }>;
}

const initialState: State = {
	cols: " abcdefghijklmnopqrstuvwxyz",
	rows: 99,
	active: "",
	data: new Map(),
};

function reducer(
	prev: State,
	{ type, value }: { type: string; [key: string]: any }
) {
	const state = { ...prev };

	switch (type) {
		case "SET_ACTIVE_CELL":
			state.active = value;
			break;

		case "SET_CELL_FORMULA":
			if (!value.formula) {
				state.data.delete(value.id);
				state.active = "";
				break;
			}

			state.data.set(
				value.id,
				state.data.get(value.id) || {
					formula: "",
					value: "",
				}
			);

			const cell = state.data.get(value.id) || {
				formula: "",
				value: "",
			};

			cell.formula = value.formula;
			cell.value = getValueByFormula(value.formula, state.data);

			updateDependencies(state.active, state.data);

			state.active = "";
			break;

		default:
			throw new Error(`Action ${type} doesn't exist!`);
	}

	return state;
}

export default () => useReducer(reducer, initialState);
