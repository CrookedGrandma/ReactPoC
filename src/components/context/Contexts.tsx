import { createValueContext } from "./createValueContext.tsx";

const FotoboekContext = {
    Filter: createValueContext<string>("Filter"),
    Sort: createValueContext<string>("Sort"),
};

export default FotoboekContext;
