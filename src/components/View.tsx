import { Image, LargeTitle } from "@fluentui/react-components";
import IMAGE from "../kip.jpg";

interface Props {
    className: string;
}

export default function View(props: Readonly<Props>) {
    return <div className={props.className}>
        <LargeTitle as="h1" block>Hier komen dan allemaal mooie foto&#39;s te staan</LargeTitle>
        <Image src={IMAGE} alt="Lekker kippetje" width={300} bordered shape="circular" />
    </div>;
}
