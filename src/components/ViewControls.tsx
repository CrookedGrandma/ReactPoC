import { Button, makeStyles } from "@fluentui/react-components";
import { FileServiceStatus, useFileServiceActions, useFileServiceState } from "./context/FileServiceProvider.tsx";
import { ArrowClockwiseFilled } from "@fluentui/react-icons";
import Filter from "./Filter.tsx";
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

    const fileServiceState = useFileServiceState();
    const fileServiceActions = useFileServiceActions();

    const iconClass = [FileServiceStatus.NotStarted, FileServiceStatus.Waiting]
        .includes(fileServiceState.status)
        ? "rotating"
        : "";

    return <>
        <div className={classes.controlRow}>
            <Filter />
            <Sort />
        </div>
        <div className={classes.controlRow}>
            {/* buttons, select all, file counter, generate document */}
            <Button
                onClick={fileServiceActions.refreshFiles}
                icon={<ArrowClockwiseFilled className={iconClass} />}
            />
        </div>
    </>;
}
