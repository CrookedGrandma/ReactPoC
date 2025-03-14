import { Text, Title1 } from "@fluentui/react-components";

interface Props {
    className: string;
}

export default function Sidebar(props: Readonly<Props>) {
    return <aside className={props.className}>
        <Title1 block align="center">Bewijslast</Title1>
        <Text block align="center">Hier komt alle bewijslast</Text>
    </aside>;
}
