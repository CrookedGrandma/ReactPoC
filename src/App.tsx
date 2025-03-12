import "./styles.css";
import IMAGE from "./kip.jpg";
import {ClickCounter} from "./ClickCounter.tsx";

export const App = () => {
    return <>
        <h1>React TypeScript Webpack Starter Template - {process.env.NODE_ENV}</h1>
        <img src={IMAGE} alt="Kip!" />
        <ClickCounter />
        </>;
}