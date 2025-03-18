import { FluentProvider, makeStyles, webLightTheme } from "@fluentui/react-components";
import { GArea } from "./util.ts";
import Head from "./components/Head.tsx";
import Sidebar from "./components/Sidebar.tsx";
import View from "./components/View.tsx";

const useStyles = makeStyles({
    app: {
        display: "grid",
        gridTemplateAreas: `
            "${GArea.Head} ${GArea.Side}"
            "${GArea.Main} ${GArea.Side}"
        `,
        gridTemplateRows: "200px auto",
        gridTemplateColumns: "2fr 1fr",
    },
});

export default function App() {
    const classes = useStyles();
    return <FluentProvider id="app" className={classes.app} theme={webLightTheme}>
        <Head />
        <Sidebar />
        <View />
    </FluentProvider>;
}
