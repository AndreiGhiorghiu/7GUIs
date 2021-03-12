const pad = (n: string, width: number) => {
	return n.length >= width ? n : new Array(width - n.length + 1).join("0") + n;
};

export const validate = (value: string) => {
	const regexExpression = /^([0-9]{2}\.[0-9]{2}\.[0-9]{4})$/;

	if (regexExpression.test(value)) return true;

	return false;
};

export const toDate = (dateString: string) => {
	const dateStartObject = dateString.split(".").map((nr) => parseInt(nr));

	const dateStartFormatted = new Date(
		dateStartObject[2],
		dateStartObject[1] - 1,
		dateStartObject[0]
	);

	return dateStartFormatted;
};

export const fromDate = (dateString: Date) => {
	if (!dateString) {
		return "";
	}

	return [
		pad(dateString.getDate().toString(), 2),
		pad((1 + dateString.getMonth()).toString(), 2),
		pad(dateString.getFullYear().toString(), 4),
	].join(".");
};
