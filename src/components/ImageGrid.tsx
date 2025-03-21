import { Image, makeStyles, Skeleton, SkeletonItem } from "@fluentui/react-components";
import { ImageProviderStatus, useImageProvider } from "./context/ImageProvider.tsx";
import FotoboekContext from "./context/Contexts.tsx";

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

    const imageProvider = useImageProvider();
    const { value: images } = FotoboekContext.ImageList.useValue();

    switch (imageProvider.state.status) {
        case ImageProviderStatus.Success:
            return <div className={classes.container}>
                {images.map(file =>
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
