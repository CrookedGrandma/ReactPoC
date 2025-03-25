import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

export class InlineScriptWebpackPlugin {
    static readonly Name = 'InlineScriptWebpackPlugin';

    options: {
        test: RegExp;
        type: string;
    };

    constructor(options: Partial<typeof this.options> = {}) {
        this.options = {
            test: options.test ?? /.*/,
            type: options.type ?? "module",
        };
    }

    apply(compiler: webpack.Compiler) {
        compiler.hooks.compilation.tap(InlineScriptWebpackPlugin.Name, compilation => {
            HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(InlineScriptWebpackPlugin.Name,
                (data, cb) => {
                    // Match the script tags with 'src' attribute pointing to a JS file
                    const scriptTagRegex = /<script\s+[^>]*?src="(.+\.js)".*?>.*?<\/script>/g;

                    data.html = data.html.replace(scriptTagRegex, (match, filePath) => {
                        // Skip if test regex does not match
                        if (!this.options.test.test(match))
                            return match;

                        // Read the contents of the JavaScript file
                        const jsAsset = compilation.getAsset(filePath);
                        if (!jsAsset)
                            throw Error(`Something went wrong: asset ${jsAsset} not found`);
                        let fileContents = jsAsset.source.source() as string;
                        // Add license information if it exists
                        const licenseAsset = compilation.getAsset(`${filePath}.LICENSE.txt`);
                        if (licenseAsset) {
                            const licenseLine = `/*! For license information please see ${filePath}.LICENSE.txt */`;
                            fileContents = `${licenseAsset.source.source()}\n${fileContents.replace(licenseLine, "")}`;
                        }
                        // Remove the file from compilation assets
                        compilation.deleteAsset(filePath);
                        // Return the inlined script
                        return `<script type="${this.options.type}">${fileContents}</script>`;
                    });

                    cb(null, data);
                },
            );
        });
    }
}
