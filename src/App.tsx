import { Display, Image } from "@fluentui/react-components";
import { ClickCounter } from "./ClickCounter.tsx";
import IMAGE from "./kip.jpg";

export function App() {
    return <>
        <Display as="h1" block>React TypeScript Webpack Starter Template - {process.env.NODE_ENV}</Display>
        <Image src={IMAGE} alt="Lekker kippetje" width={300} bordered shape="circular" />
        <ClickCounter />
    </>;
}
