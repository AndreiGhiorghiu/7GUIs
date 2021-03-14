export function getValueByFormula(
	formula: string,
	data: Map<string, { formula: string; value: string }>
) {
	const formulaDependencies = formula
		.toLowerCase()
		.replace(/[a-z][0-9]*/g, (m: string) => data.get(m)?.value || "");

	try {
		return eval(formulaDependencies) || formula;
	} catch (error) {
		return "NULL";
	}
}

export function updateDependencies(
	dependency: string,
	data: Map<string, { formula: string; value: string }>
) {
	for (const [, cell] of data.entries()) {
		const formula = cell.formula.toLowerCase();

		if (formula.includes(dependency)) {
			cell.value = getValueByFormula(formula, data);
		}
	}
}
