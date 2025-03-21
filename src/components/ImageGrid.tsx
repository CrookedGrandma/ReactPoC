import { Image, makeStyles, Skeleton, SkeletonItem } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import FotoboekContext from "./context/Contexts.tsx";
import { ImageProviderStatus } from "../data/ImageProvider.ts";

const useStyles = makeStyles({
    container: {
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "2px",
    },
    skeletonItem: {
        width: "200px",
        height: "200px",
    },
});

export default function ImageGrid() {
    const classes = useStyles();

    const { value: imageProvider } = FotoboekContext.ImageProvider.useValue();
    const [status, setStatus] = useState<ImageProviderStatus>(imageProvider.status);

    useEffect(() => {
        imageProvider.retrieveImages()
            .then(() => setStatus(imageProvider.status));
    }, [imageProvider]);

    switch (status) {
        case ImageProviderStatus.Success:
            return <div className={classes.container}>
                {imageProvider.images.map(file =>
                    <Image key={file.id} src={file.data} alt={file.title} width={200} shape="rounded" />)}
            </div>;

        case ImageProviderStatus.Failed:
            return <p>Oepsie poepsie</p>;

        case ImageProviderStatus.Waiting:
        case ImageProviderStatus.NotStarted:
            return <Skeleton className={classes.container}>
                {Array.from(Array(12), (_, i) => i)
                    .map(i => <SkeletonItem key={`skel${i}`} className={classes.skeletonItem} shape="square" />)}
            </Skeleton>;
    }
}
