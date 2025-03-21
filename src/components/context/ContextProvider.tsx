import FotoboekContext from "./Contexts.tsx";
import ImageProvider from "../../data/ImageProvider.ts";

export function ContextProvider({ children }: Parent) {
    return (
        // Add new context providers here
        <FotoboekContext.ImageProvider.Provider defaultValue={new ImageProvider()}>
            <FotoboekContext.Filter.Provider defaultValue="alle">
                <FotoboekContext.Sort.Provider defaultValue="asc">
                    {children}
                </FotoboekContext.Sort.Provider>
            </FotoboekContext.Filter.Provider>
        </FotoboekContext.ImageProvider.Provider>
    );
}
