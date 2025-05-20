import { ArrowClockwiseFilled, ArrowDownloadRegular, BinRecycleRegular } from "@fluentui/react-icons";
import { Button, Checkbox, makeStyles } from "@fluentui/react-components";
import { FileServiceStatus, useFileServiceActions, useFileServiceState } from "./context/FileServiceProvider.tsx";
import Filter from "./Filter.tsx";
import Sort from "./Sort.tsx";

const useStyles = makeStyles({
    controlRow: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: "10px 0",
    },
    buttonRow: {
        display: 'flex',
        justifyContent: 'align-items',
        padding: "0 0 10px 0",
    },
});

export default function ViewControls() {
    const classes = useStyles();

    const fileServiceState = useFileServiceState();
    const fileServiceActions = useFileServiceActions();

    const refreshIconClass = [FileServiceStatus.NotStarted, FileServiceStatus.Waiting]
        .includes(fileServiceState.status)
        ? "rotating"
        : "";

    const allSelected = fileServiceState.files.length > 0
        && fileServiceState.files.every(file => file.selected);
    const nrOfSelectedFiles = fileServiceState.files.filter(file => file.selected).length;
    const selectAllLabel = `Selecteer alle${nrOfSelectedFiles > 0 ? ` (${nrOfSelectedFiles} geselecteerd)` : ""}`;

    return <>
        <div className={classes.controlRow}>
            <Filter />
            <Sort />
        </div>
        <div className={classes.buttonRow}>
            {/* buttons, select all, file counter, generate document */}
            <Button
                onClick={fileServiceActions.refreshFiles}
                icon={<ArrowClockwiseFilled className={refreshIconClass} />}
            />
            <Button
                onClick={fileServiceActions.downloadSelectedFiles}
                icon={<ArrowDownloadRegular />}
            />
            <Button
                onClick={fileServiceActions.deleteSelectedFiles}
                icon={<BinRecycleRegular />}
            />
            <Checkbox
                onClick={event => fileServiceActions.selectAllFiles(event.currentTarget.checked)}
                checked = {allSelected}
                label={selectAllLabel} />
        </div>
    </>;
}
