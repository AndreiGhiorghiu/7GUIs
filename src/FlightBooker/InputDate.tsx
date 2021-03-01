import React from "react";
import $ from "./style.module.css";

const InputDate = ({ data, onChange, disabled }) => {
	const validate = (value) => {
		const regexExpression = /^([0-9]{2}\.[0-9]{2}\.[0-9]{4})$/;

		if (regexExpression.test(value)) return true;

		return false;
	};

	const formatDate = (dateString) => {
		const dateStartObject = dateString.split(".").map((nr) => parseInt(nr));

		const dateStartFormatted = new Date(
			dateStartObject[2],
			dateStartObject[1] - 1,
			dateStartObject[0]
		);

		return dateStartFormatted;
	};

	return (
		<input
			className={`${$.item} ${(!data.valid && $.itemError) || ""}`}
			value={data.value}
			type="text"
			placeholder="dd.mm.yyyy"
			disabled={disabled}
			onChange={(e) => {
				const value = e.target.value;
				const valid = validate(value);

				let date = null;

				if (valid) {
					date = formatDate(value);
				}

				onChange({ value, valid, date });
			}}
		/>
	);
};

export default InputDate;
