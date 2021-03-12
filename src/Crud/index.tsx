import React, { useState } from "react";
import $ from "./style.module.css";
import { useStore } from "./reducer";
import { PersonValues } from "./types";

const Crud = (): JSX.Element => {
	const [state, dispatch] = useStore();
	const { people, prefix, selected } = state;

	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");

	const disabled = selected === null;

	const SET_PREFIX = (value: string) => {
		dispatch({ type: "SET_PREFIX", value: value });
	};

	const SELECT = (value: number | null) => {
		if (selected === value) {
			dispatch({ type: "SELECT", value: null });
			SET_FIELDS(null);
		} else {
			dispatch({ type: "SELECT", value });
			SET_FIELDS(value);
		}
	};

	const SET_FIELDS = (index: number | null) => {
		if (index !== null) {
			const data = people[index];
			setName(data.name);
			setSurname(data.surname);
		} else {
			setName("");
			setSurname("");
		}
	};

	const renderListItems = () => {
		const peopleFiltered = people.filter(
			(item) => item.surname.toLowerCase().indexOf(prefix.toLowerCase()) === 0
		);

		if (!peopleFiltered.length) {
			return <div>No results!</div>;
		}

		return peopleFiltered.map(
			(item: PersonValues, index: number): JSX.Element => {
				return (
					<div
						key={index}
						onClick={() => SELECT(index)}
						className={`${$.listItem} ${selected === index ? $.active : ""}`}
					>{`${item.name}, ${item.surname}`}</div>
				);
			}
		);
	};

	return (
		<div className={$.container}>
			<div className={`${$.inline} ${$.leftTop}`}>
				<div style={{ flex: 1 }}>Filter prefix:</div>
				<input
					type="text"
					style={{ width: "50px" }}
					value={prefix}
					onChange={(e) => SET_PREFIX(e.target.value)}
				/>
			</div>

			<div className={$.actions}>
				<div className={`${$.view} ${$.left}`}>{renderListItems()}</div>

				<div className={$.edit}>
					<div className={$.inline}>
						<span>Name</span>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className={$.inline}>
						<span>Surname</span>
						<input
							type="text"
							value={surname}
							onChange={(e) => setSurname(e.target.value)}
						/>
					</div>
				</div>
			</div>

			<div className={$.buttons}>
				<button
					onClick={() => dispatch({ type: "CREATE", value: { name, surname } })}
				>
					Create
				</button>
				<button disabled={disabled} onClick={() => {}}>
					Update
				</button>
				<button disabled={disabled} onClick={() => {}}>
					Delete
				</button>
			</div>
		</div>
	);
};

export default Crud;
