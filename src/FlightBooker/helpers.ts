export const validate = (value: string) => {
	const regexExpression = /^([0-9]{2}\.[0-9]{2}\.[0-9]{4})$/;

	if (regexExpression.test(value)) return true;

	return false;
};

export const formatDate = (dateString: string) => {
	const dateStartObject = dateString.split(".").map((nr) => parseInt(nr));

	const dateStartFormatted = new Date(
		dateStartObject[2],
		dateStartObject[1] - 1,
		dateStartObject[0]
	);

	return dateStartFormatted;
};
