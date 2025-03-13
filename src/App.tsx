import {
    Display,
    DrawerBody,
    DrawerHeader,
    DrawerHeaderTitle,
    FluentProvider,
    Image,
    InlineDrawer,
    makeStyles,
    webLightTheme,
} from "@fluentui/react-components";
import { ClickCounter } from "./ClickCounter.tsx";
import IMAGE from "./kip.jpg";

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
    },
    main: {
        gridArea: "main",
    },
});

export function App() {
    const classes = useStyles();
    return <FluentProvider id="app" className={classes.app} theme={webLightTheme}>
        <div className={classes.head}>Head</div>
        <InlineDrawer as="aside" separator open className={classes.sidebar}> {/* TODO: this should not be an InlineDrawer */}
            <DrawerHeader>
                <DrawerHeaderTitle>Yo</DrawerHeaderTitle>
            </DrawerHeader>
            <DrawerBody>
                <p>Wassup</p>
            </DrawerBody>
        </InlineDrawer>
        <div className={classes.main}>
            <Display as="h1" block>React TypeScript Webpack Starter Template - {process.env.NODE_ENV}</Display>
            <Image src={IMAGE} alt="Lekker kippetje" width={300} bordered shape="circular" />
            <ClickCounter />
        </div>
    </FluentProvider>;
}
