import React, { useReducer } from "react";
import useController from "./controller";

const MessagesBox = ({ messages }) => {
	return messages.map((message, index) => <p key={index}>{message}</p>);
};

export default () => {
	const [state, dispatch] = useController();
	const { messages, currentMessage } = state;

	const onSendMessage = () => {
		dispatch({ type: "SEND" });
	};

	const onChangeMessage = (e) => {
		dispatch({ type: "CHANGE_TEXT", value: e.target.value });
	};

	return (
		<>
			<h2>Player 1</h2>
			<div>
				<MessagesBox messages={messages} />
			</div>

			<input type="text" value={currentMessage} onChange={onChangeMessage} />
			<button onClick={onSendMessage}>Send</button>
		</>
	);
};
