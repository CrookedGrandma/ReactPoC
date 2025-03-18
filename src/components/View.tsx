import { LargeTitle, makeStyles } from "@fluentui/react-components";
import { GArea } from "../util.ts";
import ImageGrid from "./ImageGrid.tsx";

const useStyles = makeStyles({
    main: {
        gridArea: GArea.Main,
    },
});

export default function View() {
    const classes = useStyles();

    const images = Array.from(Array(25), (_, i) => i + 1).map(i => `${i}.jpg`);

    return <div className={classes.main}>
        <LargeTitle as="h1" block>Hier komen dan allemaal mooie foto&#39;s te staan</LargeTitle>
        <ImageGrid>{images}</ImageGrid>
    </div>;
}
