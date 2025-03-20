import { createContext, useContext, useMemo, useState } from "react";

interface FilterContext {
    value: string;
    setFilter: (value: string) => void;
}

const FilterContext = createContext<FilterContext | undefined>(undefined);

export function FilterProvider({ children, defaultValue }: Parent & DefaultValue<string>) {
    const [value, setValue] = useState(defaultValue);

    function setFilter(newValue: string) {
        setValue(newValue);
    }

    const context = useMemo(() => ({ value, setFilter }), [value]);

    return <FilterContext.Provider value={context}>{children}</FilterContext.Provider>;
}

export function useFilter() {
    const context = useContext(FilterContext);
    if (!context)
        throw Error("useFilter must be used within a FilterProvider");
    return context;
}
