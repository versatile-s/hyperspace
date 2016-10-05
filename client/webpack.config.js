var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './main.js',
  output: {path: __dirname, filename: 'bundle.js'},
  watch: true,
  resolve: {
    extensions: ['', '.jsx', '.scss', '.js', '.json', '.md'],
    
  },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules',
        include: /flexboxgrid/,
      }

    ]
  },
};