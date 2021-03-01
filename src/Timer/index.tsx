import React, { useEffect, useState } from "react";
import $ from "./style.module.css";

const Timer = () => {
	const [seconds, setSeconds] = useState(5);
	const [percent, setPercent] = useState(0);
	const [reset, setReset] = useState(false);

	useEffect(() => {
		if (reset !== true) return;
		let currentSecond = 0;
		const progressInterval = setInterval(() => {
			const percentTmp = (currentSecond * 100) / seconds;
			currentSecond += 0.1;

			setPercent(percentTmp);
			if (currentSecond > seconds) {
				currentSecond = 0;
				clearInterval(progressInterval);
			}
		}, 100);
		setReset(false);
	}, [reset]);

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
						onChange={(e) => setSeconds(e.target.value)}
					/>
				</div>
			</div>

			<button onClick={() => setReset(true)}>Reset</button>
		</div>
	);
};

export default Timer;
