import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Store from "./store";

const store = new Store({});
const root = ReactDOM.createRoot(document.getElementById("root"));

store.subscribe(() => {
	root.render(<App store={store}/>);
});

root.render(<App store={store}/>);
