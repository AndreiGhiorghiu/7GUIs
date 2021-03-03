export interface PersonValues {
	name: string;
	surname: string;
}

export interface State {
	people: PersonValues[];
}

export interface Reducer {
	name: string;
	surname: string;
	type: string;
	index: number;
}
