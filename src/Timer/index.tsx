import React, { useEffect, useReducer } from "react";
import $ from "./style.module.css";
import { initialState, reducer } from "./reducer";

let progressInterval: any = null;

const Timer = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const { seconds, percent } = state;

	useEffect(() => {
		RESET();
	}, []);

	const UPDATE_SECONDS = (value: number) => {
		dispatch({ type: "update_seconds", value });
	};

	const UPDATE_PERCENT = (value: number) => {
		dispatch({ type: "update_percent", value });
	};

	const RESET = () => {
		let currentSecond = 0;

		if (progressInterval) {
			clearInterval(progressInterval);
		}

		progressInterval = setInterval(() => {
			const newPercent = (currentSecond * 100) / seconds;
			currentSecond += 0.1;

			UPDATE_PERCENT(newPercent);

			if (currentSecond > seconds) {
				currentSecond = 0;
				clearInterval(progressInterval);
			}
		}, 100);
	};

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
					<input
						type="range"
						value={seconds}
						onChange={(e) => {
							UPDATE_SECONDS(parseFloat(e.target.value));
							RESET();
						}}
					/>
				</div>
			</div>

			<button onClick={() => RESET()}>Reset</button>
		</div>
	);
};

export default Timer;
