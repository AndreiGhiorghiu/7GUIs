import React, { useState } from "react";

const Counter = () => {
	const [count, setCount] = useState(0);

	return (
		<div>
			<input type="text" value={count} readOnly={true} />
			<button onClick={() => setCount(count + 1)}>Count</button>
		</div>
	);
};

export default Counter;
