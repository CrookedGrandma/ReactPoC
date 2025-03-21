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

export async function readBase64(filePath: string) {
    const f = await fetch(publicImgPath(filePath));
    const b = await f.blob();
    return new Promise<string>(resolve => {
        const fr = new FileReader();
        fr.onload = () => resolve(fr.result as string);
        fr.readAsDataURL(b);
    });
}

export function sleep(ms: number) {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
}
