import Filter from "./Filter.tsx";
import { makeStyles } from "@fluentui/react-components";
import Sort from "./Sort.tsx";

const useStyles = makeStyles({
    controlRow: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: "10px 0",
    },
});

export default function ViewControls() {
    const classes = useStyles();

    return <>
        <div className={classes.controlRow}>
            <Filter />
            <Sort />
        </div>
        <div className={classes.controlRow}>
            {/* buttons, select all, file counter, generate document */}
        </div>
    </>;
}
