const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].[contenthash].js',
    publicPath: '/',
    clean: true,
  },
  mode: process.env.NODE_ENV || 'development',
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    static: path.join(__dirname, 'src'),
    historyApiFallback: true,
    compress: false,
    hot: true,
    port: 3333,
    proxy: {
      '/demo': 'http://localhost:3000',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env.API_ENV': JSON.stringify(process.env.API_ENV),
      'process.env.CLIENT_ID': JSON.stringify(process.env.CLIENT_ID),
    }),
  ],
};
