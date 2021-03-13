import React, { BaseSyntheticEvent, useEffect } from "react";
import $ from "./style.module.css";
import useController from "./controller";

let progressInterval: any = null;

const Timer = () => {
	const [state, dispatch] = useController();

	const { seconds, percent } = state;

	useEffect(() => {
		START_TIMER();
	}, []);

	function SET_SECONDS(e: BaseSyntheticEvent) {
		dispatch({ type: "SET_SECONDS", value: parseFloat(e.target.value) });
		START_TIMER();
	}

	function CLEAR_INTERVAL() {
		if (progressInterval) {
			clearInterval(progressInterval);
		}
	}

	function START_TIMER() {
		let currentSecond = 0;

		CLEAR_INTERVAL();

		progressInterval = setInterval(() => {
			const newPercent = (currentSecond * 100) / seconds;
			currentSecond += 0.1;

			dispatch({ type: "UPDATE_PERCENT", value: newPercent });

			if (currentSecond > seconds) {
				currentSecond = 0;

				CLEAR_INTERVAL();
			}
		}, 100);
	}

	return (
		<div className={$.container}>
			<div className={$.formItem}>
				<span>Elapsed Time:</span>
				<div className={$.progress}>
					<div style={{ width: `${percent}%` }} className={$.progressBar}></div>
				</div>
			</div>
			<div className={$.formItem}>
				<span>{seconds}s</span>
			</div>
			<div className={$.formItem}>
				<span>Duration:</span>
				<div>
					<input type="range" value={seconds} onChange={SET_SECONDS} />
				</div>
			</div>

			<button onClick={START_TIMER}>Reset</button>
		</div>
	);
};

export default Timer;
