import { useReducer } from "react";

export const initialStore = {
	messages: ["test1"],
	currentMessage: "",
};

export const reducer = (
	prev = initialStore,
	{ type, value }: { type: string; value?: any }
) => {
	console.log({ prev });
	const state = { ...prev };

	switch (type) {
		case "RECEIVE_MESSAGE":
			state.messages.push(value);
			break;

		case "SEND":
			//??
			break;

		case "CHANGE_TEXT":
			state.currentMessage = value;
			break;
	}

	return state;
};

export default () => useReducer(reducer, initialStore);
