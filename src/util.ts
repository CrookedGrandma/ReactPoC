import { makeStyles } from "@fluentui/react-components";

export const GArea = {
    Head: "head",
    Main: "main",
    Side: "side",
} as const;

export abstract class SharedStyles {
    static dropdown() {
        return makeStyles({
            label: {
                marginRight: "1rem",
            },
            dropdown: {
                display: "inline-flex",
            },
        });
    }
}

export function publicImgPath(filePath: string) {
    return `imgs/${filePath}`;
}
