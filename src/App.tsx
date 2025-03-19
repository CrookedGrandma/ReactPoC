import { FluentProvider, makeStyles, webLightTheme } from "@fluentui/react-components";
import { ContextProvider } from "./components/context/ContextProvider.tsx";
import { GArea } from "./util.ts";
import Head from "./components/Head.tsx";
import Sidebar from "./components/Sidebar.tsx";
import View from "./components/View.tsx";

const useStyles = makeStyles({
    app: {
        padding: "4px",
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
        <ContextProvider>
            <Head />
            <Sidebar />
            <View />
        </ContextProvider>
    </FluentProvider>;
}
