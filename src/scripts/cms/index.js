import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import "../../styles/index.css";

const app = document.body.querySelector("main");

render(<App />, app);
