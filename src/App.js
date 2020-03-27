import React from "react";

import "./global.css";

import Routes from "./routes";

const dotenv = require("dotenv");

dotenv.config();

export default function App() {
	return <Routes />;
}
