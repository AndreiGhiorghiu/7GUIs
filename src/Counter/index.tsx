import React from "react";
import useBehavior from "./behavior";

const Counter = () => {
	const { events, count } = useBehavior();

	return (
		<div>
			<button onClick={() => events.onDecrement()}>decrement</button>{" "}
			<input type="text" value={count} readOnly={true} />{" "}
			<button onClick={() => events.onIncrement()}>increment</button>
		</div>
	);
};

export default Counter;
