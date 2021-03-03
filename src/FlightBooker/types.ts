export interface InitialInputStateValues {
	value: string;
	valid: boolean;
	date: Date | null;
}

export interface StateValues {
	flightType?: string;
	dateStart?: InitialInputStateValues;
	dateEnd?: InitialInputStateValues;
	canBook?: boolean;
}

export interface ReducerValues extends StateValues {
	type: string;
}
