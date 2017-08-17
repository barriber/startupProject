const path = require('path');
const outputPath = path.resolve(__dirname, 'public/javascripts/');
module.exports = {
  entry: './client/app.js',

  output: {
    filename: 'app.js',
    path: outputPath
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};