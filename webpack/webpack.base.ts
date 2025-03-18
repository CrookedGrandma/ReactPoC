import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from 'path';
import webpack from "webpack";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: webpack.Configuration = {
    entry: path.resolve(__dirname, "../src/index.tsx"),
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: "asset/resource",
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "bundle.js",
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../src/index.html"),
        }),
    ],
};

export default config;
