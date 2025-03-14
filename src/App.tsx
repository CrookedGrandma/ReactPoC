import { FluentProvider, makeStyles, webLightTheme } from "@fluentui/react-components";
import Head from "./components/Head.tsx";
import Sidebar from "./components/Sidebar.tsx";
import View from "./components/View.tsx";

const useStyles = makeStyles({
    app: {
        display: "grid",
        gridTemplateAreas: `
            "head side"
            "main side"
        `,
        gridTemplateRows: "250px auto",
        gridTemplateColumns: "2fr 1fr",
    },
    head: {
        gridArea: "head",
        backgroundColor: "blue",
    },
    sidebar: {
        gridArea: "side",
        padding: "5px",
    },
    main: {
        gridArea: "main",
    },
});

export default function App() {
    const classes = useStyles();
    return <FluentProvider id="app" className={classes.app} theme={webLightTheme}>
        <Head className={classes.head} />
        <Sidebar className={classes.sidebar} />
        <View className={classes.main} />
    </FluentProvider>;
}
