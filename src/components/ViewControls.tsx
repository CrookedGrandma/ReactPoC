import { Button, makeStyles } from "@fluentui/react-components";
import Filter from "./Filter.tsx";
import FotoboekContext from "./context/Contexts.tsx";
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

    const { setValue: setFilter } = FotoboekContext.Filter.useValue();

    return <>
        <div className={classes.controlRow}>
            <Filter />
            <Sort />
        </div>
        <div className={classes.controlRow}>
            {/* buttons, select all, file counter, generate document */}
            <Button onClick={() => setFilter("iets-anders")}>Test</Button>
        </div>
    </>;
}
