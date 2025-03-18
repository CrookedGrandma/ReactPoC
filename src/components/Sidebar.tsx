import { makeStyles, Text, Title1, tokens } from "@fluentui/react-components";
import { GArea } from "../util.ts";

const useStyles = makeStyles({
    sidebar: {
        gridArea: GArea.Side,
        padding: "12px",
        marginLeft: "12px",
        borderLeft: `2px solid ${tokens.colorNeutralStroke2}`,
    },
});

export default function Sidebar() {
    const classes = useStyles();

    return <aside className={classes.sidebar}>
        <Title1 block align="center">Bewijslast</Title1>
        <Text block align="center">Hier komt alle bewijslast</Text>
    </aside>;
}
