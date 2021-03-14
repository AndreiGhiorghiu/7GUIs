import React, { BaseSyntheticEvent, useRef, useState } from "react";
import $ from "../../style.module.css";

interface Props {
	style: { [key: string]: string };
	id: string;
	onDBClick: (id: string) => void;
	onFinish: (data: { id: string; formula: string }) => void;
	active: boolean;
	value: string;
}

function Cell({ style, id, onDBClick, active, onFinish, value }: Props) {
	const [formula, setFormula] = useState("");
	const inputRef = useRef(null);

	function onDoubleClick() {
		onDBClick(id);
	}

	function onChange(e: BaseSyntheticEvent) {
		setFormula(e.target.value);
	}

	function onPressEnter(e: React.KeyboardEvent) {
		if (e.key === "Enter") {
			onFinish({ id, formula });
		}
	}

	function onFocusLost(e: BaseSyntheticEvent) {
		onFinish({ id, formula });
	}

	function renderContent() {
		if (active) {
			return (
				<input
					ref={inputRef}
					className={$.input}
					type="text"
					value={formula}
					onChange={onChange}
					onKeyDown={onPressEnter}
					onBlur={onFocusLost}
				/>
			);
		}
		return value;
	}

	return (
		<div className={$.cell} style={style} onDoubleClick={onDoubleClick}>
			{renderContent()}
		</div>
	);
}

export default Cell;
