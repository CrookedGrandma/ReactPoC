import conf from "./webpack.base.ts";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import webpackDevServer from "webpack-dev-server";

conf.mode = "development";
conf.devtool = "inline-source-map";

conf.devServer = {
    hot: true,
    open: true,
} as webpackDevServer.Configuration;

if (!conf.plugins)
    conf.plugins = [];
conf.plugins.push(new ReactRefreshPlugin());

export default conf;
