import { Annotation } from "./ImageProvider.tsx";
import { createValueContext } from "./createValueContext.tsx";

const FotoboekContext = {
    Filter: createValueContext<string>("Filter"),
    Sort: createValueContext<string>("Sort"),
    ImageList: createValueContext<Annotation[]>("ImageList"),
};

export default FotoboekContext;
