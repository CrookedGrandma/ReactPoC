import { readBase64, sleep } from "../../util.ts";
import { Annotation } from "./FileServiceProvider.tsx";

export class FileService {
    private initialized: boolean = false;
    private whenInitilized?: () => void;

    private fileDb: Annotation[] = [];

    async initialize(): Promise<void> {
        alert("File service initialized");

        // Get some pre-defined images for testing purposes
        const imageNames = Array.from(Array(25), (_, i) => `${i + 1}.jpg`);
        this.fileDb = await Promise.all(imageNames.map(async file => ({
            id: crypto.randomUUID(),
            title: file,
            data: await readBase64(file),
        })));

        this.initialized = true;
        if (this.whenInitilized)
            this.whenInitilized();
    }

    onInitialized(callback: () => void) {
        if (this.initialized)
            callback();
        else
            this.whenInitilized = callback;
    }

    async retrieveFiles(): Promise<Annotation[]> {
        await sleep(1000);
        return this.fileDb;
    }

    async uploadFile(file: Annotation): Promise<void> {
        this.fileDb.push(file);
    }
}
