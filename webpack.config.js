var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    entry: {
        "android.js": "./test.android.js",
        "ios.js": "./test.ios.js",
        // "styles.css": "./style/styles.sass",
    },
    output: {
        path: path.resolve(__dirname, 'bundles'),
        filename: '[name]',
    },
    module: {
        // rules: [
        //     {
        //         test: /\.s(a|c)ss$/,
        //         use: [],
        //     }
        // ],
        loaders: [
            {
                test: [/\.jsx?$/, /\.es6$/],
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'env', 'stage-0']
                }
            },
            // {
            //     test: [
            //         /\.sass$/, /\.scss$/
            //     ],
            //     exclude: /node_modules/,
            //     loader: 'sass-loader',
            // },
            {
                test: [/\.sass$/, /\.scss$/],
                loader: ExtractTextPlugin.extract({
                    use: 'css-loader!resolve-url-loader!sass-loader?sourceMap',
                })
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "[name]",
            allChunks: true
        })
    ],
    // resolve: {
    //     extensions: [
    //         '.js', '.es6'
    //     ],
    //     modules: ['node_modules', './node_modules']
    // },
    devtool: 'source-map',
    watch: true
}
