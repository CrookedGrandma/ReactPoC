import { makeStyles, tokens } from "@fluentui/react-components";
import FileDropZone from "./FileDropZone.tsx";
import { GArea } from "../util.ts";

const useStyles = makeStyles({
    head: {
        gridArea: GArea.Head,
        border: `1px solid ${tokens.colorNeutralStroke1}`,
        borderRadius: tokens.borderRadiusLarge,
        padding: "16px",
    },
});

export default function Head() {
    const classes = useStyles();

    return <div className={classes.head}>
        <FileDropZone allowedTypes="image/*" />
    </div>;
}
