const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: "development",

    devtool: "inline-source-map", // Source map allows one to debug output: Refer error to original script not bundle.js

    devServer: {
        static: './dist', // Where to find folders to serve
        hot: true, // Colored output in console
        historyApiFallback: true
    },
});