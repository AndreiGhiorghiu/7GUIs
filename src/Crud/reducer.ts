import React, { useReducer } from "react";
import { State, Reducer, PersonValues } from "./types";

const inititialState: State = {
	people: [
		{ name: "Emil", surname: "Hans" },
		{ name: "Tisch", surname: "Roman" },
	],
	prefix: "",
	selected: null,
};

const reducer = (prev: State, { type, value }: Reducer): State => {
	const state = { ...prev };

	switch (type) {
		case "SET_PREFIX":
			state.prefix = value;
			break;

		case "CREATE":
			if (!("name" in value) || !("surname" in value)) {
				break;
			}

			state.people = [
				...state.people,
				{
					name: value.name,
					surname: value.surname,
				},
			];

			break;

		case "SELECT":
			state.selected = value;
			break;

		default:
			throw new Error(`Action ${type} not found!`);
	}

	return state;
};

export const useStore = (): [State, React.Dispatch<Reducer>] => {
	const [state, dispatch] = useReducer(reducer, inititialState);

	return [state, dispatch];
};
