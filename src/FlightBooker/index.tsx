import React, { useReducer } from "react";
import $ from "./style.module.css";
import InputDate from "./InputDate";
import Select from "./Select";
import { StateValues, InitialInputStateValues } from "./types";
import { reducer, initState, initialInputState } from "./reducer";

const FlightBooker = (): JSX.Element => {
	const [state, dispatch] = useReducer(reducer, initState);
	const { flightType, dateStart, dateEnd, canBook } = state;

	const RESET = () => {
		dispatch({
			type: "update",
			dateStart: initialInputState,
			dateEnd: initialInputState,
		});
	};

	const UPDATE = (value: StateValues) => {
		dispatch({
			type: "update",
			...value,
		});
	};

	const UPDATE_DATE = (value: StateValues) => {
		dispatch({
			type: "updateDate",
			...value,
		});
	};

	return (
		<div className={$.container}>
			<Select
				value={flightType}
				onChange={(value: string) => {
					UPDATE({ flightType: value });
					RESET();
				}}
			/>

			<InputDate
				data={dateStart}
				onChange={(value: InitialInputStateValues) =>
					UPDATE_DATE({ dateStart: value })
				}
				disabled={false}
			/>
			<InputDate
				data={dateEnd}
				onChange={(value: InitialInputStateValues) =>
					UPDATE_DATE({ dateEnd: value })
				}
				disabled={flightType !== "return"}
			/>

			<button className={$.item} disabled={!canBook}>
				Book
			</button>
		</div>
	);
};

export default FlightBooker;
