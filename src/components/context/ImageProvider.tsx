import { blobToBase64, readBase64, sleep } from "../../util.ts";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import FotoboekContext from "./Contexts.tsx";

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

interface ImageProviderService {
    state: {
        status: ImageProviderStatus;
    };
    retrieveImages: () => Promise<Annotation[]>;
    uploadImages: (images: ArrayLike<File>) => Promise<void>;
    uploadImage: (image: File) => Promise<void>;
}

const Context = createContext<ImageProviderService | undefined>(undefined);

export function ImageProvider({ children }: Parent) {
    const [status, setStatus] = useState(ImageProviderStatus.NotStarted);

    const imageListContext = FotoboekContext.ImageList.useValue();
    const setImageList = useRef(imageListContext.setValue);
    const imageList = useRef(imageListContext.value);

    const providerService: ImageProviderService = useMemo<ImageProviderService>(() => ({
        state: {
            status: status,
        },

        retrieveImages: async () => {
            setStatus(ImageProviderStatus.Waiting);

            // Get some pre-defined images for testing purposes
            const imageNames = Array.from(Array(25), (_, i) => `${i + 1}.jpg`);

            try {
                await sleep(1000); // For simulating getting lots of external images
                const results: Annotation[] = await Promise.all(imageNames.map(async file => ({
                    id: crypto.randomUUID(),
                    title: file,
                    data: await readBase64(file),
                })));

                setStatus(ImageProviderStatus.Success);
                setImageList.current(results);
                return results;
            }
            catch (error) {
                setStatus(ImageProviderStatus.Failed);
                console.error(error);
                setImageList.current([]);
                return [];
            }
        },

        uploadImages: async (images: ArrayLike<File>) => {
            await Promise.all(Array.from(images).map(async file => providerService.uploadImage(file)));
        },

        uploadImage: async (image: File) => {
            const updatedImages = [...imageList.current, {
                id: crypto.randomUUID(),
                title: new Date().toISOString(),
                data: await blobToBase64(image),
            }];
            setImageList.current(updatedImages);
        },
    }), [status]);

    const serviceRef = useRef(providerService);

    useEffect(() => {
        serviceRef.current.retrieveImages();
    }, []);

    return <Context.Provider value={providerService}>{children}</Context.Provider>;
}

export function useImageProvider() {
    const context = useContext(Context);
    if (!context)
        throw Error(`The hook for the ImageProvider context must be used within its Provider.`);
    return context;
}
