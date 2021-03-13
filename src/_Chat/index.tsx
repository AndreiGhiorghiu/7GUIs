import React from "react";
import Frame1 from "./Frame1";
import Frame2 from "./Frame2";
import "./style.css";

export default () => {
	return (
		<div className="chat">
			<div>
				<Frame1 />
			</div>
			<div>
				<Frame2 />
			</div>
		</div>
	);
};
