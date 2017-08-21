const path = require('path');
const webpack = require('webpack');
const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';
const srcPath = path.resolve(__dirname, './src/client');
const outputPath = path.resolve(__dirname, './public/assets');
const HtmlWebpackPlugin = require('html-webpack-plugin');
console.log(entry);

// const plugins = [
//     new webpack.optimize.CommonsChunkPlugin({
//         name: 'vendor',
//         minChunks: Infinity,
//         filename: 'vendor.bundle.js'
//     }),
//     new webpack.NamedChunksPlugin(), 
//     new webpack.DefinePlugin({
//         'process.env': {NODE_ENV: JSON.stringify(nodeEnv)}
//     }),
//     new webpack.NamedModulesPlugin(),
//     new HtmlWebpackPlugin({
//         template: '../dist/index.html'
//     })
// ];

module.exports = {
    devtool: isProd ? 'nosources-source-map' : 'source-map',
    context: srcPath,
    entry: {
        app: path.resolve(srcPath, 'app.js'),
        // vendor: ['react'],
        // reactDom: 'react-dom'
    },
    output: {
        path: outputPath,
        filename: 'app.bundle.js',
    },
    devServer: {
        contentBase: srcPath,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
        ],
    },
};
