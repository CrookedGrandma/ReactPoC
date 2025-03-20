import FotoboekContext from "./Contexts.tsx";

export function ContextProvider({ children }: Parent) {
    return (
        // Add new context providers here
        <FotoboekContext.Filter.Provider defaultValue="alle">
            <FotoboekContext.Sort.Provider defaultValue="asc">
                {children}
            </FotoboekContext.Sort.Provider>
        </FotoboekContext.Filter.Provider>
    );
}
