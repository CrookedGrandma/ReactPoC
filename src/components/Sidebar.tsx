import { makeStyles, Text, Title1 } from "@fluentui/react-components";
import { GArea } from "../util.ts";

const useStyles = makeStyles({
    sidebar: {
        gridArea: GArea.Side,
        padding: "5px",
    },
});

export default function Sidebar() {
    const classes = useStyles();

    return <aside className={classes.sidebar}>
        <Title1 block align="center">Bewijslast</Title1>
        <Text block align="center">Hier komt alle bewijslast</Text>
    </aside>;
}
