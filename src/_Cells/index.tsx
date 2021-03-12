import React from "react";

import Table from "./Table";
import Provider from "./store";

const Cells = () => {
	return (
		<Provider>
			<Table />
		</Provider>
	);
};

export default Cells;
