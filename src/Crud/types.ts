export interface PersonValues {
	name: string;
	surname: string;
}

export interface State {
	people: PersonValues[];
	prefix: string;
	selected: null | number;
}

export interface Reducer {
	type: string;
	value?: any;
}
