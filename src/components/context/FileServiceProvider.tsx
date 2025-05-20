import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { FileService } from "./FileService.ts";

export interface Annotation {
    id: ReturnType<typeof crypto.randomUUID>;
    title: string;
    data: string;
    selected: boolean;
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
    downloadSelectedFiles(): Promise<void>;
    selectAllFiles(selected: boolean): void;
    selectFile(file: Annotation): void;
    deleteSelectedFiles(): Promise<void>;
}

const FileServiceStateContext = createContext<FileServiceState | null>(null);
const FileServiceActionsContext = createContext<FileServiceActions | null>(null);

const service = new FileService();
service.initialize();

export function FileServiceProvider({ children }: Parent) {
    const [state, setState] = useState<FileServiceState>({ status: FileServiceStatus.NotStarted, files: [] });
    const stateRef = useRef<FileServiceState>(state);

    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    const refreshFiles = useCallback(async (): Promise<void> => {
        setState({ status: FileServiceStatus.Waiting, files: [] });
        setState({ status: FileServiceStatus.Success, files: await service.retrieveFiles() });
    }, []);
    const uploadFile = useCallback(async (file: Annotation): Promise<void> => {
        await service.uploadFile(file);
        await refreshFiles();
    }, [refreshFiles]);
    const downloadSelectedFiles = useCallback(async (): Promise<void> => {
        await service.downloadFiles(stateRef.current.files.filter(file => file.selected));
    }, []);
    const selectAllFiles = useCallback((selected: boolean): void => {
        setState(prevState => ({
            ...prevState,
            files: prevState.files.map(file => ({ ...file, selected: selected })),
        }));
    }, []);
    const selectFile = useCallback((file: Annotation): void => {
        setState(prevState => ({
            ...prevState,
            files: prevState.files.map(f => f.id === file.id ? { ...f, selected: !f.selected } : f),
        }));
    }, []);
    const deleteSelectedFiles = useCallback(async (): Promise<void> => {
        const selectedFiles = stateRef.current.files.filter(file => file.selected);
        if (selectedFiles.length === 0)
            return;
        await service.deleteFiles(stateRef.current.files.filter(file => file.selected));
        await refreshFiles();
    }, [refreshFiles]);

    const actions: FileServiceActions = useMemo(() => ({
        refreshFiles,
        uploadFile,
        downloadSelectedFiles,
        selectAllFiles,
        selectFile,
        deleteSelectedFiles,
    }), [refreshFiles, uploadFile, downloadSelectedFiles, selectAllFiles, selectFile, deleteSelectedFiles]);

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
