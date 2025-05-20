import { Annotation, useFileServiceActions } from "./context/FileServiceProvider.tsx";
import { makeStyles, mergeClasses, shorthands, tokens } from "@fluentui/react-components";
import React, { useState } from "react";
import { blobToBase64 } from "../util.ts";
import FileInput from "./FileInput.tsx";

const useStyles = makeStyles({
    container: {
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "10px",
        height: "100%",
    },
    dropZone: {
        border: `3px dashed ${tokens.colorBrandStroke1}`,
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.2s",
    },
    dropZoneDragging: {
        ...shorthands.borderColor(tokens.colorNeutralStrokeAccessiblePressed),
        backgroundColor: tokens.colorNeutralBackground1Pressed,
    },
});

async function blobToAnnotation(file: File): Promise<Annotation> {
    return {
        id: crypto.randomUUID(),
        title: new Date().toISOString(),
        data: await blobToBase64(file),
        selected: false,
    };
}

interface Props {
    allowedTypes?: string;
}

export default function FileDropZone({ allowedTypes }: Readonly<Props>) {
    const classes = useStyles();

    const fileServiceActions = useFileServiceActions();

    const [isDragging, setIsDragging] = useState(false);

    async function handleDrop(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        setIsDragging(false);

        if (!event.dataTransfer.files.length)
            return;

        await handleFileSelect(event.dataTransfer.files);
    }

    function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        setIsDragging(true);
    }

    function handleDragLeave() {
        setIsDragging(false);
    }

    async function handleFileSelect(files: FileList) {
        console.log("Selected files:", files);
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            await fileServiceActions.uploadFile(await blobToAnnotation(file));
        }
    }

    return <div className={classes.container}>
        <div
            role="region"
            className={isDragging ? mergeClasses(classes.dropZone, classes.dropZoneDragging) : classes.dropZone }
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            <p>{isDragging ? "Laat hier los om te uploaden" : "Sleep bestanden om te uploaden"}</p>
        </div>
        <FileInput onFileSelect={handleFileSelect} allowedTypes={allowedTypes} />
    </div>;
}
