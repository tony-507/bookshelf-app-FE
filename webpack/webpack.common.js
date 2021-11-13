const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: "./../src/index.tsx" // Assign a name to what to bundle
    },
    output: {
        filename: "[name].bundle.js", // Name bundle.js by referring to keys of entry
        path: __dirname + "/../dist", // Where to save bundles
        clean: true, // Remove old folder
        publicPath: "/"
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    plugins: [
        new HtmlWebpackPlugin({
            // Plugin tp generate index.html with all bundle.js included
            title: 'Bookshelf app',
            template: './../index.ejs'
        }),
    ],

    module: {
        rules: [
            { test: /\.tsx?$/, exclude: "../node_modules/", loader: "awesome-typescript-loader"}, // Handle ts, tsx

            { test: /\.css$/, use: ["style-loader", "css-loader"]}, // Handle css

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, exclude: "../node_modules/", loader: "source-map-loader" }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
};