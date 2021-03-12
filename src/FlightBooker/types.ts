export interface StateValues {
	flightType: string;
	dateStart: Date | null;
	dateEnd: Date | null;
}

export interface ReducerValues {
	type: string;
	value?: any;
}
