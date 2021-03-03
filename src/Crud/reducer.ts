import { useReducer } from "react";
import { State, Reducer } from "./types";

const inititialState: State = {
	people: [
		{ name: "Emil", surname: "Hans" },
		{ name: "Tisch", surname: "Roman" },
	],
};

const reducer = (prev: State, { type, ...data }: Reducer): State => {
	const state = { ...prev };

	switch (type) {
		case "CREATE":
			state.people.push(data);

			break;
		case "UPDATE":
			if (state.people[data.index]) {
				state.people[data.index] = { name: data.name, surname: data.surname };
			}

			break;
		case "DELETE":
			state.people.splice(data.index, 1);

			break;

		default:
			throw new Error("Action not found!");
	}

	return state;
};

export function useStore() {
	const [state, dispatch] = useReducer(reducer, inititialState);

	return [state, dispatch];
}
