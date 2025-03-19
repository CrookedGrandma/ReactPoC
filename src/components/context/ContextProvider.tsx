import { FilterProvider } from "./FilterContext.tsx";
import React from "react";
import { SortProvider } from "./SortContext.tsx";

export function ContextProvider({ children }: Parent) {
    return (
        // Add new context providers here
        <FilterProvider defaultValue="alle">
            <SortProvider defaultValue="asc">
                {children}
            </SortProvider>
        </FilterProvider>
    );
}
