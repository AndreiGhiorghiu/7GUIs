const initializeState = (columns: string | any[], rows: number): {}[] => {
	const newState = [];
	for (let indexR = 0; indexR <= rows; indexR++) {
		newState[indexR] = {};
		for (let indexC = 0; indexC < columns.length; indexC++) {
			if (columns[indexC].trim()) {
				newState[indexR][columns[indexC]] = {
					value: "",
					formattedData: "",
					colKey: columns[indexC],
					rowKey: indexR,
				};
			}
		}
	}

	return newState;
};

const findColumnValue = (state, id) => {
	const rowId = id.match(/[0-9]{1,}/)?.[0];
	const colId = id.toLowerCase().match(/[a-z]{1,}/)?.[0];

	return state?.[rowId]?.[colId]?.formattedData;
};

const getResult = (type, data) => {
	if (!type) return "Error";

	switch (type.toLowerCase()) {
		case "sum":
			return data.map(parseFloat).reduce((total, value) => total + value, 0);
		case "sub":
			return data.map(parseFloat).reduce((total, value) => total - value, 0);

		default:
			return "Error";
	}
};

const updateAllValues = (state) => {
	for (const rowData of state) {
		for (const letter in rowData) {
			const column = rowData[letter];

			if (column.value) {
				const values = column.value.match(/\((.*?)\)/);
				const functionName = column.value.match(/(\S+)(\()/)?.[1];

				if (values) {
					const dataColumnsIds = values[1].split(",");
					const dataValues = dataColumnsIds.map((id) =>
						findColumnValue(state, id)
					);

					column.formattedData = getResult(functionName, dataValues);
				}
			}
		}
	}

	return state;
};
export { updateAllValues, getResult, findColumnValue, initializeState };
