import React, { useRef } from "react";
import $ from "./style.module.css";
import { useStore } from "./reducer";

const Crud = (): JSX.Element => {
	const [state, dispatch] = useStore();
	const { people } = state;

	const nameRef = useRef();
	const surnameRef = useRef();
	const indexRef = useRef(null);

	const CREATE = () => {
		const name = nameRef.current.value;
		const surname = surnameRef.current.value;

		RESET();
		dispatch({ type: "CREATE", name, surname });
	};
	const UPDATE = () => {
		const name = nameRef.current.value;
		const surname = surnameRef.current.value;

		dispatch({ type: "UPDATE", name, surname, index: indexRef.current });
	};
	const DELETE = () => {
		RESET();

		dispatch({ type: "DELETE", index: indexRef.current });
	};
	const SELECT = (data, index) => {
		indexRef.current = index;
		nameRef.current.value = data.name;
		surnameRef.current.value = data.surname;
	};
	const RESET = () => {
		nameRef.current.value = "";
		surnameRef.current.value = "";
		indexRef.current = null;
	};
	const FILTER = () => {};

	return (
		<div className={$.container}>
			<div className={`${$.inline} ${$.leftTop}`}>
				<div style={{ flex: 1 }}>Filter prefix:</div>
				<input type="text" style={{ width: "50px" }} />
			</div>

			<div className={$.actions}>
				<div className={`${$.view} ${$.left}`}>
					{people.map((item, index) => (
						<div
							key={index}
							onClick={() => SELECT(item, index)}
							className={$.listItem}
						>{`${item.name}, ${item.surname}`}</div>
					))}
				</div>

				<div className={$.edit}>
					<div className={$.inline}>
						<span>Name</span>
						<input type="text" ref={nameRef} />
					</div>
					<div className={$.inline}>
						<span>Surname</span>
						<input type="text" ref={surnameRef} />
					</div>
				</div>
			</div>
			<div className={$.buttons}>
				<button onClick={() => CREATE()}>Create</button>
				<button onClick={() => UPDATE()}>Update</button>
				<button onClick={() => DELETE()}>Delete</button>
			</div>
		</div>
	);
};

export default Crud;
