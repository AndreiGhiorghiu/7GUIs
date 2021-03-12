import { initializeState } from "../helpers";

const columns = " abcdefghijklmnopqrstuvwxyz";
const rows = 99;

export default {
	data: initializeState(columns, rows),
	active: null,
	columns,
	rows,
};
