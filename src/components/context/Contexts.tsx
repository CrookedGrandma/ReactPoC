import { createValueContext } from "./createValueContext.tsx";
import ImageProvider from "../../data/ImageProvider.ts";

const FotoboekContext = {
    Filter: createValueContext<string>("Filter"),
    Sort: createValueContext<string>("Sort"),
    ImageProvider: createValueContext<ImageProvider>("ImageProvider"),
};

export default FotoboekContext;
