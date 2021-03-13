import React from "react";
import useController from "./controller";
import useControllerPlayer1 from "../Frame1/controller";

const MessagesBox = ({ messages }) => {
	return messages.map((message, index) => <p key={index}>{message}</p>);
};

export default () => {
	const [state, dispatch] = useController();
	const [, dispatchPLayer1] = useControllerPlayer1();
	const { messages, currentMessage } = state;

	const onSendMessage = () => {
		dispatchPLayer1({ type: "ADD_MESSAGE", value: currentMessage });
	};

	const onChangeMessage = (e) => {
		dispatch({ type: "CHANGE_TEXT", value: e.target.value });
	};

	// return null;

	return (
		<>
			<h2>Player 2</h2>
			<div>
				{messages.map((message, index) => (
					<p key={index}>{message}</p>
				))}
			</div>

			<input type="text" value={currentMessage} onChange={onChangeMessage} />
			<button onClick={onSendMessage}>Send</button>
		</>
	);
};
