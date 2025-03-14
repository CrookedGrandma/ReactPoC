import ImageGrid from "./ImageGrid.tsx";
import { LargeTitle } from "@fluentui/react-components";

interface Props {
    className: string;
}

export default function View(props: Readonly<Props>) {
    const images = Array.from(Array(25), (_, i) => i + 1).map(i => `${i}.jpg`);

    return <div className={props.className}>
        <LargeTitle as="h1" block>Hier komen dan allemaal mooie foto&#39;s te staan</LargeTitle>
        <ImageGrid>{images}</ImageGrid>
    </div>;
}
