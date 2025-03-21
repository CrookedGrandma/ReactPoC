import { blobToBase64, readBase64, sleep } from "../../util.ts";
import { Component, ComponentType, createContext, useContext } from "react";
import FotoboekContext from "./Contexts.tsx";
import { ValueContext } from "./createValueContext.tsx";

export interface Annotation {
    id: ReturnType<typeof crypto.randomUUID>;
    title: string;
    data: string;
}

export enum ImageProviderStatus {
    NotStarted,
    Waiting,
    Success,
    Failed,
}

const Context = createContext<ImageProvider | undefined>(undefined);

interface State {
    // images: Annotation[];
    status: ImageProviderStatus;
    // setImages: ((images: Annotation[]) => void);
    images: ValueContext<Annotation[]>;
}

interface ImageListContextProp {
    imageListContext: ValueContext<Annotation[]>;
}

function withImageListContext(Component: ComponentType<Parent & ImageListContextProp>) {
    return function WrappedComponent(props: Parent) {
        const context = FotoboekContext.ImageList.useValue();
        return <Component {...props} imageListContext={context} />;
    };
}

class ImageProvider extends Component<Parent & ImageListContextProp, State> {
    constructor(props: Parent & ImageListContextProp) {
        super(props);
        this.state = {
            // images: [],
            status: ImageProviderStatus.NotStarted,
            images: this.props.imageListContext,
        };
    }

    render() {
        return <Context.Provider value={this}>{this.props.children}</Context.Provider>;
    }

    componentDidMount() {
        this.retrieveImages();
    }

    /**
     * Retrieve images from 'the server'
     */
    async retrieveImages(): Promise<Annotation[]> {
        this.setState({ status: ImageProviderStatus.Waiting });

        // Get some pre-defined images for testing purposes
        const imageNames = Array.from(Array(25), (_, i) => `${i + 1}.jpg`);

        try {
            await sleep(1000); // For simulating getting lots of external images
            const results: Annotation[] = await Promise.all(imageNames.map(async file => ({
                id: crypto.randomUUID(),
                title: file,
                data: await readBase64(file),
            })));

            this.setState({ status: ImageProviderStatus.Success });
            this.state.images.setValue(results);
            return results;
        }
        catch (error) {
            this.setState({ status: ImageProviderStatus.Failed });
            console.error(error);
            this.state.images.setValue([]);
            return [];
        }
    }

    async uploadImages(images: ArrayLike<File>): Promise<void> {
        await Promise.all(Array.from(images).map(async file => this.uploadImage(file)));
    }

    async uploadImage(image: File): Promise<void> {
        const images = this.state.images.value;
        images.push({
            id: crypto.randomUUID(),
            title: new Date().toISOString(),
            data: await blobToBase64(image),
        });
        this.state.images.setValue(images);
    }
}

export default withImageListContext(ImageProvider);

export function useImageProvider() {
    const context = useContext(Context);
    if (!context)
        throw Error(`The hook for the ImageProvider context must be used within its Provider.`);
    return context;
}
