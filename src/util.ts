export const GArea = {
    Head: "head",
    Main: "main",
    Side: "side",
} as const;

export function publicImgPath(filePath: string) {
    return `imgs/${filePath}`;
}
