import ReactDOM from "react-dom/client";
import {App} from "./App";

const rootDiv = document.getElementById("root");
if (!rootDiv)
    throw Error("No root element found");
const root = ReactDOM.createRoot(rootDiv);
root.render(<App />);
