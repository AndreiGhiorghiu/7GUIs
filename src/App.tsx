import React, { useState } from "react";
import Counter from "./Counter";
import TemperatureConverter from "./TemperatureConverter";
import FlightBooker from "./FlightBooker";
import Timer from "./Timer";
import Cells from "./Cells";

import $ from "./App.module.css";

const tabs = {
	"counter": <Counter />,
	"Temperature Converter": <TemperatureConverter />,
	"Flight Booker": <FlightBooker />,
	"Timer": <Timer />,
	"Cells": <Cells />,
};

const App = () => {
	const [activeTab, setActiveTab] = useState("Cells");

	const renderTabs = () => {
		return Object.keys(tabs).map((tabName, index) => (
			<div
				key={index}
				className={`${$.tab} ${activeTab === tabName && $.tabActive}`}
				onClick={() => setActiveTab(tabName)}
			>
				{`${index + 1}. ${tabName}`}
			</div>
		));
	};

	return (
		<div>
			<div style={{ width: 200 * Object.keys(tabs).length }}>
				<div className={$.tabs}>{renderTabs()}</div>
			</div>
			<div className={$.projectsContainer}>
				{(tabs[activeTab] && tabs[activeTab]) || <h2>Click on project</h2>}
			</div>
		</div>
	);
};

export default App;
