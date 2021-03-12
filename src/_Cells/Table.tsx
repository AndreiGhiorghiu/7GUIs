import React, { useState } from "react";
import $ from "./style.module.css";
import Cell from "./Cell";
import { useStore } from "./store";

const Table = () => {
	const [state] = useStore();
	const { columns, rows } = state;

	const renderColumnIndicator = () => {
		return (
			<div className={`${$.header} ${$.row}`}>
				{columns.split("").map((item) => (
					<div key={item}>{item}</div>
				))}
			</div>
		);
	};

	const renderRowIndicator = () => {
		const rowIndicator = [];
		for (let index = 0; index <= rows; index++) {
			rowIndicator.push(<div key={index}>{index}</div>);
		}

		return <div className={$.rowIndicator}>{rowIndicator}</div>;
	};

	const renderColumns = () => {
		const rowsHtml = [];

		for (let indexR = 0; indexR <= rows; indexR++) {
			const rowHtml = [];
			for (let indexC = 0; indexC < columns.length; indexC++) {
				const key = `${indexR}${columns[indexC]}`;

				if (columns[indexC].trim()) {
					rowHtml.push(
						<Cell
							key={key}
							identifier={{ row: indexR, col: columns[indexC] }}
						/>
					);
				}
			}
			rowsHtml.push(
				<div key={indexR} className={$.row}>
					{rowHtml}
				</div>
			);
		}

		return rowsHtml;
	};

	return (
		<div className={$.container}>
			{renderColumnIndicator()}
			<div className={$.tableBody}>
				{renderRowIndicator()}
				<div className={$.tableData}>{renderColumns()}</div>
			</div>
		</div>
	);
};

export default Table;
