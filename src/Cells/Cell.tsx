import React, { useRef } from "react";
import $ from "./style.module.css";
import { useStore } from "./store";

const Cell = ({ identifier }): JSX.Element => {
	const [state, dispatch] = useStore();
	const data = state.data[identifier.row][identifier.col];
	const { active } = state;
	const inputRef = useRef();

	const setState = (value): void => {
		dispatch({
			type: "updateCol",
			data: value,
			identifier,
		});
	};

	const isActive = () => {
		if (active?.row === identifier.row && active?.col === identifier.col) {
			return true;
		}

		return false;
	};

	const content = (): JSX.Element => {
		if (isActive()) {
			return (
				<input
					ref={inputRef}
					className={$.input}
					onClick={(e) => e.stopPropagation()}
					value={data.value}
					onChange={(e) =>
						setState({ value: e.target.value, formattedData: e.target.value })
					}
				/>
			);
		}

		return <span>{data.formattedData}</span>;
	};

	return (
		<div
			onClick={() => {
				dispatch({ type: "setActive", identifier });

				setTimeout(() => {
					inputRef.current.focus();
				}, 50);
			}}
		>
			{content()}
		</div>
	);
};

export default Cell;
