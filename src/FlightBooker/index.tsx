import React, { useReducer } from "react";
import $ from "./style.module.css";
import InputDate from "./components/InputDate";
import Select from "./components/Select";
import { reducer, initState } from "./reducer";

const FlightBooker = (): JSX.Element => {
	const [state, dispatch] = useReducer(reducer, initState);
	const { flightType, dateStart, dateEnd } = state;

	const disableStartDate = flightType !== "return";
	const canBook = (() => {
		if (flightType === "return") {
			if (dateStart && dateEnd && dateStart.getTime() >= dateEnd.getTime()) {
				return true;
			}
		} else {
			if (dateStart) {
				return true;
			}
		}
		return false;
	})();

	return (
		<div className={$.container}>
			<Select
				value={flightType}
				onChange={(value: string) =>
					dispatch({ type: "SET_FLIGHT_TYPE", value })
				}
			/>

			<InputDate
				value={dateStart}
				onChange={(value: Date | null) => {
					dispatch({ type: "SET_START_DATE", value });
				}}
			/>
			<InputDate
				value={dateEnd}
				onChange={(value: Date | null) => {
					dispatch({ type: "SET_END_DATE", value });
				}}
				disable={disableStartDate}
			/>

			<button className={$.item} disabled={!canBook}>
				Book
			</button>
		</div>
	);
};

export default FlightBooker;
