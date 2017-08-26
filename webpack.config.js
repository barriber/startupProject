const path = require('path');
const webpack = require('webpack');
const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';
const srcPath = path.resolve(__dirname, 'src/client');
console.log(srcPath);
const outputPath = path.resolve(__dirname, './public/javascripts/');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: path.resolve(srcPath, 'app.js'),

  output: {
    filename: 'app.js',
    path: outputPath
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template:  path.resolve(__dirname, 'index.html')
  })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader'
      }
    ]
  }
};


// module.exports = {
//     entry: path.resolve(srcPath, 'app.js'),
//     output: {
//         path: outputPath,
//         filename: 'app.js',
//     },
//     devServer: {
//         contentBase: srcPath,
//     },
//     devtool:'source-map',
//     module: {
//         rules: [
//             {
//                 test: /\.(js|jsx)$/,
//                 exclude: /node_modules/,
//                 use: 'babel-loader'
//             },
//         ],
//     },
// };
