import FotoboekContext from "./Contexts.tsx";
import ImageProvider from "./ImageProvider.tsx";

export function ContextProvider({ children }: Parent) {
    return (
        // Add new context providers here
        <FotoboekContext.ImageList.Provider defaultValue={[]}>
            <ImageProvider>
                <FotoboekContext.Filter.Provider defaultValue="alle">
                    <FotoboekContext.Sort.Provider defaultValue="asc">
                        {children}
                    </FotoboekContext.Sort.Provider>
                </FotoboekContext.Filter.Provider>
            </ImageProvider>
        </FotoboekContext.ImageList.Provider>
    );
}
