import { GArea } from "../util.ts";
import ImageGrid from "./ImageGrid.tsx";
import { makeStyles } from "@fluentui/react-components";
import ViewControls from "./ViewControls.tsx";

const useStyles = makeStyles({
    main: {
        gridArea: GArea.Main,
    },
});

export default function View() {
    const classes = useStyles();

    return <div className={classes.main}>
        <ViewControls />
        <ImageGrid />
    </div>;
}
