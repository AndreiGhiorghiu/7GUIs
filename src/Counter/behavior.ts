import initial from "./state";
import { useReducer } from "react";

const reducer = (prev: any, data: any) => {
	const state = { ...prev };

	switch (data.type) {
		case "increment":
			state.count++;
			break;
		case "decrement":
			state.count--;
			break;

		default:
			throw new Error(`Action ${data.type} didn't exist!`);
	}

	return state;
};

export default () => {
	const [store, dispatch] = useReducer(reducer, initial);

	const onIncrement = () => {
		dispatch({ type: "increment" });
	};

	const onDecrement = () => {
		dispatch({ type: "decrement" });
	};

	return { ...store, events: { onIncrement, onDecrement } };
};
