import baseConfig from "./webpack.base.ts";
import { merge } from "webpack-merge";
import webpack from "webpack";

const conf = async (env: AnyObject) => {
    const envConfig = (await import(`./webpack.${env.env}.ts`)).default as webpack.Configuration;
    return merge([baseConfig, envConfig]);
};

export default conf;
