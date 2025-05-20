import { Annotation, useFileServiceActions } from "./context/FileServiceProvider.tsx";
import { Checkbox, Image, makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
    imageWrapper: {
        width: "200px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    image: {
        "width": "200px",
        ':hover': {
            cursor: "pointer",
        },
    },
    checkbox: {
        position: "absolute",
        top: "0",
        left: "0",
    },
    anchorButton: {
        textDecoration: "none", // Remove underline
        color: "inherit", // Inherit text color
    },
});

interface Props {
    file: Annotation;
}

// Function is called ImageGridImage to avoid name collision with Image component
export default function ImageGridImage({ file }: Readonly<Props>) {
    const classes = useStyles();
    const fileServiceActions = useFileServiceActions();

    return <>
        <div className={classes.imageWrapper}>
            <Checkbox
                onClick={() => fileServiceActions.selectFile(file)}
                className={classes.checkbox}
                checked={file.selected} />
            <Image
                onClick={() => fileServiceActions.selectFile(file)}
                className={classes.image}
                src={file.data}
                alt={file.title}
                shape="rounded" />
            <a href={file.data} target="_blank" rel="noopener noreferrer">{file.title}</a>
        </div>
    </>;
}
