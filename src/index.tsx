import "./index.css";
import { App } from "./App";
import React from "react";
import ReactDOM from "react-dom/client";

const rootDiv = document.getElementById("root");
if (!rootDiv)
    throw Error("No root element found");

ReactDOM.createRoot(rootDiv).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
