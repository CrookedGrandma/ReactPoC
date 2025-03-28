import { Image, makeStyles, Skeleton, SkeletonItem } from "@fluentui/react-components";
import { ImageProviderStatus, useImageProvider } from "./context/ImageProvider.tsx";
import { FilterValue } from "./Filter.tsx";
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
    const { value: filter } = FotoboekContext.Filter.useValue();
    const { value: sort } = FotoboekContext.Sort.useValue();

    const filteredImages = (() => {
        switch (filter) {
            case FilterValue.Alle:
                return images;
            case FilterValue.SingleDigit:
                return images.filter(i => parseInt(i.title.replace(".jpg", "")) < 10);
            default:
                throw Error(`Unsupported filter: ${filter}`);
        }
    })();

    const sortedImages = (() => {
        switch (sort) {
            case "asc":
                return filteredImages.toSorted((a, b) => a.title.localeCompare(b.title, undefined, { numeric: true }));
            case "desc":
                return filteredImages.toSorted((a, b) => b.title.localeCompare(a.title, undefined, { numeric: true }));
            default:
                throw Error(`Unsupported sort: ${sort}`);
        }
    })();

    switch (imageProvider.state.status) {
        case ImageProviderStatus.Success:
            return <div className={classes.container}>
                {sortedImages.map(file =>
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
