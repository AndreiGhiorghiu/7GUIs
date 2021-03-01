import React, { useEffect, useRef, useState } from "react";
import $ from "./style.module.css";
import InputDate from "./InputDate";
import Select from "./Select";

const initialInputState = {
	value: "",
	valid: true,
	date: null,
};

const FlightBooker = () => {
	const [state, setState] = useState({
		flightType: "one-way",
		dateStart: initialInputState,
		dateEnd: initialInputState,
		canBook: false,
	});

	const { flightType, dateStart, dateEnd, canBook } = state;

	const set = (newState) => {
		setState((prev) => ({ ...prev, ...newState }));
	};

	useEffect(() => {
		let ok = false;

		if (flightType === "return") {
			if (dateStart.date && dateEnd.date) {
				const dateStartTimestamp = dateStart.date.getTime();
				const dateEndTimestamp = dateEnd.date.getTime();

				if (dateEndTimestamp >= dateStartTimestamp) {
					ok = true;
				}
			}
		} else {
			if (dateStart.date) {
				ok = true;
			}
		}

		set({ canBook: ok });
	}, [dateStart, dateEnd]);

	return (
		<div className={$.container}>
			<Select
				value={flightType}
				onChange={(value) =>
					set({
						flightType: value,
						dateStart: initialInputState,
						dateEnd: initialInputState,
					})
				}
			/>

			<InputDate
				data={dateStart}
				onChange={(value) => set({ dateStart: value })}
				disabled={false}
			/>
			<InputDate
				data={dateEnd}
				onChange={(value) => set({ dateEnd: value })}
				disabled={flightType !== "return"}
			/>

			<button className={$.item} disabled={!canBook}>
				Book
			</button>
		</div>
	);
};

export default FlightBooker;
