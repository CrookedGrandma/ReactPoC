import baseConfig from "./webpack.base.ts";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { merge } from "webpack-merge";
import webpack from "webpack";

const conf = async (env: AnyObject) => {
    const envConfig = (await import(`./webpack.${env.env}.ts`)).default as webpack.Configuration;
    const analysisConfig: webpack.Configuration = env.analysis == "true"
        ? { plugins: [new BundleAnalyzerPlugin()] }
        : {};
    return merge([baseConfig, envConfig, analysisConfig]);
};

export default conf;
