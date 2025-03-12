import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { App } from "./App";
import React from "react";
import ReactDOM from "react-dom/client";

const rootDiv = document.getElementById("root");
if (!rootDiv)
    throw Error("No root element found");

ReactDOM.createRoot(rootDiv).render(
    <React.StrictMode>
        <FluentProvider theme={webLightTheme}>
            <App />
        </FluentProvider>
    </React.StrictMode>,
);
