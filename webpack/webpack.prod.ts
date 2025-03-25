import { InlineScriptWebpackPlugin } from "./InlineScriptWebpackPlugin.ts";
import webpack from "webpack";

const conf: webpack.Configuration = {
    mode: "production",
    devtool: "source-map",
    plugins: [
        new InlineScriptWebpackPlugin(),
    ],
};

export default conf;
