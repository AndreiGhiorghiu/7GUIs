import React from "react";
import $ from "./style.module.css";
import InputDate from "./components/InputDate";
import Select from "./components/Select";
import useBehavior from "./behavior";

const FlightBooker = (): JSX.Element => {
	const {
		events,
		flightType,
		dateStart,
		dateEnd,
		canBook,
		disableStartDate,
	} = useBehavior();

	return (
		<div className={$.container}>
			<Select
				value={flightType}
				onChange={(value: string) => events.onChangeFlightType(value)}
			/>

			<InputDate
				value={dateStart}
				onChange={(value: Date | null) => events.onChangeStartDate(value)}
			/>
			<InputDate
				value={dateEnd}
				onChange={(value: Date | null) => events.onChangeEndDate(value)}
				disable={disableStartDate}
			/>

			<button className={$.item} disabled={!canBook}>
				Book
			</button>
		</div>
	);
};

export default FlightBooker;
