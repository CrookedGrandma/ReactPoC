import { Button, makeStyles } from "@fluentui/react-components";
import React, { useRef } from "react";
import { FolderListRegular } from "@fluentui/react-icons";

const useStyles = makeStyles({
    hidden: {
        display: "none",
    },
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
});

interface Props {
    onFileSelect: (files: FileList) => void;
}

export default function FileInput(props: Readonly<Props>) {
    const classes = useStyles();

    const fileInputRef = useRef<HTMLInputElement>(null);

    function handleButtonClick() {
        fileInputRef.current?.click();
    }

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (!event.target.files?.length)
            return;
        props.onFileSelect(event.target.files);
    }

    return <div className={classes.container}>
        <input type="file" multiple ref={fileInputRef} className={classes.hidden} onChange={handleFileChange} />
        <Button icon={<FolderListRegular />} onClick={handleButtonClick} size="large">Bladeren...</Button>
    </div>;
}
