import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import webpack from "webpack";
import webpackDevServer from "webpack-dev-server";

const conf: webpack.Configuration = {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        hot: true,
        open: true,
    } as webpackDevServer.Configuration,
    plugins: [new ReactRefreshPlugin()],
};

export default conf;
