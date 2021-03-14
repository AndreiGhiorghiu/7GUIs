import React from "react";
import useController from "./controller";
import $ from "./style.module.css";
import Cell from "./components/Cell";

const containerWidth = 1900;

function Cells(): JSX.Element {
	const [state, dispatch] = useController();
	const { rows, cols, active, data } = state;

	function onDBClick(id: string) {
		dispatch({ type: "SET_ACTIVE_CELL", value: id });
	}

	function onFinish(data: { id: string; formula: string }) {
		dispatch({ type: "SET_CELL_FORMULA", value: data });
	}

	function renderCols() {
		const colsHtml = [];
		const style = {
			width: `${containerWidth / cols.length - 1}px`,
			height: "30px",
		};

		for (let indexRow = -1; indexRow < rows + 1; indexRow++) {
			for (let indexCol = 0; indexCol < cols.length - 1; indexCol++) {
				const cellId = `${cols[indexCol + 1]}${indexRow}`;

				if (indexCol === 0) {
					colsHtml.push(
						<div
							key={`rowindex${indexRow}-${indexCol}`}
							style={{ width: "50px" }}
						>
							{indexRow !== -1 ? indexRow : ""}
						</div>
					);
				}

				if (indexRow === -1) {
					colsHtml.push(
						<div
							className={$.headerCell}
							key={`header${indexRow}-${indexCol}`}
							style={style}
						>
							{cols[indexCol + 1]}
						</div>
					);
				} else {
					colsHtml.push(
						<Cell
							key={cellId}
							style={style}
							id={cellId}
							onDBClick={onDBClick}
							onFinish={onFinish}
							active={active === cellId}
							value={(data.has(cellId) && data.get(cellId)?.value) || ""}
						/>
					);
				}
			}
		}

		return colsHtml;
	}

	return (
		<div className={$.scrollableContainer}>
			<div style={{ width: `${containerWidth}px` }} className={$.container}>
				{renderCols()}
			</div>
		</div>
	);
}

export default Cells;
