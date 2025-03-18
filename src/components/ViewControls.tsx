import Filter from "./Filter.tsx";
import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
    controlRow: {
        display: 'flex',
        padding: "10px 0",
    },
});

export default function ViewControls() {
    const classes = useStyles();

    return <>
        <div className={classes.controlRow}>
            <Filter />
            {/* sort */}
        </div>
        <div className={classes.controlRow}>
            {/* buttons, select all, file counter */}
        </div>
    </>;
}
