import React from "react";
import $ from "./style.module.css";
import InputDate from "./components/InputDate";
import Select from "./components/Select";
import useController from "./controller";

const FlightBooker = (): JSX.Element => {
	const [state, dispatch] = useController();
	const {
		dateStart,
		dateEnd,
		canBook,
		flightType,
		disableEndDate,
		resetInputs,
	} = state;

	function onChangeFlightType(value: string) {
		dispatch({ type: "SET_FLIGHT_TYPE", value });
	}

	function onChangeStartDate(value: Date | null) {
		dispatch({ type: "SET_START_DATE", value });
	}

	function onChangeEndDate(value: Date | null) {
		dispatch({ type: "SET_END_DATE", value });
	}

	function onInvalidDateStart() {
		dispatch({ type: "SET_INVALID_START_DATE", value: true });
	}

	function onInvalidDateEnd() {
		dispatch({ type: "SET_INVALID_END_DATE", value: true });
	}

	return (
		<div className={$.container}>
			<Select value={flightType} onChange={onChangeFlightType} />

			<InputDate
				value={dateStart}
				onChange={onChangeStartDate}
				reset={resetInputs}
				onInvalid={onInvalidDateStart}
			/>
			<InputDate
				value={dateEnd}
				onChange={onChangeEndDate}
				disabled={disableEndDate}
				reset={resetInputs}
				onInvalid={onInvalidDateEnd}
			/>

			<button className={$.item} disabled={!canBook}>
				Book
			</button>
		</div>
	);
};

export default FlightBooker;
