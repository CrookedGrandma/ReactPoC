import { createContext, useContext, useMemo, useState } from "react";

interface SortContext {
    value: string;
    setSort: (value: string) => void;
}

const SortContext = createContext<SortContext | null>(null);

export function SortProvider({ children, defaultValue }: Parent & Readonly<{ defaultValue: string }>) {
    const [value, setValue] = useState(defaultValue);

    function setSort(newValue: string) {
        setValue(newValue);
    }

    const context = useMemo(() => ({
        value: value,
        setSort,
    }), [value]);

    return <SortContext.Provider value={context}>{children}</SortContext.Provider>;
}

export function useSort() {
    const context = useContext(SortContext);
    if (!context)
        throw Error("useSort must be used within a SortProvider");
    return context;
}
