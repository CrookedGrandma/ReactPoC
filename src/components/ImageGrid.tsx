import { Image, makeStyles } from "@fluentui/react-components";
import { publicImgPath } from "../util.ts";

const useStyles = makeStyles({
    container: {
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
    },
});

interface Props {
    children: string[];
}

export default function ImageGrid(props: Readonly<Props>) {
    const classes = useStyles();
    return <div className={classes.container}>
        {props.children.map(file =>
            <Image key={file} src={publicImgPath(file)} alt={file} width={200} bordered shape="rounded" />)}
    </div>;
}
