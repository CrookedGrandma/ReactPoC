import { Button, makeStyles } from "@fluentui/react-components";
import { ImageProviderStatus, useImageProvider } from "./context/ImageProvider.tsx";
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

    const imageProvider = useImageProvider();

    const iconClass = [ImageProviderStatus.NotStarted, ImageProviderStatus.Waiting]
        .includes(imageProvider.state.status)
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
                onClick={imageProvider.retrieveImages}
                icon={<ArrowClockwiseFilled className={iconClass} />}
            />
        </div>
    </>;
}
