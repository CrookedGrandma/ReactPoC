import { readBase64, sleep } from "../util.ts";

interface Annotation {
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

export default class ImageProvider {
    images: Annotation[] = [];
    status: ImageProviderStatus = ImageProviderStatus.NotStarted;

    /**
     * Retrieve images from 'the server'
     */
    async retrieveImages(): Promise<Annotation[]> {
        this.status = ImageProviderStatus.Waiting;

        // Get some pre-defined images for testing purposes
        const imageNames = Array.from(Array(25), (_, i) => i + 1).map(i => `${i}.jpg`);

        try {
            await sleep(1000); // For simulating getting lots of external images
            const results: Annotation[] = await Promise.all(imageNames.map(async file => ({
                id: crypto.randomUUID(),
                title: file,
                data: await readBase64(file),
            })));

            this.status = ImageProviderStatus.Success;
            this.images = results;
            return results;
        }
        catch (error) {
            this.status = ImageProviderStatus.Failed;
            console.error(error);
            this.images = [];
            return [];
        }
    }
}
