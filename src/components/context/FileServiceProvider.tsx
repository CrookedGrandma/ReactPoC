import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { FileService } from "./FileService.ts";

export interface Annotation {
    id: ReturnType<typeof crypto.randomUUID>;
    title: string;
    data: string;
}

export enum FileServiceStatus {
    NotStarted,
    Waiting,
    Success,
    Failed,
}

export interface FileServiceState {
    status: FileServiceStatus;
    files: Annotation[];
}

export interface FileServiceActions {
    refreshFiles(): Promise<void>;
    uploadFile(file: Annotation): Promise<void>;
}

const FileServiceStateContext = createContext<FileServiceState | null>(null);
const FileServiceActionsContext = createContext<FileServiceActions | null>(null);

const service = new FileService();
service.initialize();

export function FileServiceProvider({ children }: Parent) {
    const [state, setState] = useState<FileServiceState>({ status: FileServiceStatus.NotStarted, files: [] });

    const refreshFiles = useCallback(async (): Promise<void> => {
        setState({ status: FileServiceStatus.Waiting, files: [] });
        setState({ status: FileServiceStatus.Success, files: await service.retrieveFiles() });
    }, []);
    const uploadFile = useCallback(async (file: Annotation): Promise<void> => {
        await service.uploadFile(file);
        await refreshFiles();
    }, [refreshFiles]);

    const actions: FileServiceActions = useMemo(() => ({
        refreshFiles,
        uploadFile,
    }), [refreshFiles, uploadFile]);

    useEffect(() => {
        service.onInitialized(() => actions.refreshFiles());
    }, [actions]);

    return (
        <FileServiceStateContext.Provider value={state}>
            <FileServiceActionsContext.Provider value={actions}>
                {children}
            </FileServiceActionsContext.Provider>
        </FileServiceStateContext.Provider>
    );
}

export function useFileServiceState() {
    const context = useContext(FileServiceStateContext);
    if (!context)
        throw Error(`The hook for the FileServiceState context must be used within its Provider.`);
    return context;
}

export function useFileServiceActions() {
    const context = useContext(FileServiceActionsContext);
    if (!context)
        throw Error(`The hook for the FileServiceActions context must be used within its Provider.`);
    return context;
}
