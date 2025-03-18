import { createContext, ReactNode, useContext, useMemo, useState } from "react";

interface FilterContext {
    selectedOption: string;
    text: string;
    setFilter: (text: string, selectedOption: string) => void;
}

const FilterContext = createContext<FilterContext | null>(null);

export function FilterProvider({ children }: Readonly<{ children: ReactNode }>) {
    const [value, setValue] = useState("Alle");
    const [selectedOptions, setSelectedOptions] = useState(["alle"]);

    function setFilter(newValue: string, newSelectedOption: string) {
        setValue(newValue);
        setSelectedOptions([newSelectedOption]);
    }

    const context = useMemo(() => ({
        selectedOption: selectedOptions[0],
        text: value,
        setFilter,
    }), [selectedOptions, value]);

    return <FilterContext.Provider value={context}>{children}</FilterContext.Provider>;
}

export function useFilter() {
    const context = useContext(FilterContext);
    if (!context)
        throw Error("useFilter must be used within a FilterProvider");
    return context;
}
